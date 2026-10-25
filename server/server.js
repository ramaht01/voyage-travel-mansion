const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { sendEmail, escapeHtml } = require("./emailService");

const safeEmailValue = (value, fallback = "Not provided") => {
  if (value === null || value === undefined || value === "") {
    return escapeHtml(fallback);
  }

  return escapeHtml(value);
};

const app = express();
const PORT = process.env.PORT || 5000;

const verifyTurnstile = async (req, res, next) => {
  try {
    const token = req.body?.turnstileToken;

    if (!process.env.TURNSTILE_SECRET_KEY) {
      console.error("Turnstile secret key is missing");

      return res.status(503).json({
        message: "Verification is temporarily unavailable.",
      });
    }

    if (typeof token !== "string" || !token || token.length > 2048) {
      return res.status(400).json({
        message: "Please complete the security verification.",
      });
    }

    const formData = new URLSearchParams();
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY);
    formData.append("response", token);

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) {
      throw new Error("Turnstile verification service unavailable");
    }

    const result = await response.json();

    if (!result.success) {
      return res.status(403).json({
        message: "Security verification failed. Please try again.",
      });
    }

    next();
  } catch (error) {
    console.error("Turnstile verification request failed");

    return res.status(503).json({
      message: "Unable to verify your request. Please try again.",
    });
  }
};

// Trust the first reverse proxy (Render)
app.set("trust proxy", 3);

// Add security-related HTTP headers
app.use(helmet());

// Existing CORS configuration

const allowedOrigins = ["https://voyage-travel-mansion.vercel.app"];

if (process.env.NODE_ENV !== "production") {
  allowedOrigins.push("http://localhost:5173");
}

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Limit the size of incoming JSON requests
app.use(express.json({ limit: "20kb" }));

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,

  skip: () =>
    process.env.NODE_ENV === "production" &&
    process.env.ENABLE_IP_RATE_LIMIT !== "true",

  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
});

const customerRequestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,

  skip: () =>
    process.env.NODE_ENV === "production" &&
    process.env.ENABLE_IP_RATE_LIMIT !== "true",

  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message:
      "Too many travel requests have been submitted. Please try again later.",
  },
});

function requireAdmin(req, res, next) {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";

  if (!token) {
    return res.status(401).json({ message: "Admin authentication required" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired admin token" });
  }
}

app.post("/api/admin/login", adminLoginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const submittedEmail = email.trim().toLowerCase();
    const configuredEmail = process.env.ADMIN_EMAIL.trim().toLowerCase();

    const emailMatches = submittedEmail === configuredEmail;

    const passwordMatches = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH,
    );

    if (!emailMatches || !passwordMatches) {
      return res.status(401).json({
        message: "Invalid admin credentials",
      });
    }

    const token = jwt.sign(
      {
        role: "admin",
        email: configuredEmail,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      message: "Unable to process admin login",
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Voyage Travel Mansion backend is running!",
  });
});

const FlightRequest = require("./models/FlightRequest");
const VisaRequest = require("./models/VisaRequest");
const InternationalTravelRequest = require("./models/InternationalTravelRequest");
const InsuranceRequest = require("./models/InsuranceRequest");

app.get(
  "/api/international-travel-requests",
  requireAdmin,
  async (req, res) => {
    try {
      const requests = await InternationalTravelRequest.find().sort({
        createdAt: -1,
      });

      res.status(200).json(requests);
    } catch (error) {
      console.error("Error fetching international travel requests:", error);

      res.status(500).json({
        message: "Unable to fetch international travel requests",
      });
    }
  },
);

app.get("/api/insurance-requests", requireAdmin, async (req, res) => {
  try {
    const requests = await InsuranceRequest.find().sort({
      createdAt: -1,
    });

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching insurance requests:", error);

    res.status(500).json({
      message: "Unable to fetch insurance requests",
    });
  }
});

app.patch("/api/insurance-requests/:id", requireAdmin, async (req, res) => {
  try {
    const updatedRequest = await InsuranceRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        notes: req.body.notes,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedRequest) {
      return res.status(404).json({
        message: "Insurance request not found",
      });
    }

    res.status(200).json({
      message: "Insurance request updated successfully",
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Insurance request update error:", error);

    res.status(400).json({
      message: "Unable to update insurance request",
      error: error.message,
    });
  }
});

app.delete("/api/insurance-requests/:id", requireAdmin, async (req, res) => {
  try {
    const deletedRequest = await InsuranceRequest.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedRequest) {
      return res.status(404).json({
        message: "Insurance request not found",
      });
    }

    res.status(200).json({
      message: "Insurance request deleted successfully",
    });
  } catch (error) {
    console.error("Insurance request deletion error:", error);

    res.status(500).json({
      message: "Unable to delete insurance request",
    });
  }
});


function getTravelDateError(startDate, returnDate, dateLabel = "Departure date") {
  const isValidDate = (value) => {
    if (
      typeof value !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      return false;
    }

    const date = new Date(`${value}T00:00:00Z`);

    return (
      !Number.isNaN(date.getTime()) &&
      date.toISOString().slice(0, 10) === value
    );
  };

  // Today's date in Johannesburg, South Africa
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  const today = `${values.year}-${values.month}-${values.day}`;

  if (!isValidDate(startDate) || startDate < today) {
    return `${dateLabel} must be a valid date that is not in the past.`;
  }

  // Return date is optional, but must be valid if provided
  if (
    returnDate !== undefined &&
    returnDate !== null &&
    returnDate !== ""
  ) {
    if (!isValidDate(returnDate) || returnDate < startDate) {
      return "Return date must be on or after the departure date.";
    }
  }

  return null;
}


app.post(
  "/api/international-travel-requests",
  customerRequestLimiter,
  verifyTurnstile,
  async (req, res) => {
    try {
      const {
        fullName,
        email,
        phone,
        departure,
        destination,
        travelDate,
        returnDate,
        travelers,
        tripPurpose,
        additionalRequirements,
      } = req.body;

      const internationalTravelRequest = new InternationalTravelRequest({
        fullName,
        email,
        phone,
        departure,
        destination,
        travelDate,
        returnDate,
        travelers,
        tripPurpose,
        additionalRequirements,
      });

      
const internationalDateError = getTravelDateError(
  req.body.travelDate,
  req.body.returnDate,
  "Travel date"
);

if (internationalDateError) {
  return res.status(400).json({
    message: internationalDateError,
  });
}


      const savedRequest = await internationalTravelRequest.save();

      console.log("SENDING INTERNATIONAL TRAVEL AGENCY EMAIL...");

      try {
        await sendEmail({
          to: "561travelsandtours@gmail.com",
          subject:
            "New International Travel Planning Request - Voyage Travel Mansion",
          htmlContent: `
        <h2>New International Travel Planning Request</h2>

        <p><strong>Full Name:</strong> ${savedRequest.fullName}</p>
        <p><strong>Email:</strong> ${savedRequest.email}</p>
        <p><strong>Phone / WhatsApp:</strong> ${savedRequest.phone}</p>

        <p><strong>Departure:</strong> ${
          savedRequest.departure || "Not provided"
        }</p>

        <p><strong>Destination:</strong> ${savedRequest.destination}</p>

        <p><strong>Travel Date:</strong> ${
          savedRequest.travelDate || "Not provided"
        }</p>

        <p><strong>Return Date:</strong> ${
          savedRequest.returnDate || "Not provided"
        }</p>

        <p><strong>Number of Travelers:</strong> ${savedRequest.travelers}</p>

        <p><strong>Purpose of Travel:</strong> ${savedRequest.tripPurpose}</p>

        <p><strong>Additional Requirements:</strong><br>
          ${savedRequest.additionalRequirements || "None"}
        </p>

        <hr>

        <p>
          This request was submitted through the
          Voyage Travel Mansion website.
        </p>
      `,
        });

        console.log("SENDING CUSTOMER CONFIRMATION EMAIL...");

        await sendEmail({
          to: savedRequest.email,
          subject:
            "Your International Travel Planning Request Has Been Received",
          htmlContent: `
        <h2>Your International Travel Planning Request Has Been Received</h2>


<p>Dear ${safeEmailValue(savedRequest.fullName)},</p>


        <p>
          Thank you for contacting Voyage Travel Mansion.
          We have received your international travel planning request
          successfully.
        </p>

        <h3>Request Details</h3>

        <p><strong>Departure:</strong> ${
          savedRequest.departure || "Not provided"
        }</p>

        <p><strong>Destination:</strong> ${savedRequest.destination}</p>

        <p><strong>Travel Date:</strong> ${
          savedRequest.travelDate || "Not provided"
        }</p>

        <p><strong>Return Date:</strong> ${
          savedRequest.returnDate || "Not provided"
        }</p>

        <p><strong>Number of Travelers:</strong> ${savedRequest.travelers}</p>

        <p><strong>Purpose of Travel:</strong> ${savedRequest.tripPurpose}</p>

        <p>
          Our team will review your request and contact you regarding
          the next steps for planning your journey.
        </p>

        <hr>

        <p>
          <strong>Voyage Travel Mansion</strong><br>
          561travelsandtours@gmail.com<br>
          +27 69 587 7716
        </p>
      `,
        });
      } catch (emailError) {
        console.error(
          "International travel request saved, but email delivery failed",
        );
      }

      res.status(201).json({
        message: "International travel request submitted successfully",
      });
    } catch (error) {
      console.error("International travel request error:", error);

      res.status(400).json({
        message: "Unable to submit international travel request",
        error: error.message,
      });
    }
  },
);


function getTravelDateError(startDate, returnDate, dateLabel = "Departure date") {
  const isValidDate = (value) => {
    if (
      typeof value !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      return false;
    }

    const date = new Date(`${value}T00:00:00Z`);

    return (
      !Number.isNaN(date.getTime()) &&
      date.toISOString().slice(0, 10) === value
    );
  };

  // Today's date in Johannesburg, South Africa
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  const today = `${values.year}-${values.month}-${values.day}`;

  if (!isValidDate(startDate) || startDate < today) {
    return `${dateLabel} must be a valid date that is not in the past.`;
  }

  // Return date is optional, but must be valid if provided
  if (
    returnDate !== undefined &&
    returnDate !== null &&
    returnDate !== ""
  ) {
    if (!isValidDate(returnDate) || returnDate < startDate) {
      return "Return date must be on or after the departure date.";
    }
  }

  return null;
}


app.post(
  "/api/insurance-requests",
  customerRequestLimiter,
  verifyTurnstile,
  async (req, res) => {
    try {
      const {
        fullName,
        email,
        phone,
        destination,
        departureDate,
        returnDate,
        travelers,
        coverageType,
        additionalRequirements,
      } = req.body;

      const insuranceRequest = new InsuranceRequest({
        fullName,
        email,
        phone,
        destination,
        departureDate,
        returnDate,
        travelers: travelerCount,
        insuranceType: coverageType,
        additionalRequirements,
      });

      
const isValidDate = (value) => {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return false;
  }

  const parsedDate = new Date(`${value}T00:00:00Z`);

  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === value
  );
};

// Today's date in the travel agency's timezone
const dateParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Johannesburg",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).formatToParts(new Date());

const dateValues = Object.fromEntries(
  dateParts.map(({ type, value }) => [type, value])
);

const today = `${dateValues.year}-${dateValues.month}-${dateValues.day}`;

if (!isValidDate(departureDate) || departureDate < today) {
  return res.status(400).json({
    message: "Please select a valid departure date that is not in the past.",
  });
}

if (!isValidDate(returnDate) || returnDate < departureDate) {
  return res.status(400).json({
    message: "Return date must be on or after the departure date.",
  });
}


      
const travelerCount = Number(travelers);

if (
  !Number.isInteger(travelerCount) ||
  travelerCount < 1 ||
  travelerCount > 50
) {
  return res.status(400).json({
    message: "Number of travelers must be between 1 and 50.",
  });
}


      const savedRequest = await insuranceRequest.save();

      try {
        await sendEmail({
          to: "561travelsandtours@gmail.com",
          subject: "New Travel Insurance Request - Voyage Travel Mansion",
          htmlContent: `
        <h2>New Travel Insurance Request</h2>
        <p><strong>Name:</strong> ${savedRequest.fullName}</p>
        <p><strong>Email:</strong> ${savedRequest.email}</p>
        <p><strong>Phone:</strong> ${savedRequest.phone}</p>
        <p><strong>Destination:</strong> ${savedRequest.destination}</p>
        <p><strong>Departure Date:</strong> ${savedRequest.departureDate || "Not provided"}</p>
        <p><strong>Return Date:</strong> ${savedRequest.returnDate || "Not provided"}</p>
        <p><strong>Travelers:</strong> ${savedRequest.travelers}</p>
        <p><strong>Type of Assistance:</strong> ${savedRequest.insuranceType}</p>
        <p><strong>Additional Information:</strong><br>${savedRequest.additionalRequirements || "None"}</p>
      `,
        });

        await sendEmail({
          to: savedRequest.email,
          subject: "Your Travel Insurance Request Has Been Received",
          htmlContent: `
        <h2>Travel Insurance Request Received</h2>
        <p>Dear ${savedRequest.fullName},</p>
        <p>Thank you for contacting Voyage Travel Mansion. We have received your request for travel insurance assistance.</p>
        <p>Our team will review your details and contact you about the next steps.</p>
        <p><strong>Voyage Travel Mansion</strong><br>
        561travelsandtours@gmail.com<br>
        +27 69 587 7716</p>
      `,
        });
      } catch (emailError) {
        console.error("Insurance request saved, but email delivery failed");
      }

      res.status(201).json({
        message: "Travel insurance request submitted successfully",
      });
    

    
    } catch (error) {
      console.error("Travel insurance request error:", error);

      res.status(400).json({
        message: "Unable to submit travel insurance request",
        error: error.message,
      });
    }
  },
);


function getTravelDateError(startDate, returnDate, dateLabel = "Departure date") {
  const isValidDate = (value) => {
    if (
      typeof value !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      return false;
    }

    const date = new Date(`${value}T00:00:00Z`);

    return (
      !Number.isNaN(date.getTime()) &&
      date.toISOString().slice(0, 10) === value
    );
  };

  // Today's date in Johannesburg, South Africa
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  const today = `${values.year}-${values.month}-${values.day}`;

  if (!isValidDate(startDate) || startDate < today) {
    return `${dateLabel} must be a valid date that is not in the past.`;
  }

  // Return date is optional, but must be valid if provided
  if (
    returnDate !== undefined &&
    returnDate !== null &&
    returnDate !== ""
  ) {
    if (!isValidDate(returnDate) || returnDate < startDate) {
      return "Return date must be on or after the departure date.";
    }
  }

  return null;
}



app.post("/api/visa-requests", customerRequestLimiter, verifyTurnstile, async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      destinationCountry,
      visaType,
      purpose,
      intendedTravelDate,
      additionalInformation,
        numberOfApplicants,
    } = req.body;


const applicants = Number(numberOfApplicants);

if (
  !Number.isInteger(applicants) ||
  applicants < 1 ||
  applicants > 50
) {
  return res.status(400).json({
    message: "Number of applicants must be between 1 and 50.",
  });
}

    

    const visaRequest = new VisaRequest({
      fullName,
      email,
      phone,
      destinationCountry,
      visaType,
      purpose,
      intendedTravelDate,
      additionalInformation,
      numberOfApplicants: applicants,
    });

    
const visaDateError = getTravelDateError(
  req.body.intendedTravelDate,
  undefined,
  "Intended travel date"
);

if (visaDateError) {
  return res.status(400).json({
    message: visaDateError,
  });
}


    const savedRequest = await visaRequest.save();

    console.log("SENDING AGENCY EMAIL...");

    try {
      await sendEmail({
        to: "561travelsandtours@gmail.com",
        subject: "New Visa Assistance Request - Voyage Travel Mansion",
        htmlContent: `
    <h2>New Visa Assistance Request</h2>

    <p><strong>Full Name:</strong> ${savedRequest.fullName}</p>
    <p><strong>Email:</strong> ${savedRequest.email}</p>
    <p><strong>Phone / WhatsApp:</strong> ${savedRequest.phone}</p>

    <p><strong>Destination Country:</strong> ${
      savedRequest.destinationCountry
    }</p>

    <p><strong>Visa Type:</strong> ${savedRequest.visaType}</p>
    <p><strong>Purpose:</strong> ${savedRequest.purpose}</p>

    <p><strong>Intended Travel Date:</strong> ${
      savedRequest.intendedTravelDate
    }</p>

    <p><strong>Additional Information:</strong><br>
      ${savedRequest.additionalInformation || "None"}
    </p>

    <hr>

    <p>
      This request was submitted through the
      Voyage Travel Mansion website.
    </p>

<p><strong>Number of Applicants:</strong> ${savedRequest.numberOfApplicants}</p>

  `,
      });

      console.log("SENDING AGENCY EMAIL...");

      await sendEmail({
        to: savedRequest.email,
        subject: "Your Visa Assistance Request Has Been Received",
        htmlContent: `
    <h2>Your Visa Assistance Request Has Been Received</h2>


<p>Dear ${safeEmailValue(savedRequest.fullName)},</p>


    <p>
      Thank you for contacting Voyage Travel Mansion.
      We have received your visa assistance request successfully.
    </p>

    <h3>Request Details</h3>

    <p><strong>Destination Country:</strong> ${
      savedRequest.destinationCountry
    }</p>

    <p><strong>Visa Type:</strong> ${savedRequest.visaType}</p>

    <p><strong>Purpose:</strong> ${savedRequest.purpose}</p>

    <p><strong>Intended Travel Date:</strong> ${
      savedRequest.intendedTravelDate
    }</p>

    <p>
      Our team will review your request and contact you regarding
      the next steps.
    </p>

    <p>
      Please note that this confirmation only confirms receipt of your
      request. It does not constitute a visa approval or guarantee.
    </p>

    <hr>

    <p>
      <strong>Voyage Travel Mansion</strong><br>
      561travelsandtours@gmail.com<br>
      +27 69 587 7716
    </p>

<p><strong>Number of Applicants:</strong> ${savedRequest.numberOfApplicants}</p>

  `,
      });
    } catch (emailError) {
      console.error("Visa request saved, but email delivery failed");
    }

    res.status(201).json({
      message: "Visa request submitted successfully",
    });
  } catch (error) {
    console.error("Visa request error:", error);

    res.status(400).json({
      message: "Unable to submit visa request",
      error: error.message,
    });
  }





});

app.get("/api/visa-requests", requireAdmin, async (req, res) => {
  try {
    const requests = await VisaRequest.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      requests,
    });
  } catch (error) {
    console.error("Visa requests fetch error:", error);

    res.status(500).json({
      message: "Unable to fetch visa requests",
      error: error.message,
    });
  }
});

app.patch("/api/visa-requests/:id", requireAdmin, async (req, res) => {
  try {
    const updatedRequest = await VisaRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        notes: req.body.notes,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedRequest) {
      return res.status(404).json({
        message: "Visa request not found",
      });
    }

    res.status(200).json({
      message: "Visa request updated successfully",
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Visa request update error:", error);

    res.status(400).json({
      message: "Unable to update visa request",
      error: error.message,
    });
  }
});

app.patch(
  "/api/international-travel-requests/:id",
  requireAdmin,
  async (req, res) => {
    try {
      const updatedRequest = await InternationalTravelRequest.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
          notes: req.body.notes,
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updatedRequest) {
        return res.status(404).json({
          message: "International travel request not found",
        });
      }

      res.status(200).json({
        message: "International travel request updated successfully",
        request: updatedRequest,
      });
    } catch (error) {
      console.error("International travel request update error:", error);

      res.status(400).json({
        message: "Unable to update international travel request",
        error: error.message,
      });
    }
  },
);

app.delete("/api/visa-requests/:id", requireAdmin, async (req, res) => {
  try {
    const deletedRequest = await VisaRequest.findByIdAndDelete(req.params.id);

    if (!deletedRequest) {
      return res.status(404).json({
        message: "Visa request not found",
      });
    }

    res.status(200).json({
      message: "Visa request deleted successfully",
      request: deletedRequest,
    });
  } catch (error) {
    console.error("Visa request delete error:", error);

    res.status(400).json({
      message: "Unable to delete visa request",
      error: error.message,
    });
  }
});

app.delete(
  "/api/international-travel-requests/:id",
  requireAdmin,
  async (req, res) => {
    try {
      const deletedRequest = await InternationalTravelRequest.findByIdAndDelete(
        req.params.id,
      );

      if (!deletedRequest) {
        return res.status(404).json({
          message: "International travel request not found",
        });
      }

      res.status(200).json({
        message: "International travel request deleted successfully",
      });
    } catch (error) {
      console.error("International travel request deletion error:", error);

      res.status(500).json({
        message: "Unable to delete international travel request",
      });
    }
  },
);


function getTravelDateError(startDate, returnDate, dateLabel = "Departure date") {
  const isValidDate = (value) => {
    if (
      typeof value !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      return false;
    }

    const date = new Date(`${value}T00:00:00Z`);

    return (
      !Number.isNaN(date.getTime()) &&
      date.toISOString().slice(0, 10) === value
    );
  };

  // Today's date in Johannesburg, South Africa
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  const today = `${values.year}-${values.month}-${values.day}`;

  if (!isValidDate(startDate) || startDate < today) {
    return `${dateLabel} must be a valid date that is not in the past.`;
  }

  // Return date is optional, but must be valid if provided
  if (
    returnDate !== undefined &&
    returnDate !== null &&
    returnDate !== ""
  ) {
    if (!isValidDate(returnDate) || returnDate < startDate) {
      return "Return date must be on or after the departure date.";
    }
  }

  return null;
}


app.post("/api/flight-requests", customerRequestLimiter, verifyTurnstile, async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      departure,
      destination,
      departureDate,
      returnDate,
      passengers,
      tripType,
      additionalRequirements,
    } = req.body;

    const flightRequest = new FlightRequest({
      fullName,
      email,
      phone,
      departure,
      destination,
      departureDate,
      returnDate,
      passengers,
      tripType,
      additionalRequirements,
    });

    
const flightDateError = getTravelDateError(
  req.body.departureDate,
  req.body.returnDate,
  "Departure date"
);

if (flightDateError) {
  return res.status(400).json({
    message: flightDateError,
  });
}


    const savedRequest = await flightRequest.save();

    try {
      await sendEmail({
        to: "561travelsandtours@gmail.com",
        subject: "New Flight Booking Request - Voyage Travel Mansion",
        htmlContent: `
        <h2>New Flight Booking Request</h2>

        <p><strong>Full Name:</strong> ${savedRequest.fullName}</p>
        <p><strong>Email:</strong> ${savedRequest.email}</p>
        <p><strong>Phone / WhatsApp:</strong> ${savedRequest.phone}</p>

        <p><strong>Departure:</strong> ${savedRequest.departure}</p>
        <p><strong>Destination:</strong> ${savedRequest.destination}</p>

        <p><strong>Departure Date:</strong> ${savedRequest.departureDate}</p>
        <p><strong>Return Date:</strong> ${
          savedRequest.returnDate || "Not provided"
        }</p>

        <p><strong>Passengers:</strong> ${savedRequest.passengers}</p>
        <p><strong>Trip Type:</strong> ${savedRequest.tripType}</p>

        <p><strong>Additional Requirements:</strong><br>
          ${savedRequest.additionalRequirements || "None"}
        </p>

        <hr>

        <p>
          This request was submitted through the
          Voyage Travel Mansion website.
        </p>
      `,
      });

      await sendEmail({
        to: savedRequest.email,
        subject: "Your Flight Booking Request Has Been Received",
        htmlContent: `
    <h2>Your Flight Booking Request Has Been Received</h2>


<p>Dear ${safeEmailValue(savedRequest.fullName)},</p>


    <p>
      Thank you for contacting Voyage Travel Mansion.
      We have received your flight booking request successfully.
    </p>

    <h3>Request Details</h3>

    <p><strong>Departure:</strong> ${savedRequest.departure}</p>
    <p><strong>Destination:</strong> ${savedRequest.destination}</p>
    <p><strong>Departure Date:</strong> ${savedRequest.departureDate}</p>
    <p><strong>Return Date:</strong> ${
      savedRequest.returnDate || "Not provided"
    }</p>
    <p><strong>Passengers:</strong> ${savedRequest.passengers}</p>
    <p><strong>Trip Type:</strong> ${savedRequest.tripType}</p>

    <p>
      Our team will review your request and contact you regarding
      the next steps.
    </p>

    <p>
      Please note that this confirmation does not mean that a flight
      has been booked or ticketed.
    </p>

    <hr>

    <p>
      <strong>Voyage Travel Mansion</strong><br>
      561travelsandtours@gmail.com<br>
      +27 69 587 7716
    </p>
  `,
      });
    } catch (emailError) {
      console.error("Flight request saved, but email delivery failed");
    }

    res.status(201).json({
      message: "Flight request submitted successfully",
    });
  } catch (error) {
    console.error("Flight request error:", error);

    res.status(400).json({
      message: "Unable to submit flight request",
      error: error.message,
    });
  }
});

app.get("/api/flight-requests", requireAdmin, async (req, res) => {
  try {
    const requests = await FlightRequest.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      requests,
    });
  } catch (error) {
    console.error("Flight requests fetch error:", error);

    res.status(500).json({
      message: "Unable to fetch flight requests",
      error: error.message,
    });
  }
});

app.patch("/api/flight-requests/:id", requireAdmin, async (req, res) => {
  try {
    const updatedRequest = await FlightRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        notes: req.body.notes,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedRequest) {
      return res.status(404).json({
        message: "Flight request not found",
      });
    }

    res.status(200).json({
      message: "Flight request updated successfully",
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Flight request update error:", error);

    res.status(400).json({
      message: "Unable to update flight request",
      error: error.message,
    });
  }
});

app.delete("/api/flight-requests/:id", requireAdmin, async (req, res) => {
  try {
    const deletedRequest = await FlightRequest.findByIdAndDelete(req.params.id);

    if (!deletedRequest) {
      return res.status(404).json({
        message: "Flight request not found",
      });
    }

    res.status(200).json({
      message: "Flight request deleted successfully",
      request: deletedRequest,
    });
  } catch (error) {
    console.error("Flight request delete error:", error);

    res.status(400).json({
      message: "Unable to delete flight request",
      error: error.message,
    });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    console.log("Database:", mongoose.connection.name);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

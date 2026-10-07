

const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./emailService");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.post("/api/admin/login", async (req, res) => {
  console.log("ADMIN LOGIN ROUTE HIT");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const submittedEmail = email.trim().toLowerCase();
    const configuredEmail = process.env.ADMIN_EMAIL
      .trim()
      .toLowerCase();

    const emailMatches = submittedEmail === configuredEmail;

    const passwordMatches = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    console.log("Admin login check:", {
      emailMatches,
      passwordMatches,
    });

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
      }
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

app.get("/api/international-travel-requests", (req, res) => {
  res.json({
    message: "International travel route is live!",
  });
});



app.post("/api/international-travel-requests", async (req, res) => {
  try {
    const internationalTravelRequest =
      new InternationalTravelRequest(req.body);

    const savedRequest = await internationalTravelRequest.save();

    console.log("SENDING INTERNATIONAL TRAVEL AGENCY EMAIL...");

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

        <p><strong>Destination:</strong> ${
          savedRequest.destination
        }</p>

        <p><strong>Travel Date:</strong> ${
          savedRequest.travelDate || "Not provided"
        }</p>

        <p><strong>Return Date:</strong> ${
          savedRequest.returnDate || "Not provided"
        }</p>

        <p><strong>Number of Travelers:</strong> ${
          savedRequest.travelers
        }</p>

        <p><strong>Purpose of Travel:</strong> ${
          savedRequest.tripPurpose
        }</p>

        <p><strong>Additional Requirements:</strong><br>
          ${
            savedRequest.additionalRequirements || "None"
          }
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

        <p>Dear ${savedRequest.fullName},</p>

        <p>
          Thank you for contacting Voyage Travel Mansion.
          We have received your international travel planning request
          successfully.
        </p>

        <h3>Request Details</h3>

        <p><strong>Departure:</strong> ${
          savedRequest.departure || "Not provided"
        }</p>

        <p><strong>Destination:</strong> ${
          savedRequest.destination
        }</p>

        <p><strong>Travel Date:</strong> ${
          savedRequest.travelDate || "Not provided"
        }</p>

        <p><strong>Return Date:</strong> ${
          savedRequest.returnDate || "Not provided"
        }</p>

        <p><strong>Number of Travelers:</strong> ${
          savedRequest.travelers
        }</p>

        <p><strong>Purpose of Travel:</strong> ${
          savedRequest.tripPurpose
        }</p>

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

    res.status(201).json({
      message: "International travel request submitted successfully",
      request: savedRequest,
    });
  } catch (error) {
    console.error("International travel request error:", error);

    res.status(400).json({
      message: "Unable to submit international travel request",
      error: error.message,
    });
  }
});


app.post("/api/visa-requests", async (req, res) => {
  try {
    const visaRequest = new VisaRequest(req.body);

    const savedRequest = await visaRequest.save();

    console.log("SENDING AGENCY EMAIL...");

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
  `,
});

console.log("SENDING AGENCY EMAIL...");

await sendEmail({
  to: savedRequest.email,
  subject: "Your Visa Assistance Request Has Been Received",
  htmlContent: `
    <h2>Your Visa Assistance Request Has Been Received</h2>

    <p>Dear ${savedRequest.fullName},</p>

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
  `,
});

    res.status(201).json({
      message: "Visa request submitted successfully",
      request: savedRequest,
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
      }
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

app.delete("/api/visa-requests/:id", requireAdmin, async (req, res) => {
  try {
    const deletedRequest = await VisaRequest.findByIdAndDelete(
      req.params.id
    );

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




app.post("/api/flight-requests", async (req, res) => {
  try {
    const flightRequest = new FlightRequest(req.body);

    const savedRequest = await flightRequest.save();

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

    <p>Dear ${savedRequest.fullName},</p>

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

    res.status(201).json({
      message: "Flight request submitted successfully",
      request: savedRequest,
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
      }
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
    const deletedRequest = await FlightRequest.findByIdAndDelete(
      req.params.id
    );

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

const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        expiresIn: "8h",
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





app.post("/api/visa-requests", async (req, res) => {
  try {
    const visaRequest = new VisaRequest(req.body);

    const savedRequest = await visaRequest.save();

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

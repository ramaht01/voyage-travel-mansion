const mongoose = require("mongoose");

const flightRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    departure: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    departureDate: {
      type: String,
      required: true,
    },

    returnDate: {
      type: String,
      default: "",
    },

    passengers: {
      type: Number,
      required: true,
      min: 1,
    },

    tripType: {
      type: String,
      required: true,
      enum: ["One Way", "Round Trip"],
    },

    additionalRequirements: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["New", "In Progress", "Completed", "Cancelled"],
      default: "New",
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FlightRequest", flightRequestSchema);
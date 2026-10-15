
const mongoose = require("mongoose");

const insuranceRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      maxlength: 25,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    departureDate: {
      type: String,
      default: "",
      validate: {
        validator: (value) =>
          !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
        message: "Invalid departure date format",
      },
    },

    returnDate: {
      type: String,
      default: "",
      validate: {
        validator: (value) =>
          !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
        message: "Invalid return date format",
      },
    },

    travelers: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
      validate: {
        validator: Number.isInteger,
        message: "Travelers must be a whole number",
      },
    },

    insuranceType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    additionalRequirements: {
      type: String,
      default: "",
      trim: true,
      maxlength: 2000,
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
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model(
  "InsuranceRequest",
  insuranceRequestSchema
);

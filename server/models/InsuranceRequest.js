const mongoose = require("mongoose");

const insuranceRequestSchema = new mongoose.Schema(
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

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    departureDate: {
      type: String,
      default: "",
    },

    returnDate: {
      type: String,
      default: "",
    },

    travelers: {
      type: Number,
      required: true,
      min: 1,
    },

    insuranceType: {
      type: String,
      required: true,
      trim: true,
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
  },
);

module.exports = mongoose.model("InsuranceRequest", insuranceRequestSchema);


const mongoose = require("mongoose");

const visaRequestSchema = new mongoose.Schema(
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

    destinationCountry: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    visaType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    purpose: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    intendedTravelDate: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    additionalInformation: {
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
  "VisaRequest",
  visaRequestSchema
);

const mongoose = require("mongoose");

const dateValidator = (value) => {
  if (!value) return true;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);

  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
};

const internationalTravelRequestSchema = new mongoose.Schema(
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

    departure: {
      type: String,
      default: "",
      trim: true,
      maxlength: 120,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    travelDate: {
      type: String,
      default: "",
      validate: {
        validator: dateValidator,
        message: "Invalid travel date",
      },
    },

    returnDate: {
      type: String,
      default: "",
      validate: {
        validator: dateValidator,
        message: "Invalid return date",
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

    tripPurpose: {
      type: String,
      required: true,
      enum: ["Holiday", "Business", "Student", "Family", "Other"],
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
  },
);

module.exports = mongoose.model(
  "InternationalTravelRequest",
  internationalTravelRequestSchema,
);

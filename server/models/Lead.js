const mongoose = require("mongoose");

const BUDGET_RANGES = ["<5k", "5k-15k", "15k-50k", "50k+"];

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    budgetRange: {
      type: String,
      required: true,
      enum: BUDGET_RANGES,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Closed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

leadSchema.statics.BUDGET_RANGES = BUDGET_RANGES;

module.exports = mongoose.model("Lead", leadSchema);

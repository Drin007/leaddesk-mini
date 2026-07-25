const Lead = require("../models/Lead");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STATUSES = ["New", "Contacted", "Closed"];

const createLead = async (req, res) => {
  try {
    const { name, email, budgetRange, message } = req.body;

    const errors = {};

    if (!name || !name.trim()) errors.name = "Name is required";
    if (!email || !EMAIL_REGEX.test(email)) {
      errors.email = "A valid email is required";
    }
    if (!budgetRange || !Lead.BUDGET_RANGES.includes(budgetRange)) {
      errors.budgetRange = "A valid budget range is required";
    }
    if (!message || !message.trim()) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const lead = await Lead.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      budgetRange,
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLeads = async (req, res) => {
  try {
    const { search, status } = req.query;
    const query = {};

    if (status && STATUSES.includes(status)) {
      query.status = status;
    }

    if (search && search.trim()) {
      const safe = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(safe, "i");
      query.$or = [{ name: regex }, { email: regex }];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateLead = async (req, res) => {
  try {
    const { status } = req.body;

    if (!STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLead,
  getLeads,
  updateLead,
};

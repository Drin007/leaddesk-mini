import { useState } from "react";
import API from "../services/api";

const BUDGET_RANGES = ["<5k", "5k-15k", "15k-50k", "50k+"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budgetRange: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim() || !EMAIL_REGEX.test(form.email)) {
      next.email = "Enter a valid email";
    }
    if (!form.budgetRange) next.budgetRange = "Select a budget range";
    if (!form.message.trim()) next.message = "Message is required";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setStatus(null);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await API.post("/leads", form);
      setStatus("success");
      setForm({ name: "", email: "", budgetRange: "", message: "" });
    } catch (err) {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-10" style={{ maxWidth: "480px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Tell us about your project
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: "14px" }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
          {errors.name && <p style={{ color: "#c0392b" }}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: "14px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
          {errors.email && <p style={{ color: "#c0392b" }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: "14px" }}>
          <select
            name="budgetRange"
            value={form.budgetRange}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          >
            <option value="">Select budget range</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {errors.budgetRange && (
            <p style={{ color: "#c0392b" }}>{errors.budgetRange}</p>
          )}
        </div>

        <div style={{ marginBottom: "14px" }}>
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
          {errors.message && (
            <p style={{ color: "#c0392b" }}>{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: "10px",
            background: "#1a2b4c",
            color: "#fff",
            border: "none",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Sending..." : "Send"}
        </button>

        {status === "success" && (
          <p style={{ color: "#27ae60", marginTop: "12px" }}>
            Thanks! We&apos;ll be in touch.
          </p>
        )}
        {status === "error" && (
          <p style={{ color: "#c0392b", marginTop: "12px" }}>
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

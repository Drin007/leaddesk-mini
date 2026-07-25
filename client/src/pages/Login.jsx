import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "360px", margin: "80px auto", padding: "0 20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Admin Login</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", marginBottom: "6px" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
            autoComplete="email"
          />
        </div>

        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", marginBottom: "6px" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p style={{ color: "#c0392b", marginBottom: "14px" }}>{error}</p>
        )}

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
          {submitting ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}

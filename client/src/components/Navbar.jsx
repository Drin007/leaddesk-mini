import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>LeadDesk Mini</h2>

      <Link to="/login">Admin Login</Link>
    </nav>
  );
}

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const STATUSES = ["New", "Contacted", "Closed"];

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (statusFilter) params.status = statusFilter;

      const res = await API.get("/leads", { params });
      setLeads(res.data.leads);
    } catch (err) {
      setError("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timeout = setTimeout(fetchLeads, 300); 
    return () => clearTimeout(timeout);
  }, [fetchLeads]);

  const handleStatusChange = async (id, status) => {
    const prevLeads = leads;
    setLeads((cur) => cur.map((l) => (l._id === id ? { ...l, status } : l)));
    try {
      await API.patch(`/leads/${id}`, { status });
    } catch (err) {
      setLeads(prevLeads); 
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="p-10" style={{ maxWidth: "960px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Leads</h2>
        <button onClick={handleLogout} style={{ padding: "8px 16px" }}>
          Log out
        </button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "#c0392b" }}>{error}</p>}

      {!loading && !error && leads.length === 0 && <p>No leads found.</p>}

      {!loading && !error && leads.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: "8px" }}>Name</th>
              <th style={{ padding: "8px" }}>Email</th>
              <th style={{ padding: "8px" }}>Budget</th>
              <th style={{ padding: "8px" }}>Message</th>
              <th style={{ padding: "8px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{lead.name}</td>
                <td style={{ padding: "8px" }}>{lead.email}</td>
                <td style={{ padding: "8px" }}>{lead.budgetRange}</td>
                <td style={{ padding: "8px", maxWidth: "260px" }}>
                  {lead.message}
                </td>
                <td style={{ padding: "8px" }}>
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      handleStatusChange(lead._id, e.target.value)
                    }
                    style={{ padding: "6px" }}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

import { useState } from "react";
import Pending from "./pages/Pending";
import Completed from "./pages/Completed";

// --- Theme and Layout Styles (Dark Theme - Rectangular Update) ---
const themeStyles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    padding: "40px",
    backgroundColor: "#1e1e2f",
    color: "#e0e0e0",
    fontFamily: "'Inter', sans-serif",
    overflowY: "auto",
    textAlign: "center",
  },
  heading: {
    color: "#6dd5ed",
    borderBottom: "2px solid #3d3d63",
    paddingBottom: "20px",
    marginBottom: "40px",
    fontSize: "2.4em",
    fontWeight: 700,
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    marginBottom: "30px",
  },
  navBtn: (active) => ({
    padding: "10px 18px",
    borderRadius: "0px", // KEY CHANGE: RECTANGULAR NAVIGATION BUTTONS
    border: "none",
    cursor: "pointer",
    transition: "0.2s",
    fontWeight: active ? 700 : 500,
    backgroundColor: active ? "#6dd5ed" : "#3d3d63",
    color: active ? "#1e1e2f" : "#a0a0c0",
    boxShadow: active ? "0 6px 18px rgba(109,213,237,0.25)" : "none",
  }),
  sectionTitle: {
    color: "#ffc107",
    marginTop: "24px",
    marginBottom: "14px",
    fontSize: "1.6em",
    fontWeight: 700,
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    width: "90%",
    margin: "0 auto 30px auto",
  },
  statCard: {
    background: "#2a2a4a",
    padding: "18px",
    borderRadius: "0px", // KEY CHANGE: RECTANGULAR STAT CARD CORNERS
    textAlign: "left",
    boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
  },
  statNumber: { fontSize: "1.6rem", fontWeight: 700, color: "#fff" },
  statLabel: { color: "#cbd5e1", marginTop: "6px" }
  // Removed emailCard, subjectHeading, table, th, td as they are not used in this specific file's render logic
};

const pendingOrders = [
  {
    id: 1,
    item: "A4 sheets",
    quantity: "10",
    phone: "1234567890",
    address: "IIIT Naya Raipur",
    email: "shreya24102@iiitnr.edu.in",
    instructions: ""
  },
  {
    id: 2,
    item: "Icecream",
    quantity: "1",
    phone: "",
    address: "",
    email: "shreyak.2406@gmail.com",
    instructions: ""
  }
];

const statsData = {
  totalEmailsChecked: 45,
  totalOrdersExtracted: 30,
  pendingOrders: pendingOrders.length,
  completedOrders: 18,
  lastSync: "2025-02-15 17:32:00"
};

function App() {
  const [page, setPage] = useState("stats"); // Stats as default page

  return (
    <div style={themeStyles.container}>
      <h2 style={themeStyles.heading}>Order Management Dashboard</h2>

      {/* NAVIGATION - Now Rectangular */}
      <div style={themeStyles.nav}>
        <button style={themeStyles.navBtn(page === "stats")} onClick={() => setPage("stats")}>Stats</button>
        <button style={themeStyles.navBtn(page === "pending")} onClick={() => setPage("pending")}>Pending</button>
        <button style={themeStyles.navBtn(page === "completed")} onClick={() => setPage("completed")}>Completed</button>
      </div>

      {/* PAGE CONTENT */}
      {page === "stats" && (
        <>
          <h3 style={themeStyles.sectionTitle}>System Stats</h3>

          <div style={themeStyles.statGrid}>
            <div style={themeStyles.statCard}>
              <div style={themeStyles.statNumber}>{statsData.totalEmailsChecked}</div>
              <div style={themeStyles.statLabel}>Total Emails Checked</div>
            </div>

            <div style={themeStyles.statCard}>
              <div style={themeStyles.statNumber}>{statsData.totalOrdersExtracted}</div>
              <div style={themeStyles.statLabel}>Total Orders Extracted</div>
            </div>

            <div style={themeStyles.statCard}>
              <div style={themeStyles.statNumber}>{statsData.pendingOrders}</div>
              <div style={themeStyles.statLabel}>Pending Orders</div>
            </div>

            <div style={themeStyles.statCard}>
              <div style={themeStyles.statNumber}>{statsData.completedOrders}</div>
              <div style={themeStyles.statLabel}>Completed Orders</div>
            </div>

            <div style={themeStyles.statCard}>
              <div style={themeStyles.statNumber}>{statsData.lastSync}</div>
              <div style={themeStyles.statLabel}>Last Sync</div>
            </div>
          </div>

          <h3 style={themeStyles.sectionTitle}>Quick Pending Preview</h3>
          {/* Small preview of pending orders below stats - Now Rectangular */}
          <div style={{ width: "90%", margin: "0 auto 60px auto" }}>
            {pendingOrders.map(o => (
              <div 
                key={o.id} 
                style={{ 
                  background: "#2a2a4a", 
                  padding: 12, 
                  borderRadius: 0, // KEY CHANGE: RECTANGULAR PREVIEW ITEMS
                  marginBottom: 12, 
                  textAlign: "left",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.3)" // Added small shadow for lift
                }}>
                <div style={{ fontWeight: 700, color: "#ffd580" }}>{o.item} — {o.quantity}</div>
                <div style={{ color: "#cbd5e1", marginTop: 6 }}>{o.address || "—"} • {o.phone || "—"}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {page === "pending" && <Pending orders={pendingOrders} />}

      {page === "completed" && <Completed />}
    </div>
  );
}

export default App;
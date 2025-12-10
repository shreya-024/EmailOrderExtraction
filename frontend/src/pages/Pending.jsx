export default function Pending({ orders = [] }) {
  return (
    <div style={{ width: "90%", margin: "0 auto 80px auto", textAlign: "left" }}>
      <h3 style={{ color: "#ffc107", marginBottom: 18 }}>Pending Orders</h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ background: "#3d3d63", color: "#fff", padding: 12, textAlign: "left" }}>Item</th>
            <th style={{ background: "#3d3d63", color: "#fff", padding: 12, textAlign: "left" }}>Quantity</th>
            <th style={{ background: "#3d3d63", color: "#fff", padding: 12, textAlign: "left" }}>Phone</th>
            <th style={{ background: "#3d3d63", color: "#fff", padding: 12, textAlign: "left" }}>Address</th>
            <th style={{ background: "#3d3d63", color: "#fff", padding: 12, textAlign: "left" }}>Email</th>
            <th style={{ background: "#3d3d63", color: "#fff", padding: 12, textAlign: "left" }}>Instructions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} style={{ background: "#2a2a4a", borderBottom: "1px solid #3d3d63" }}>
              <td style={{ padding: 12 }}>{o.item}</td>
              <td style={{ padding: 12 }}>{o.quantity}</td>
              <td style={{ padding: 12 }}>{o.phone || "—"}</td>
              <td style={{ padding: 12 }}>{o.address || "—"}</td>
              <td style={{ padding: 12 }}>{o.email || "—"}</td>
              <td style={{ padding: 12 }}>{o.instructions || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

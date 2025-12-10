export default function Completed() {
  const completed = [
    { id: 101, item: "Notebooks", quantity: "50", delivered: "2025-01-02", email: "pulak24102@iiitnr.edu.in" },
    { id: 102, item: "Sticky Notes", quantity: "30", delivered: "2025-01-05", email: "sreeja24102@iiitnr.edu.in" },
    { id: 103, item: "Tape Rolls", quantity: "12", delivered: "2025-01-10", email: "shreyak.2406@gmail.com" },
  ];

  return (
    <div style={{ width: "90%", margin: "0 auto 80px auto", textAlign: "left" }}>
      <h3 style={{ color: "#00e676", marginBottom: 18 }}>Completed Orders</h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ background: "#1f3a1f", color: "#fff", padding: 12 }}>Order ID</th>
            <th style={{ background: "#1f3a1f", color: "#fff", padding: 12 }}>Item</th>
            <th style={{ background: "#1f3a1f", color: "#fff", padding: 12 }}>Qty</th>
            <th style={{ background: "#1f3a1f", color: "#fff", padding: 12 }}>Delivered On</th>
            <th style={{ background: "#1f3a1f", color: "#fff", padding: 12 }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {completed.map(c => (
            <tr key={c.id} style={{ background: "#142514", borderBottom: "1px solid #133621" }}>
              <td style={{ padding: 12 }}>{c.id}</td>
              <td style={{ padding: 12 }}>{c.item}</td>
              <td style={{ padding: 12 }}>{c.quantity}</td>
              <td style={{ padding: 12 }}>{c.delivered}</td>
              <td style={{ padding: 12 }}>{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

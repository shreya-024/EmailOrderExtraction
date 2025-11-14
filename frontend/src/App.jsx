import { useState, useEffect } from "react";

function App() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/fetch-emails")
      .then(r => r.json())
      .then(d => setEmails(d));
  }, []);

  return (
    <div>
      <h2>Fetched Emails</h2>
      {emails.map((email) => (
        <div key={email.id}>
          <h3>{email.subject}</h3>
          <p>{email.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

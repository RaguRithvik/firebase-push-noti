// SendNotification.js
import React, { useState } from "react";

const SendNotification = ({ token }) => {
        
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);

  const sendNotification = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          token
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error sending notification:", error);
      setResponse({ error: "Failed to send notification" });
    }
  };

  return (
    <div>
      <h2>Send Notification</h2>
      <form onSubmit={sendNotification}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Notification</button>
      </form>

      {response && (
        <div>
          <h3>Response from Server:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SendNotification;

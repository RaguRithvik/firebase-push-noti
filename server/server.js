// server.js
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Endpoint to register tokens
app.post("/register-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).send("Token is required");
  }

  res.status(200).send({ message: "Token registered successfully" });
});

// Endpoint to send notifications
// Correct response format with JSON
app.post("/send-notification", async (req, res) => {
  const { title, body, token } = req.body;

  if (!title || !body || !token) {
    return res.status(400).json({ error: "Title and body are required" });
  }

  const message = { notification: { title, body }, token };
console.log(message, );

  try {
    const response = await admin.messaging().sendMulticast(message);
    console.log("Successfully sent message:", response);

    // Check for failures in the response
    if (response.failureCount > 0) {
      console.log("Failed to send to some tokens:", response.responses);
    }
    res
      .status(200)
      .json({ message: "Notification sent successfully", response });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending notification" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

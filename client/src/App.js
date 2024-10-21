// App.js or a Notifications component
import React, { useEffect, useState } from "react";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
import SendNotification from "./SendNotification";

const App = () => {
  const [gettoken, setGetToken] = useState(null);
  
  useEffect(() => {
    // Request permission and get FCM token
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey:
              "BM0bNk0e0ruriGbjIBlnZ3WqR9Qqd92pKzdTN-YMtW_SdBQYfBzAR2hfgCUT7sY7rqoRrOFWk-S7717Sr8HlIxw",
          });
          if (token) {
            console.log("FCM Token:", token);
            setGetToken(token)
            // You can send this token to your backend or store it as needed
            await sendTokenToBackend(token);
          } else {
            console.error(
              "No registration token available. Request permission to generate one."
            );
          }
        } else {
          console.error("Notification permission not granted.");
        }
      } catch (error) {
        console.error("Error getting permission or token:", error);
      }
    };

    requestPermission();
  }, []);
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // Customize how you handle the notification when the app is in the foreground
    });

    return () => unsubscribe();
  }, []);
  const sendTokenToBackend = async (token) => {
    try {
      // Make a POST request to the backend API with the token
      const response = await fetch("http://localhost:3000/register-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });

      const data = await response.json();
      console.log("Token sent to backend: ", data);
    } catch (error) {
      console.error("Error sending token to backend: ", error);
    }
  };
  return (
    <div className="App">
      <h1>React Firebase Push Notification</h1>
      <SendNotification token={gettoken}/>
    </div>
  );
};

export default App;

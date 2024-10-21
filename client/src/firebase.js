// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD4BaVAdWt8xTCcJXZWPoniihkZVJKLrXo",
  authDomain: "pushmsg-6ba08.firebaseapp.com",
  projectId: "pushmsg-6ba08",
  storageBucket: "pushmsg-6ba08.appspot.com",
  messagingSenderId: "496488439348",
  appId: "1:496488439348:web:dded9c5d5e1ae3743d3461",
  measurementId: "G-P2H6JNX54X",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import test from "node:test";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBAq6dVDDcwb8bl6941d-Bs_QATCNgwFo",
  authDomain: "chatapp-dotnet-b9185.firebaseapp.com",
  projectId: "chatapp-dotnet-b9185",
  storageBucket: "chatapp-dotnet-b9185.appspot.com",
  messagingSenderId: "551101561261",
  appId: "1:551101561261:web:d9c9a944dadce726ee0924",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import test from "node:test";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// TODO: add out firebase config
const firebaseConfig = {
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

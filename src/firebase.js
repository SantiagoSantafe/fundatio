// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCchFZ5o8ndMmjaESsCSSXsajHF_ck-cOQ",
  authDomain: "fundatio-c1791.firebaseapp.com",
  projectId: "fundatio-c1791",
  storageBucket: "fundatio-c1791.firebasestorage.app",
  messagingSenderId: "1051642057751",
  appId: "1:1051642057751:web:b51e6617f4ed5cb68b3852",
  measurementId: "G-PMJH9MFXJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
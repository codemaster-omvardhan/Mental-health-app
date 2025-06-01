// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATezuTyl5kJKnv2N2KZ2HIhqxwz5wv4oU",
  authDomain: "mental-health-d399a.firebaseapp.com",
  projectId: "mental-health-d399a",
  storageBucket: "mental-health-d399a.firebasestorage.app",
  messagingSenderId: "194895440338",
  appId: "1:194895440338:web:faccaca1ce6ad58cd2800b",
  measurementId: "G-74R7CVR5NB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);


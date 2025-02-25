// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiYTDMb6RPOa-k6S6pLFc8muizNyOZtVc",
  authDomain: "react-24c53.firebaseapp.com",
  projectId: "react-24c53",
  storageBucket: "react-24c53.firebasestorage.app",
  messagingSenderId: "738711921000",
  appId: "1:738711921000:web:dfffe82f190fae7beb76dd",
  measurementId: "G-5GM5KJWEHL"
};

// Initialize Firebase
export const Firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(Firebaseapp);
export const FirebaseAuth = getAuth(Firebaseapp);
export const FirebaseDB = getFirestore(Firebaseapp);
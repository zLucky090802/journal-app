// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getEnvironments } from "../helpers/getEnvironments";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
VITE_APIKEY,
VITE_AUTHDOMAIN,
VITE_PROJECTID,
VITE_STORAGEBUCKET,
VITE_MESSAGINGSENDERID,
VITE_APPID,
VITE_MEASUREMENTID,
} = getEnvironments();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBiYTDMb6RPOa-k6S6pLFc8muizNyOZtVc",
//   authDomain: "react-24c53.firebaseapp.com",
//   projectId: "react-24c53",
//   storageBucket: "react-24c53.firebasestorage.app",
//   messagingSenderId: "738711921000",
//   appId: "1:738711921000:web:dfffe82f190fae7beb76dd",
//   measurementId: "G-5GM5KJWEHL"
// };

//testing
// const firebaseConfig = {
//   apiKey: "AIzaSyAu09xcrmkM6cFRoWObb10j0rAPK5F9RBY",
//   authDomain: "journal-testing-9bef2.firebaseapp.com",
//   projectId: "journal-testing-9bef2",
//   storageBucket: "journal-testing-9bef2.firebasestorage.app",
//   messagingSenderId: "617753255030",
//   appId: "1:617753255030:web:a49c71c9c6dbee929ed357",
//   measurementId: "G-ZKEEF5V7R5"
// };
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
  measurementId: VITE_MEASUREMENTID
};

console.log(firebaseConfig)

// Initialize Firebase
export const Firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(Firebaseapp);
export const FirebaseAuth = getAuth(Firebaseapp);
export const FirebaseDB = getFirestore(Firebaseapp);
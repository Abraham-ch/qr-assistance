// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBTcsUrIA-X4bEjIEZDH4CG7AcIKN2DVsA",
  authDomain: "academia-galois.firebaseapp.com",
  projectId: "academia-galois",
  storageBucket: "academia-galois.firebasestorage.app",
  messagingSenderId: "398311904961",
  appId: "1:398311904961:web:5b23e8dd56df054e0f6640",
  measurementId: "G-25WBF35MMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
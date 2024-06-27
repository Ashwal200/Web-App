
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz-PX9Vl-E_hSmm1rhgWQihnEQR_QZDT8",
  authDomain: "webworkspace-54d30.firebaseapp.com",
  projectId: "webworkspace-54d30",
  storageBucket: "webworkspace-54d30.appspot.com",
  messagingSenderId: "465147165848",
  appId: "1:465147165848:web:3827f79f607582c931a4ed",
  measurementId: "G-E1D1CD7FDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, collection, getDocs, addDoc };
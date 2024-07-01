// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrNItA2CrnFPmWhWUNngrIYvH7qbHb9lQ",
  authDomain: "e-gram-68bd9.firebaseapp.com",
  projectId: "e-gram-68bd9",
  databaseURL : "https://e-gram-68bd9-default-rtdb.firebaseio.com",
  storageBucket: "e-gram-68bd9.appspot.com",
  messagingSenderId: "361466297504",
  appId: "1:361466297504:web:4132cb4b87ea1bf6d55dc5",
  measurementId: "G-SRYNQVJW8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app)
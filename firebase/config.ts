import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9NQXzAAapWTOVzFW2LjxcAWk3sgqbRdM",
  authDomain: "fusionx1.firebaseapp.com",
  projectId: "fusionx1",
  storageBucket: "fusionx1.firebasestorage.app",
  messagingSenderId: "270632516885",
  appId: "1:270632516885:web:85c3c231c348fd63113d1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNZ6Cigc5UmiChxtiDv7W7RBbscTuXdh0",
  authDomain: "final-project-apm.firebaseapp.com",
  projectId: "final-project-apm",
  storageBucket: "final-project-apm.appspot.com",
  messagingSenderId: "539495368819",
  appId: "1:539495368819:web:50130aab45d79f59154206",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

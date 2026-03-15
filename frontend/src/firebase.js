import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAO2py_pREf3DzoYXLczLJ6NkfrOSD35sI",
  authDomain: "algolab-11d3c.firebaseapp.com",
  projectId: "algolab-11d3c",
  storageBucket: "algolab-11d3c.firebasestorage.app",
  messagingSenderId: "207851538649",
  appId: "1:207851538649:web:78ae5476786c391de816c8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
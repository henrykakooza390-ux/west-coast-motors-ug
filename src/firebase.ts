import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCU89IJ36AZ4KXbY4cg9rzJUUeWq3TPGhw",
  authDomain: "carconnectug-webapp.firebaseapp.com",
  projectId: "carconnectug-webapp",
  storageBucket: "carconnectug-webapp.firebasestorage.app",
  messagingSenderId: "474265609577",
  appId: "1:474265609577:web:0aa6a66daa15f87bb909f8",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;
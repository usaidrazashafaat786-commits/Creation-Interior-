import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

let app;
let useRealFirebase = false;

// Only initialize real Firebase if configuration is valid and not placeholder
if (firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== "MOCK_API_KEY_FOR_LOCAL_BUILD") {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    useRealFirebase = true;
  } catch (err) {
    console.warn("Firebase initialization failed, falling back to Local Mock Mode.", err);
  }
}

export const db = useRealFirebase && app ? getFirestore(app) : null;
export const auth = useRealFirebase && app ? getAuth(app) : null;
export { useRealFirebase };

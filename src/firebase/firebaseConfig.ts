import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOB38XqDdoaLdzsccsSCqWU5Xsl9X4dPs",
  authDomain: "social-app-bd24e.firebaseapp.com",
  projectId: "social-app-bd24e",
  storageBucket: "social-app-bd24e.firebasestorage.app",
  messagingSenderId: "440469581381",
  appId: "1:440469581381:web:acc530d43aef91c341fd2c",
  measurementId: "G-PMYSQ2C6D4"
};

const app = initializeApp(firebaseConfig);

export const authFire = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
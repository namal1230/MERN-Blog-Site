import { authFire, googleProvider, facebookProvider } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";


export const registerWithEmail = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(authFire, email, password);
};

export const loginWithEmail = async (email: string, password: string) => {
  await signInWithEmailAndPassword(authFire, email, password);
};


export const loginWithGoogle = async () => {
  await signInWithPopup(authFire, googleProvider);
};


export const loginWithFacebook = async () => {
  await signInWithPopup(authFire, facebookProvider);
};

export const logout = async () => {
  await signOut(authFire);
};
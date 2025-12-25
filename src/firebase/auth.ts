import { authFire, githubAuthProvider, googleProvider, facebookProvider } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup ,
  getRedirectResult,
  signOut
} from "firebase/auth";

export const loginWithGitHub = async () => {
    await signInWithPopup (authFire, githubAuthProvider);
};


export const registerWithEmail = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(authFire, email, password);
};

export const loginWithEmail = async (email: string, password: string) => {
  await signInWithEmailAndPassword(authFire, email, password);
};


export const loginWithGoogle = async () => {
  await signInWithPopup (authFire, googleProvider);
};


export const loginWithFacebook = async () => {
  await signInWithPopup (authFire, facebookProvider);
};

export const logout = async () => {
  await signOut(authFire);
};

getRedirectResult(authFire)
  .then((result) => {
    if (result) {
      console.log(result.user);
    }
  })
  .catch((error) => {
    console.error(error);
  });

// googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')


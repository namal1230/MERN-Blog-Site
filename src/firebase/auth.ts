import { authFire, githubAuthProvider, googleProvider, facebookProvider } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  getRedirectResult,
  signOut,
  linkWithCredential,
  fetchSignInMethodsForEmail,
  GithubAuthProvider,
  GoogleAuthProvider,
  updateProfile
} from "firebase/auth";

export const loginWithGitHub = async () => {
  try {
    const result = await signInWithPopup(authFire, githubAuthProvider);
    console.log("GitHub login success", result.user);
    const rawInfo = (result as any)._tokenResponse?.rawUserInfo;
    const githubProfile = rawInfo ? JSON.parse(rawInfo) : null;

    const name =
      githubProfile?.name ||
      githubProfile?.login ||
      result.user.displayName ||
      result.user.email?.split("@")[0];

    // Update Firebase profile if needed
    if (name && result.user.displayName !== name) {
      await updateProfile(result.user, {
        displayName: name,
        photoURL: githubProfile?.avatar_url || result.user.photoURL
      });

      // Force refresh user
      await result.user.reload();
    }

    // Return normalized user object
    return {
      name,
      email: result.user.email || "",
      id: result.user.uid,
      profile: result.user.photoURL || githubProfile?.avatar_url || ""
    };

  } catch (error: any) {
    if (error.code !== "auth/account-exists-with-different-credential") {
      console.error("GitHub login error:", error);
      return;
    }

    // 🔹 Extract email + pending credential
    const email = error.customData?.email;
    const pendingCred = GithubAuthProvider.credentialFromError(error);

    if (!email || !pendingCred) {
      console.error("Missing email or pending credential");
      return;
    }
    

    // 🔹 Find existing sign-in methods
    const methods = await fetchSignInMethodsForEmail(authFire, email);

    /* ===============================
       EMAIL / PASSWORD ACCOUNT
    ================================ */
    if (methods.includes("password")) {
      const password = prompt(
        "This email is already registered. Enter your password to link GitHub:"
      );

      if (!password) return;

      const userCred = await signInWithEmailAndPassword(
        authFire,
        email,
        password
      );

      await linkWithCredential(userCred.user, pendingCred);
      alert("GitHub successfully linked!");
      return;
    }

    /* ===============================
       GOOGLE ACCOUNT
    ================================ */
    if (methods.includes("google.com")) {
      alert("This email already exists. Please sign in with Google to link GitHub.");

      const googleResult = await signInWithPopup(
        authFire,
        googleProvider
      );

      await linkWithCredential(googleResult.user, pendingCred);
      alert("GitHub successfully linked!");
      return;
    }

    /* ===============================
       FACEBOOK (OPTIONAL)
    ================================ */
    if (methods.includes("facebook.com")) {
      alert("Please sign in with Facebook to link GitHub.");

      const fbResult = await signInWithPopup(
        authFire,
        facebookProvider
      );

      await linkWithCredential(fbResult.user, pendingCred);
      alert("GitHub successfully linked!");
      return;
    }
  }
};




export const registerWithEmail = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(authFire, email, password);
};

export const loginWithEmail = async (email: string, password: string) => {
  await signInWithEmailAndPassword(authFire, email, password);
};


export const loginWithGoogle = async () => {
  const result = await signInWithPopup(authFire, googleProvider);
  return result;
};


export const loginWithFacebook = async () => {
  await signInWithPopup(authFire, facebookProvider);
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


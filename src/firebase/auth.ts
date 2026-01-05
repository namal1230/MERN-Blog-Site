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
  updateProfile,
  EmailAuthProvider,
} from "firebase/auth";

export const loginWithGitHub = async () => {
  try {
    const result = await signInWithPopup(authFire, githubAuthProvider);
   
    const rawInfo = (result as any)._tokenResponse?.rawUserInfo;
    const githubProfile = rawInfo ? JSON.parse(rawInfo) : null;

    const name =
      githubProfile?.name ||
      githubProfile?.login ||
      result.user.displayName ||
      result.user.email?.split("@")[0];


    if (name && result.user.displayName !== name) {
      await updateProfile(result.user, {
        displayName: name,
        photoURL: githubProfile?.avatar_url || result.user.photoURL
      });

      await result.user.reload();
    }

    return {
      name,
      email: result.user.email || "",
      id: result.user.uid,
      profile: result.user.photoURL || githubProfile?.avatar_url || ""
    };

  } catch (error: any) {
    if (error.code !== "auth/account-exists-with-different-credential") {
      
      return;
    }

    const email = error.customData?.email;
    const pendingCred = GithubAuthProvider.credentialFromError(error);

    if (!email || !pendingCred) {
      
      return;
    }


    const methods = await fetchSignInMethodsForEmail(authFire, email);

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

export const linkEmailToCurrentUser = async (
  email: string,
  password: string
) => {
  const user = authFire.currentUser;

  if (!user) {
    throw new Error("No logged-in user to link email to");
  }

  const credential = EmailAuthProvider.credential(email, password);
  return await linkWithCredential(user, credential);
};

export const loginWithEmail = async (email: string, password: string) => {
  await signInWithEmailAndPassword(authFire, email, password);
};


export const loginWithGoogle = async () => {
  const result = await signInWithPopup(authFire, googleProvider);
  return result;
};


export const loginWithFacebook = async () => {
  const result = await signInWithPopup(authFire, facebookProvider);

  const user = result.user;

  const name =
    user.displayName ||
    user.email?.split("@")[0] ||
    "Facebook User";

  if (!user.displayName) {
    await updateProfile(user, { displayName: name });
    await user.reload();
  }

  return {
    id: user.uid,
    name,
    email: user.email || "",
    profile: user.photoURL || ""
  };
};


export const logout = async () => {
  await signOut(authFire);
};

getRedirectResult(authFire)
  .then((result) => {
    if (result) {

    }
  })
  .catch((error) => {
    console.error(error);
  });




import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
  loginWithFacebook,
  loginWithGitHub,
  linkEmailToCurrentUser
} from "../firebase/auth";
import { authFire } from "../firebase/firebaseConfig";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { login } from "../api/auth.api"
import { useDispatch} from "react-redux";
import { setAuth } from "../utilities/slices/loginSlice";
import { useNavigate } from "react-router-dom";
export interface users {
  name: string,
  email: string,
  id: string,
  profile: string
}


const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<users>();
  const [emailstate, setemailstate] = useState<boolean>(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGitHubLogin = async () => {
    const loggedInUser = await loginWithGitHub();

    if (!loggedInUser) return;

    setUser(loggedInUser);

    const result = await login(loggedInUser);
    console.log("login->",result);
    dispatch(setAuth({
      token: result.token,
      name: loggedInUser.name,
      email: loggedInUser.email,
      profile: loggedInUser.profile,
      id: loggedInUser.id
    }));

    navigate("/home-page");
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();

      console.log(result);

      const currentUser = result.user || "";
      const userData:users = {
        id: currentUser.uid || "",
        name: currentUser.displayName || currentUser.email?.split("@")[0] || "",
        email: currentUser.email || "",
        profile: currentUser.photoURL || ""
      };

      if (userData) {
        setUser(userData);
      }

      const backendResult = await login(userData);

      dispatch(setAuth({
        token: backendResult.token,
        name: userData.name,
        email: userData.email,
        profile: userData.profile,
        id: userData.id
      }));

      navigate("/home-page");
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const fbUser = await loginWithFacebook();
      if (!fbUser) return;

      setUser(fbUser);

      const backendResult = await login(fbUser);

      dispatch(setAuth({
        token: backendResult.token,
        name: fbUser.name,
        email: fbUser.email,
        profile: fbUser.profile,
        id: fbUser.id
      }));

      navigate("/home-page");
    } catch (err) {
      console.error("Facebook login failed:", err);
    }
  };

  const handleEmailLogin = async () => {
    try {
      await loginWithEmail(email, password);
      const currentUser = authFire.currentUser;

      if (!currentUser) return;

      const userData = {
        id: currentUser.uid,
        name: currentUser.displayName || email.split("@")[0],
        email: currentUser.email || "",
        profile: currentUser.photoURL || ""
      };

      const backendResult = await login(userData);

      dispatch(setAuth({
        token: backendResult.token,
        name: userData.name,
        email: userData.email,
        profile: userData.profile,
        id: userData.id
      }));

      navigate("/home-page");
    } catch (err) {
      handleEmailRegister();
    }
  };

  const EmailRegister = async () => {
    try {
      await registerWithEmail(email, password);

    } catch (err: any) {

      if (err.code === "auth/email-already-in-use") {
        if (authFire.currentUser) {
          await linkEmailToCurrentUser(email, password);
          alert("Email successfully linked to your account");
        }
        else {
          alert("Email already exists. Please login instead.");
          return;
        }

      } else {
        alert("Registration failed");
        return;
      }
    }

    const currentUser = authFire.currentUser;
    if (!currentUser) return;

    const userData = {
      id: currentUser.uid,
      name: currentUser.displayName || email.split("@")[0],
      email: currentUser.email || "",
      profile: currentUser.photoURL || ""
    };

    const backendResult = await login(userData);

    dispatch(setAuth({
      token: backendResult.token,
      name: userData.name,
      email: userData.email,
      profile: userData.profile,
      id: userData.id
    }));

    navigate("/home-page");
  };



  const handleEmailRegister = async () => {
    setemailstate(false)
  };



  return (
    emailstate ? (<Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: 2
      }}
    >
      <Typography variant="h6">Welcome back.</Typography>

      <Button
        variant="contained"
        color="error"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
        fullWidth
      >
        Continue with Google
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#1877F2", "&:hover": { backgroundColor: "#145dbf" } }}
        startIcon={<FacebookIcon />}
        onClick={handleFacebookLogin}
        fullWidth
      >
        Continue with Facebook
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#1877F2", "&:hover": { backgroundColor: "#145dbf" } }}
        startIcon={<GitHubIcon />}
        onClick={handleGitHubLogin}
        fullWidth
      >
        Continue with GitHub
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#1877F2", "&:hover": { backgroundColor: "#145dbf" } }}
        startIcon={<MailOutlineIcon />}
        fullWidth
        onClick={handleEmailRegister}
      >
        CONTINUE WITH EMAIL
      </Button>

      {user && (
        <Typography sx={{ mt: 2 }}>
          Logged in as: {user.name && user.email}
        </Typography>
      )}
    </Box>) :
      (<Box>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <Button variant="contained" onClick={handleEmailLogin} fullWidth>
          Login with Email
        </Button>

        <Button variant="outlined" onClick={EmailRegister} fullWidth>
          Register with Email
        </Button>

      </Box>)
  );
};

export default Signup;
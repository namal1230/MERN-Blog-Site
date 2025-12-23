import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
  loginWithFacebook,
} from "../firebase/auth";
import { authFire } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link } from "react-router-dom";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFire, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleEmailLogin = async () => {
    await loginWithEmail(email, password);
  };

  const handleEmailRegister = async () => {
    await registerWithEmail(email, password);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: 2
      }}
    >
      <Typography variant="h4">Welcome back.</Typography>

      {/* <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /> */}
      {/* <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> */}

      {/* <Button variant="contained" onClick={handleEmailLogin} fullWidth>
        Login with Email
      </Button> */}
      {/* <Button variant="outlined" onClick={handleEmailRegister} fullWidth>
        Register with Email
      </Button> */}

      <Button
        variant="contained"
        color="error"
        startIcon={<GoogleIcon />}
        onClick={loginWithGoogle}
        fullWidth
      >
        Continue with Google
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#1877F2", "&:hover": { backgroundColor: "#145dbf" } }}
        startIcon={<FacebookIcon />}
        onClick={loginWithFacebook}
        fullWidth
      >
        Continue with Facebook
      </Button>
      <Button
       variant="contained"
        sx={{ backgroundColor: "#1877F2", "&:hover": { backgroundColor: "#145dbf" } }}
        startIcon={<MailOutlineIcon />}
        fullWidth
      >
        CONTINUE WITH EMAIL
      </Button>

      {user && (
        <Typography sx={{ mt: 2 }}>
          Logged in as: {user.displayName || user.email}
        </Typography>
      )}
    </Box>
  );
};

export default SignUp;
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
  loginWithFacebook,
  loginWithGitHub
} from "../firebase/auth";
import { authFire } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SignUp from "../pages/Signup";
import {login} from "../api/auth.api"
import { useDispatch,useSelector } from "react-redux";
import { setAuth } from "../utilities/slices/loginSlice";
import { useNavigate } from "react-router-dom";
export interface users{
  name:string,
  email:string,
  id:string,
  profile:string
}


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<users | null>(null);
  const [signUp,setSignUp] = useState(false);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const auth = useSelector((state: RootState)=>state.authSlice.value)
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFire, (currentUser) => {
      if (currentUser) {
        setUser({name: currentUser.displayName || "", email: currentUser.email || "", id: currentUser.uid || "", profile: currentUser.photoURL || ""});
      }
      console.log(currentUser)
    });
    return () => unsubscribe();
  }, []);

  useEffect(()=>{
    const loginEvent=async ()=>{
      if (user) {
        alert("Works")
        const result = await login({name:user.name,email:user.email,id:user.id,profile:user.profile})
        console.log(result);

        dispatch(setAuth({token:result.token,name:user.name,email:user.email,profile:user.profile,id:user.id}))
        navigate("/home-page")
      }
    }
    loginEvent();
  },[user])

  const signIn=()=>{
    <SignUp/>
  }

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
      {/* {auth} */}
      <Typography variant="h6">Join Smart Blog Phost</Typography>
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
        startIcon={<GitHubIcon />}
        onClick={loginWithGitHub}
        fullWidth
      >
        Continue with GitHub
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
          Logged in as: {user.name && user.email}
        </Typography>
      )}
      {/* <Button onClick={close}>Cancel</Button>
      <Button onClick={()=>setSignUp(true)}>Already have an account? Sign Up</Button> */}
      {/* {signUp && <SignUp/>} */}
    </Box>
  );
};

export default SignIn;
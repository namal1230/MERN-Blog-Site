import React, { useState } from "react";
import { Box, Button, Icon } from "@mui/material";
import SignUp from "../pages/Signup";
import SignIn from "../pages/SignIn";
import ClearIcon from '@mui/icons-material/Clear';
type ChildProps = {
  close: () => void;
};
const DashTopup = ({ close }: ChildProps) => {
  const [signIn, setSignIn] = useState(true); 
  
   const toggleSign = () => {
    // console.log(signIn);
    console.log("hii")
    
    setSignIn(prev => !prev); // toggle between SignIn and SignUp
  };

  
  return(
  <div>
    <Box>
        {signIn ? <SignIn /> : <SignUp />} 
 <Button sx={{position:"absolute",top:10,right:0}} startIcon={<ClearIcon/>} onClick={close} color="inherit">
      </Button>
      <Button fullWidth sx={{textTransform:"none", color:"black"}} onClick={toggleSign}>{signIn ? "Already have an account? Sign In":"Don't have an account? Sign Up"}</Button>

      {/* <Button onClick={()=>toggleSign()} variant="text">
        {signIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
      </Button> */}

    </Box>
  </div>
  );
};

export default DashTopup;

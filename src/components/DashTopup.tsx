import { useState } from "react";
import { Box, Button } from "@mui/material";
import SignUp from "../pages/Signup";
import SignIn from "../pages/SignIn";
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";

type ChildProps = {
    close: () => void;
};
const DashTopup = ({ close }: ChildProps) => {
    const [signIn, setSignIn] = useState(true);

    const toggleSign = () => {
        setSignIn(prev => !prev);
    };

    const navigate = useNavigate();

    return (
        <div>
            <Box>
                {signIn ? <SignIn /> : <SignUp />}
                <Button sx={{ position: "absolute", top: 10, right: 0 }} startIcon={<ClearIcon />} onClick={close} color="inherit">
                </Button>
                <Button fullWidth sx={{ textTransform: "none", color: "black" }} onClick={toggleSign}>{signIn ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</Button>

                <Button fullWidth onClick={() => navigate("/request-credentials")} sx={{ pt: 1, textTransform: "none", color: "black" }}>{!signIn && "Forgot email or trouble signing in?"}</Button>

            </Box>
        </div>
    );
};

export default DashTopup;

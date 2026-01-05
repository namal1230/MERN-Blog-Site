import { Box, Button, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
        px: 2,
      }}
    >
      <LockOutlinedIcon sx={{ fontSize: 80, color: "error.main" }} />

      <Typography variant="h4" fontWeight="bold">
        Access Denied
      </Typography>

      <Typography color="text.secondary" maxWidth={400}>
        You do not have permission to access this page.
        Please login with an authorized account.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate("/")}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Unauthorized;

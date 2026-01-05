import React, { useState } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import { sendResolveLogin } from "../api/admin.api";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface EmailResponseProps {
  emailIds: string;
}

const EmailResponse: React.FC<EmailResponseProps> = ({ emailIds }) => {
  const axiosPrivate = useAxiosPrivate();
  const [description, setDescription] = useState("Thank you for contacting us. We have received your request and please check again now.");
  const [error, setError] = useState("");

  const handleSend = () => {
    if (!description.trim()) {
      setError("Please enter a message before sending.");
      return;
    }

    const sendEmail = async () => {
      await sendResolveLogin(axiosPrivate, emailIds, description);
    }

    sendEmail();
    setError("");
    setDescription("");
    alert("Email sent successfully!");
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, margin: "auto", mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Send Email Response
      </Typography>
      {emailIds}
      <Typography variant="body1" sx={{ mb: 2 }}>
        To: <strong>{""}</strong>
      </Typography>

      <TextField
        label="Message / Description"
        multiline
        minRows={4}
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={!!error}
        helperText={error}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" onClick={handleSend}>
        Send Email
      </Button>
    </Paper>
  );
};

export default EmailResponse;
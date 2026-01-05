import { Box, Button, TextField, Typography, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { reportPhost } from "../api/sendPhosts.api";
import { useSelector } from "react-redux";
import type { RootState } from "../utilities/store/store";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface ReportContentProps {
    ids: string;
    visibility: any;
}

const ReportContent: React.FC<ReportContentProps> = ({ ids, visibility }) => {
    const axiosPrivate = useAxiosPrivate();
    const [form, setForm] = useState({
        reportType: "POST",
        reason: "",
        description: "",
        frequency: "",
        evidence: "",
        acknowledge: false,
    });

    const email = useSelector((state: RootState) => state.persistedReducer.email);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (
            !form.reason ||
            !form.description ||
            !form.frequency ||
            !form.acknowledge
        ) {
            alert("Please fill all required fields");
            return;
        }
        await reportPhost(axiosPrivate, ids, email, form);

    };

    return (
        <Box
            sx={{
                zIndex: 10,
                backgroundColor: "white",
                width: "50%",
                minHeight: "60%",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                margin: "auto",
                padding: 4,
                borderRadius: 2,
                boxShadow: 6,
            }}
        >
            {ids}
            <Typography variant="h5" gutterBottom>
                Report Content
            </Typography>

            <TextField
                select
                fullWidth
                label="Report Type"
                name="reportType"
                value={form.reportType}
                onChange={handleChange}
                margin="normal"
                required
            >
                <MenuItem value="POST">Post</MenuItem>
                <MenuItem value="USER">User</MenuItem>
            </TextField>

            <TextField
                select
                fullWidth
                label="Reason for Report"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                margin="normal"
                required
            >
                <MenuItem value="SPAM">Spam or misleading</MenuItem>
                <MenuItem value="HARASSMENT">Harassment or hate speech</MenuItem>
                <MenuItem value="ILLEGAL">Illegal content</MenuItem>
                <MenuItem value="NUDITY">Nudity or sexual content</MenuItem>
                <MenuItem value="COPYRIGHT">Copyright violation</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
            </TextField>

            <TextField
                fullWidth
                multiline
                rows={4}
                label="Explain the issue"
                name="description"
                value={form.description}
                onChange={handleChange}
                margin="normal"
                required
            />

            <TextField
                select
                fullWidth
                label="How many times have you faced this?"
                name="frequency"
                value={form.frequency}
                onChange={handleChange}
                margin="normal"
                required
            >
                <MenuItem value="ONCE">Once</MenuItem>
                <MenuItem value="MULTIPLE">Multiple times</MenuItem>
                <MenuItem value="ONGOING">Ongoing issue</MenuItem>
            </TextField>

            <TextField
                fullWidth
                label="Evidence (optional link)"
                name="evidence"
                value={form.evidence}
                onChange={handleChange}
                margin="normal"
                placeholder="Screenshot / URL (optional)"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={form.acknowledge}
                        onChange={(e) =>
                            setForm({ ...form, acknowledge: e.target.checked })
                        }
                    />
                }
                label="I confirm that this report is truthful and accurate"
            />

            <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" color="secondary" onClick={visibility}>
                    Cancel
                </Button>
                <Button variant="contained" color="error" onClick={handleSubmit}>
                    Submit Report
                </Button>
            </Box>
        </Box>
    );
}

export default ReportContent;
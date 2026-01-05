import {
    Box,
    Card,
    IconButton,
    Typography,
    Tooltip,
    Menu,
    MenuItem,
    Avatar
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import EmailResponse from "./EmailResponse";

interface EmailContentProps {
    emailId: string;
    email: string;
    source: string;
    title?: string;
    body?: string;
    createdAt: string;
    updatedAt?: string;
    profile?: string;
    status?: string;
}

const EmailContent: React.FC<EmailContentProps> = ({ emailId, email, title, body, createdAt, profile, status }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [emailbox, setEmailBox] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleString()
        : "";

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                p: 2,
                mb: 1,
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: "background.paper",
                "&:hover": { boxShadow: 4 }
            }}
        >
            <Avatar
                alt={email}
                src={profile}
                sx={{
                    width: { xs: 48, sm: 56 },
                    height: { xs: 48, sm: 56 },
                    mb: { xs: 1, sm: 0 }
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    flex: 1,
                    alignItems: { xs: "flex-start", sm: "center" },
                    pl: { sm: 2 },
                    width: "100%",
                    flexWrap: "wrap",
                    gap: 1
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ flex: { xs: "100%", sm: 2 }, wordBreak: "break-word" }}
                >
                    {title || "-"}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ flex: { xs: "100%", sm: 3 }, wordBreak: "break-word" }}
                >
                    {body || "-"}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ flex: { xs: "100%", sm: 2 }, wordBreak: "break-word" }}
                >
                    {email}
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ flex: { xs: "100%", sm: 2 } }}
                >
                    {formattedDate}
                </Typography>
                <Tooltip title="Mark as Read">
                    <IconButton onClick={() => setEmailBox(!emailbox)}>
                        <MarkEmailReadIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            {status === "pending" && (
                <Tooltip title="More" placement="left">
                    <IconButton
                        onClick={handleClick}
                        sx={{ ml: "auto", mt: { xs: 1, sm: 0 } }}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                </Tooltip>
            )}

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem>View</MenuItem>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </Menu>
            {emailbox && <EmailResponse emailIds={emailId} />}
        </Card>
    );
};

export default EmailContent;

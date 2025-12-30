import {
    Box,
    Card,
    CardContent,
    IconButton,
    Typography,
    Tooltip,
    Menu,
    MenuItem,
    Avatar
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

const EmailContent = ({
    emailId,
    email,
    source,
    title,
    body,
    createdAt,
    updatedAt,
    profile,
    status
}: EmailContentProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

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
            {/* Avatar */}
            <Avatar
                alt={email}
                src={profile}
                sx={{
                    width: { xs: 48, sm: 56 },
                    height: { xs: 48, sm: 56 },
                    mb: { xs: 1, sm: 0 }
                }}
            />

            {/* Text Content */}
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
            </Box>

            {/* More Actions */}
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
        </Card>
    );
};

export default EmailContent;

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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { getReportedUser } from "../api/admin.api";
import PersonIcon from '@mui/icons-material/Person';
import ReportIcon from '@mui/icons-material/Report';
import { deleteReport } from "../api/draftPhosts.api";
import { rejectedUserAccount } from "../api/admin.api";
import ViewReportEmail from "./ViewReportEmail";
import VisibilityIcon from '@mui/icons-material/Visibility';
interface User {
    _id: string;
    name: string;
    email: string;
    profile?: string;
    createdAt: string;
    updatedAt: string;
    reportId: string;

}

const ReportUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [visibility,setVisibility] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            const response = await getReportedUser();
            console.log("response->", response);

            setUsers(response.users);
        };
        getUsers();
    }, []);

    useEffect(() => {
        console.log(users);
    }, [users])
    const formattedDate = (date: string) =>
        new Date(date).toString().split(" GMT")[0];

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const deleteReports = async (id: string) => {
        if(!id) return;
        const response = await deleteReport(id);
    }

    const rejectUser = async (name: string,reportId:string) => {
        if(!name) return;
        const response = await rejectedUserAccount(name,reportId);
    }

    return (
        <Box>
            {users.map((user) => (
                <Card
                    key={user._id}
                    sx={{ display: "flex", alignItems: "center", p: 1, mb: 1 }}
                >
                    {/* Avatar */}
                    <Avatar
                        src={user.profile || ""}
                        alt={user.name}
                        sx={{ width: 56, height: 56 }}
                    />

                    {/* User Info */}
                    <Box sx={{ display: "flex", flexDirection: "column", pl: 2 }}>
                        <CardContent sx={{ p: 0 }}>
                            <Typography variant="h6">{user.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user.email}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Created at {formattedDate(user.createdAt)}
                            </Typography>
                        </CardContent>
                    </Box>

                    <Tooltip title="View profile" placement="left">
                        <IconButton onClick={() => navigate("/user-profile?name=" + user.name)} sx={{ ml: "auto" }}>
                            <PersonIcon />
                        </IconButton>
                    </Tooltip>
                    {/* Actions */}
                    <Tooltip title="More" placement="left">
                        <IconButton onClick={handleClick}>
                            <ReportIcon />
                        </IconButton>
                    </Tooltip>
                <Tooltip title="View Email" placement="left">
                    <IconButton onClick={()=>setVisibility(!visibility)}>
                        <VisibilityIcon/>
                    </IconButton>
                </Tooltip>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        sx={{ width: "120vw" }}
                    >
                        <MenuItem onClick={() => rejectUser(user.name,user.reportId)}>Reported</MenuItem>
                        <MenuItem onClick={() => deleteReports(user.reportId)}>Cancel</MenuItem>
                    </Menu>
                    {visibility && <ViewReportEmail id={user.reportId} status="user"/>}
                </Card>
            ))}
        </Box>
    );
};

export default ReportUsers;

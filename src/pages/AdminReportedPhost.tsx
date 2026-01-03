import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
    Tooltip,
    Menu,
    MenuItem
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteReport, approvePhosts, rejectPhosts } from "../api/draftPhosts.api";
import VisibilityIcon from '@mui/icons-material/Visibility';
interface propTypes {
    draftId: string;
    image: string | null | undefined;
    title: string;
    createdAt: string;
    status: string;
}
import ReportIcon from '@mui/icons-material/Report';
import ViewReportEmail from "./ViewReportEmail";

const AdminReportedPhost: React.FC<propTypes> = ({ draftId, image, title, createdAt, status }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


    const [darftIds, setdarftId] = useState<string>();
    const [images, setimage] = useState<string>();
    const [titles, settitle] = useState<string>();
    const [createdAts, setcreatedAt] = useState<string>();
    const [visibility,setVisibility] = useState<boolean>(false);


    const navigate = useNavigate();

    useEffect(() => {
        if (!createdAt) return;

        const date = new Date(createdAt);
        const formatted = date.toString().split(" GMT")[0];
        console.log(formatted);
        setdarftId(draftId);
        setimage(image ? image : "");
        settitle(title);
        setcreatedAt(formatted);
    }, []);

    const rejectPhost = async () => {
        if (!darftIds) return
        const result = await rejectPhosts(darftIds)
        console.log("reject->",result);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const deleteReports = async () => {
        if (!darftIds) return;

        const result = await deleteReport(darftIds);
         console.log("reject->",result);

    }

    return (
        <Card sx={{ display: "flex", alignItems: "center", p: 1 }}>
            <CardMedia
                component="img"
                sx={{ width: 151, height: 120, objectFit: "cover" }}
                image={images}
                alt="cover"
            />

            <Link key={darftIds} to={`/post-page?id=${darftIds}`}>
                <Box sx={{ display: "flex", flexDirection: "column", pl: 2 }}>
                    <CardContent sx={{ p: 0 }}>
                        <Typography variant="h6">{titles}</Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            {createdAts}
                        </Typography>
                    </CardContent>
                </Box>
            </Link>

            <Box sx={{ ml: "auto" }}>
                <Tooltip title="View Email" placement="left">
                    <IconButton onClick={()=>setVisibility(!visibility)}>
                        <VisibilityIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="More" placement="left">
                    <IconButton onClick={handleClick}>
                        <ReportIcon />
                    </IconButton>
                </Tooltip>
            </Box>

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
                <MenuItem onClick={() => rejectPhost()}>Reported</MenuItem>
                <MenuItem onClick={() => navigate(`/post-page?id=${darftIds}&status=report`)}>Preview</MenuItem>
                <MenuItem onClick={() => deleteReports()}>Cancel</MenuItem>
            </Menu>
            {visibility && <ViewReportEmail id={draftId}/>}
        </Card>
    );
};

export default AdminReportedPhost;

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
import { approvePhosts, rejectPhosts } from "../api/draftPhosts.api";
interface propTypes {
  draftId: string;
  image: string | null | undefined;
  title: string;
  createdAt: string;
  status: string;
}
import BeenhereIcon from '@mui/icons-material/Beenhere';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AdminDraftBox: React.FC<propTypes> = ({ draftId, image, title, createdAt }) => {

  const axiosPrivate = useAxiosPrivate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const [darftIds, setdarftId] = useState<string>();
  const [images, setimage] = useState<string>();
  const [titles, settitle] = useState<string>();
  const [createdAts, setcreatedAt] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!createdAt) return;

    const date = new Date(createdAt);
    const formatted = date.toString().split(" GMT")[0];

    setdarftId(draftId);
    setimage(image ? image : "");
    settitle(title);
    setcreatedAt(formatted);
  }, []);

  const approvePhost = async () => {
    if (!darftIds) return
    try{
   await approvePhosts(axiosPrivate, darftIds)
   alert("Phost Published Successfully")
    }catch(err){
      alert("Phost Not Published")
      
    }
  }

  const rejectPhost = async () => {
    if (!darftIds) return
    try{
    await rejectPhosts(axiosPrivate, darftIds)
    alert("Phost Rejected Failed")
   }catch(err){
      alert("Phost Not Rejected")
      
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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

      <Tooltip title="More" placement="left">
        <IconButton onClick={handleClick} sx={{ ml: "auto" }}>
          <BeenhereIcon />
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
        <MenuItem onClick={() => approvePhost()}>Approve</MenuItem>
        <MenuItem onClick={() => rejectPhost()}>Reject</MenuItem>
        <MenuItem onClick={() => navigate(`/post-page?id=${darftIds}&status=draft`)}>Preview</MenuItem>
      </Menu>
    </Card>
  );
};

export default AdminDraftBox;
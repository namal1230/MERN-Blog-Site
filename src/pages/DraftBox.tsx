import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  Alert
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePhost } from "../api/draftPhosts.api";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
interface propTypes {
  draftId: string;
  image: string | null | undefined;
  title: string;
  createdAt: string;
  status: string;
}

const DraftBox: React.FC<propTypes> = ({ draftId, image, title, createdAt, status }) => {
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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const deletePhosts = async () => {
    if (!darftIds) return;
    try{
     await deletePhost(axiosPrivate, darftIds);
     <Alert severity="success">Delete Phost SuccessFully.</Alert>
    }catch(err){
      <Alert severity="error">Delete Phost Issue.</Alert>
    }
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

      <Tooltip title="More" placement="left">
        {status == "pending" ? <IconButton onClick={handleClick} sx={{ ml: "auto" }}>
          <MoreHorizIcon />
        </IconButton> : <h1></h1>}
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
        <MenuItem onClick={() => navigate(`/edit-post-page?id=${darftIds}`)}>Edit</MenuItem>
        <MenuItem onClick={() => deletePhosts()}>Delete</MenuItem>
        <MenuItem onClick={() => navigate(`/post-page?id=${darftIds}`)}>Preview</MenuItem>
      </Menu>
    </Card>
  );
};

export default DraftBox;
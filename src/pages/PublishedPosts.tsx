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
  Badge,
  Button,
  Stack
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePhost } from "../api/draftPhosts.api";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { downloadsPDF } from "../api/sendPhosts.api";
import ReportContent from "./ReportContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

interface propTypes {
  draftId: string;
  image: string | null | undefined;
  title: string;
  createdAt: string;
  status: string;
  name:string;
  like:number;
  comment:number;
}

const PublishedPosts = ({ draftId, image, title, createdAt, status,name, like,comment }: propTypes) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorsEl, setAnchorsEl] = useState<null | HTMLElement>(null);

  const [visible, setvisible] = useState<boolean>(false);
  const [darftIds, setdarftId] = useState<string>();
  const [images, setimage] = useState<string>();
  const [titles, settitle] = useState<string>();
  const [createdAts, setcreatedAt] = useState<string>();
  const [names, setnames] = useState<string>();

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
    setnames(name);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const downloadPdf = async () => {
    try {
      const response = await downloadsPDF(darftIds);

      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `${titles}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed", error);
    }
  }

  const handlePrivacyClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorsEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorsEl(null);
  };

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorsEl);
  const reportContent = async () => {
    setvisible(!visible);


    // const result = await deletePhost(darftIds);
    // console.log(result);

  }

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 1 }}>
      {/* Image */}
      <CardMedia
        component="img"
        sx={{ width: 151, height: 120, objectFit: "cover" }}
        image={images}
        alt="cover"
      />

      {/* Text Content */}
      <Link key={darftIds} to={`/publihed-post-page?id=${darftIds}`}>
        <Box sx={{ display: "flex", flexDirection: "column", pl: 2 }}>
          <CardContent sx={{ p: 0 }}>
            <Typography variant="h6">{titles} | {names}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {createdAts}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">

              <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton color="error" disabled>
                  <FavoriteIcon /> 
                </IconButton>
                <Typography variant="body2">{like}</Typography>
              </Stack>

              <Stack direction="row" spacing={0.5} alignItems="center">
                <ChatBubbleOutlineIcon fontSize="small"/>
                <Typography variant="body2">{comment}</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Box>
      </Link>

      {/* More Icon */}
      <Box sx={{ ml: "auto" }}>
        <Tooltip title="Download pdf" placement="left">
          <IconButton onClick={downloadPdf} sx={{ ml: "auto" }}>
            <SimCardDownloadIcon />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="More" placement="left">
          <IconButton onClick={handleClick} sx={{ ml: "auto" }}>
            <MoreHorizIcon />
          </IconButton>
        </Tooltip> */}
        <Tooltip title="Report" placement="left">
          <IconButton onClick={handlePrivacyClick} sx={{ ml: "auto" }}>
            <BeenhereIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Top-up Menu */}
      {/* <Menu
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
        <MenuItem onClick={() => navigate(`/publihed-post-page?id=${darftIds}`)}>Preview</MenuItem>
      </Menu> */}

      <Menu
        anchorEl={anchorsEl}
        open={open2}
        onClose={handleClose2}
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
        <MenuItem onClick={() => reportContent()}>Reported Content</MenuItem>
      </Menu>

     {visible==true && <ReportContent ids={draftId} visibility={reportContent}/>}

    </Card>
  );
};

export default PublishedPosts;
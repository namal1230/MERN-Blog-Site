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
  Stack
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import ReportContent from "./ReportContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonIcon from '@mui/icons-material/Person';
interface propTypes {
  draftId: string;
  image: string | null | undefined;
  title: string;
  createdAt: string;
  status: string;
  name: string;
  like: number;
  comment: number;
}

const PublishedPosts: React.FC<propTypes> = ({ draftId, image, title, createdAt, name, like, comment }) => {
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

    setdarftId(draftId);
    setimage(image ? image : "");
    settitle(title);
    setcreatedAt(formatted);
    setnames(name);
  }, []);

  const handlePrivacyClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorsEl(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorsEl(null);
  };

  const open2 = Boolean(anchorsEl);
  const reportContent = async () => {
    setvisible(!visible);

  }

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 1 }}>
      <CardMedia
        component="img"
        sx={{ width: 151, height: 120, objectFit: "cover" }}
        image={images}
        alt="cover"
      />

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
                <ChatBubbleOutlineIcon fontSize="small" />
                <Typography variant="body2">{comment}</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Box>
      </Link>

      <Box sx={{ ml: "auto" }}>
        <Tooltip title="View profile" placement="left">
          <IconButton onClick={() => navigate("/user-profile?name=" + name)} sx={{ ml: "auto" }}>
            <PersonIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download PDF" placement="left">
          <IconButton
            component="a"
            href={`https://mern-be-production.up.railway.app/phosts/download-phost?id=${darftIds}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ml: "auto" }}
          >
            <SimCardDownloadIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Report" placement="left">
          <IconButton onClick={handlePrivacyClick} sx={{ ml: "auto" }}>
            <BeenhereIcon />
          </IconButton>
        </Tooltip>
      </Box>

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

      {visible == true && <ReportContent ids={draftId} visibility={reportContent} />}

    </Card>
  );
};

export default PublishedPosts;
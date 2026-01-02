import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  Divider
} from '@mui/material';
import { getDraftPhost } from '../api/draftPhosts.api';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import type { RootState } from '../utilities/store/store';
import { useSelector } from 'react-redux';
import { sendReaction, getReaction } from '../api/sendPhosts.api';

type Format = "IMG" | "TEXT" | "VIDEO" | "EMBED" | "UNSPLASH";

export interface phost {
  type: Format;
  value?: string;
}

export interface comments {
  username: string;
  text: string;
  createdAt: string;
  profilePicture?:string;
}

const PublishedUI: React.FC = () => {
  const [params] = useSearchParams();
  const value = params.get("id");

  const image = useSelector((state: RootState) => state.profile);
  const name: string = useSelector((state: RootState) => state.name) || "";

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [lines, setLines] = useState<phost[]>([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [status, setStatus] = useState("");

  const [liked, setLiked] = React.useState(false);
  const [likeds, setLikeds] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(12); // backend later
  const [comment, setComment] = React.useState<string>("");
  const [comments, setComments] = React.useState<comments[]>([]);
  const [active, setactive] = React.useState<boolean>(false);
  const [activeLike, setactiveLike] = React.useState<boolean>(false);

  const sendReactionTrigger = async () => {
    // alert("trigger reaction")
    if (active || activeLike) {
      alert(`trigger comment reaction ${comment}`)
      console.log(liked);
      
      await sendReaction(value || "", liked, comment, name, image)
      setComment("");
      setactive(false)
    }
  }

  useEffect(() => {
    if (activeLike) {
      alert("trigger comment reaction")


      const sendAPI = async () => {
        const response = await sendReaction(value || "", liked, "", name, image)
      }

      sendAPI();
      setactiveLike(false);
      setLiked(false);
    }
  }, [liked])

  useEffect(() => {
    if (!value) return;

    const getDrafts = async () => {
      const result = await getDraftPhost(value);
      setTitle(result.title);
      setLines(result.body);
      setCode(result.code || "");
      setCreatedAt(result.createdAt);
      setUpdatedAt(result.updatedAt);
      setStatus(result.status);
    };

    getDrafts();
  }, [value]);

  useEffect(() => {
    const getReactions = async () => {
      const response = await getReaction(value || "",name);
      console.log(response);
      setLikeCount(response.totalLikes);
      setLikeds(response.isLikedByUser); 
      const commentsData = response.comments.map((c: any) => ({
        username: c.username,
        text: c.comment,  
        createdAt: c.createdAt,
        profilePicture:c.profilePicture,
      }));
      setComments(commentsData);
      // setprofile(response.comments.profilePicture);
      
    }
    getReactions();
  }, [])

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Card elevation={3}>
        <CardContent>
          {/* Title */}
          <Typography variant="h4" fontWeight={600} gutterBottom>
            {title}
          </Typography>

          {/* Meta */}
          <Typography variant="body2" color="text.secondary">
            Status: {status} • Created: {new Date(createdAt).toLocaleDateString()}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Body */}
          <Stack spacing={3}>
            {lines.map((block, index) => {
              switch (block.type) {
                case "TEXT":
                  return (
                    <Typography key={index} variant="body1" lineHeight={1.8}>
                      {block.value}
                    </Typography>
                  );

                case "IMG":
                case "UNSPLASH":
                  return (
                    <Box key={index} textAlign="center">
                      <Box
                        component="img"
                        src={block.value}
                        alt="phost"
                        sx={{
                          maxWidth: "100%",
                          borderRadius: 2
                        }}
                      />
                    </Box>
                  );

                case "VIDEO":
                  return (
                    <Box key={index}>
                      <video width="100%" controls>
                        <source src={block.value} />
                        Not supported
                      </video>
                    </Box>
                  );

                case "EMBED":
                  return (
                    <Typography key={index}>
                      <a href={block.value} target="_blank" rel="noopener noreferrer">
                        {block.value}
                      </a>
                    </Typography>
                  );

                default:
                  return null;
              }
            })}
          </Stack>

          {/* Code Block */}
          {code && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" gutterBottom>
                Code
              </Typography>

              <Box
                component="pre"
                sx={{
                  bgcolor: "#0d1117",
                  color: "#c9d1d9",
                  p: 2,
                  borderRadius: 2,
                  overflowX: "auto",
                  fontSize: "0.9rem"
                }}
              >
                <code>{code}</code>
              </Box>
            </>
          )}
        </CardContent>
      </Card>


      <Stack direction="row" spacing={2} alignItems="center">

        <Stack direction="row" spacing={0.5} alignItems="center">
          <IconButton
            onClick={() => {
              setLiked(!liked);
              setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
              setactiveLike(true);
            }}
            color={liked || likeds ? "error" : "default"}
          >
            {liked || likeds ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body2">{likeCount}</Typography>
        </Stack>

        <Stack direction="row" spacing={0.5} alignItems="center">
          <ChatBubbleOutlineIcon fontSize="small" />
          <Typography variant="body2">{comments.length}</Typography>
        </Stack>
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar alt="Remy Sharp" src={image} />

        <TextField
          multiline
          fullWidth
          size="small"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <IconButton
          color="primary"
          // disabled={!comment.trim()}
          onClick={() => {
            // setComment("");
            sendReactionTrigger();
            setactive(true);
          }}
        >
          <SendIcon />
        </IconButton>
      </Stack>
      <Stack spacing={2} sx={{ mt: 3 }}>
        {comments.map((c, index) => (
          <Stack key={index} direction="row" spacing={2}>
           <Avatar alt={c.username} src={c.profilePicture} />

            <Box>
              <Typography variant="subtitle2">
                {c.username}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {c.text}
              </Typography>

              <Typography variant="caption" color="text.disabled">
                {new Date(c.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>

    </Container>
  );
};

export default PublishedUI;



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

type Format = "IMG" | "TEXT" | "VIDEO" | "EMBED" | "UNSPLASH";

export interface phost {
  type: Format;
  value?: string;
}

const PostUI = () => {
  const [params] = useSearchParams();
  const value = params.get("id");

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [lines, setLines] = useState<phost[]>([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [status, setStatus] = useState("");

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
    </Container>
  );
};

export default PostUI;

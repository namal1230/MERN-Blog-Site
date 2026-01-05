import { Box, AppBar, Stack, Toolbar, Typography, IconButton, Badge, Menu, MenuItem, Input, TextField, Avatar, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CodeIcon from "@mui/icons-material/Code";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import { useSelector } from 'react-redux';
import type { RootState } from '../utilities/store/store';
import { useState, useRef, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { fileTransfer } from '../api/fileTransfer.api';
import DeblurIcon from '@mui/icons-material/Deblur';
import { searchImages } from '../api/image.api';
import Editor from "@monaco-editor/react";
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useSearchParams } from 'react-router-dom';
import { editPhost, getDraftPhost } from '../api/draftPhosts.api';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
export const LANGUAGES = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Java", value: "java" },
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" }
];


type Format = "IMG" | "TEXT" | "VEDIO" | "EMBED" | "UNSPLASH";

export interface phost {
  type: Format,
  value?: string
}

const EditPhost: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const image = useSelector((state: RootState) => state.persistedReducer.profile);
  const name = useSelector((state: RootState) => state.persistedReducer.name);
  const email = useSelector((state: RootState) => state.persistedReducer.email);

  const [postUIState, setpostUIState] = useState(false)
  const [title, setTitle] = useState<string>("");
  const [codeState, setcodeState] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [imageState, setimageState] = useState(true);
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showTools, setShowTools] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [lines, setLines] = useState<Array<phost>>([{ type: "TEXT", value: "" }]);
  const [activeLine, setActiveLine] = useState<number | 'title'>(0.1);
  const LINE_HEIGHT = 60;

  const [params] = useSearchParams();
  const value = params.get("id");

  const sendPhostRequest = async () => {
    await editPhost(axiosPrivate, value || "", { name:name||"", email, body: lines, code, title });
  }

  useEffect(() => {
    if (!value) return;

    const getDrafts = async () => {
      const result = await getDraftPhost(axiosPrivate, value);
      setTitle(result.title);
      setLines(result.body);
      setCode(result.code || "");
    };

    getDrafts();
  }, [value])

  useEffect(() => {


    if (lines[lines.length - 1].type === "IMG" || lines[lines.length - 1].type === "VEDIO") {
      const last = lines[lines.length - 1];
      const prev = lines[lines.length - 2];
      if ((last.type === "IMG" || last.type === "VEDIO") && prev?.type !== "TEXT") {
        setLines(prevLines => [...prevLines, { type: "TEXT", value: "" }]);
      }
    }
  }, [lines])

  useEffect(() => {
    if (!selectedFile) return;

    const upload = async () => {
      try {
        const res = await fileTransfer(axiosPrivate, { file: selectedFile });
        attachImage(res.url);
      } catch (err) {
      }
    };
    upload();
  }, [selectedFile])

  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const lineRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const attachText = () => {
    const newLines = [...lines];
    newLines.push({ type: "TEXT", value: "" });
    setLines(newLines);
  }

  const attachImage = (url: string) => {
    setLines((prev) => {
      const index = activeLine === 'title' ? 0 : (activeLine as number) + 1;
      const newLines = [...prev];

      if (selectedFile?.type.startsWith("image")) {
        newLines.splice(index, 0, { type: "IMG", value: url });
      }
      if (selectedFile?.type.startsWith("video")) {
        newLines.splice(index, 0, { type: "VEDIO", value: url });
      }
      newLines.push({ type: "TEXT", value: "" })
      return newLines;
    });
  }

  const attachEmbed = () => {
    setLines((prev) => {
      const index = activeLine === 'title' ? 0 : (activeLine as number) + 1;
      const newLines = [...prev];
      newLines.splice(index, 0, { type: "EMBED", value: "" }); // insert image at cursor
      newLines.push({ type: "TEXT", value: "" })
      return newLines;
    });
  }

  const uploadUnsplash = () => {

    setLines((prev) => {
      const index = activeLine === 'title' ? 0 : (activeLine as number) + 1;
      const newLines = [...prev];
      newLines.splice(index, 0, { type: "UNSPLASH", value: "" });
      return newLines;
    });
  }

  const setEmbedImage = (img: string) => {
    setLines((prev) => {
      const index = activeLine === 'title' ? 0 : (activeLine as number) + 1;
      const newLines = [...prev];

      newLines.splice(index, 0, { type: "UNSPLASH", value: img }); // insert image at cursor
      setimageState(false);

      newLines.push({ type: "TEXT", value: "" })

      const lastIndex = newLines.length - 1;
      const beforeLastIndex = lastIndex - 1;

      if (
        newLines[lastIndex]?.type === "TEXT" &&
        newLines[beforeLastIndex]?.type === "UNSPLASH"
      ) {
        newLines.splice(beforeLastIndex, 1);
      }


      return newLines;
    });

  }

  const handleSearch = async (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {

      const data = await searchImages(axiosPrivate, query);
      setImages(data);
      setimageState(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, index: number) => {
    if (e.key === 'Backspace') {
      const currentLine = lines[index];
      if (currentLine.value === "" && index > 0) {
        const newline = [...lines];
        newline.splice(index - 1, 1);
        setLines(newline)
        setTimeout(() => lineRefs.current[index + 1]?.focus(), 0);
      }
    }

    if (e.key === 'Enter') {
      attachText();
      e.preventDefault();
      setActiveLine(index);
      setTimeout(() => lineRefs.current[index + 1]?.focus(), 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index === 0) {
        setActiveLine('title');
        titleRef.current?.focus();
      } else {
        setActiveLine(index - 1);
        lineRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (index < lines.length - 1) {
        setActiveLine(index + 1);
        lineRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDownEmbed = (e: React.KeyboardEvent<HTMLElement>, index: number) => {
    if (e.key === 'Enter') {
      const newLines = [...lines];
      newLines.push({ type: "TEXT", value: "" });
      setLines(newLines);
      e.preventDefault();
      setActiveLine(index);
      setTimeout(() => lineRefs.current[index + 1]?.focus(), 0);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ color: "black", backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar disableGutters sx={{ minHeight: 48, px: 2 }}>
          <Typography variant="h6" noWrap component="div" sx={{ pr: 2, fontSize: "19px", fontWeight: "bold" }}>
            Smart Blog Phost
          </Typography>
          Draft in {name}
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={() => setpostUIState(true)} variant="contained" sx={{ borderRadius: "20px", height: "30px", width: "70px", fontSize: "12px" }} color="success">
            Publish
          </Button>
          <IconButton onClick={() => setcodeState(!codeState)} sx={{ pt: 2.3, color: "black" }} size="large" aria-label="write">
            <Badge>
              <Tooltip title="Add code Block">
                <DataObjectIcon />
              </Tooltip>
            </Badge>
          </IconButton>
          <IconButton size="large" aria-label="notifications" color="inherit">
            <Badge badgeContent={19} color="default">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
          <IconButton size="large" edge="end" aria-label="account of current user" onClick={handleProfileMenuOpen} color="inherit">
            <Avatar alt="Remy Sharp" src={image} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ position: "relative", width: "80%", ml: 10, mt: 5 }}>
        <IconButton
          onClick={() => setShowTools(!showTools)}
          sx={{
            position: "absolute",
            top: activeLine === 'title' ? -1 : activeLine * LINE_HEIGHT + 100,
            left: -40,
            transition: "top 0.2s",
          }}
        >
          <AddCircleIcon color="disabled" />
        </IconButton>

        {showTools && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: "absolute",
              top: activeLine === 'title' ? -50 : activeLine * LINE_HEIGHT,
              left: -5,
              bgcolor: "background.paper",
              p: 0.5,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Tooltip title="Search here">
              <IconButton onClick={() => fileInputRef.current?.click()} color='success' size="small" sx={{ zIndex: 10 }}><CropOriginalIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Add an embed">
              <IconButton onClick={() => attachEmbed()} color='success' size="small" sx={{ zIndex: 10 }}><CodeIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Add an image from Unsplash">
              <IconButton onClick={() => uploadUnsplash()} color='success' size="small" sx={{ zIndex: 10 }}><DeblurIcon /></IconButton>
            </Tooltip>
          </Stack>
        )}

        <input type="file" onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setSelectedFile(file);
        }
        } ref={fileInputRef} accept='image/*,vedio/*' hidden />

        <Input
          value={title}
          fullWidth
          placeholder="Title"
          disableUnderline
          inputRef={titleRef}
          sx={{ fontSize: "2.2rem", fontWeight: "bold", mb: 3 }}
          onFocus={() => setActiveLine('title')}
          onChange={(e) => setTitle(e.target.value)}
        />

        {lines.map((line, index) => (
          line.type === "IMG" ?
            <img key={index} src={line.value} alt="file" /> :
            line.type == "VEDIO" ?
              <video key={index} width="640" height="360" muted controls>
                <source src={line.value} />
                Not Supported
              </video>
              : line.type == 'EMBED' && line.value == '' ?
                <TextField
                  key={index}
                  fullWidth
                  variant="standard"
                  multiline
                  rows={1}
                  value={line.value || ""}
                  placeholder="paste a link to embed content from another site and press Enter"
                  inputRef={(el) => (lineRefs.current[index] = el)}
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    backgroundColor: "#eeeeeeff",
                    letterSpacing: "2px",
                    p: 1,
                    fontSize: "200%",
                    width: "80%",
                    ml: 0,
                    mt: 2,
                  }}
                  onFocus={() => setActiveLine(index)}
                  onChange={(e) => {
                    const newLines = [...lines];
                    newLines[index] = { ...newLines[index], value: e.target.value };
                    setLines(newLines);
                  }}
                  onKeyDown={(e) => handleKeyDownEmbed(e, index)}
                /> :
                line.type == 'EMBED' && line.value ?
                  <Box key={index} sx={{ mt: 2 }}>
                    <a href={line.value} target="_blank" rel="noopener noreferrer">
                      {line.value}
                    </a>
                  </Box>
                  : line.type == "UNSPLASH" && line.value == "" ?
                    <TextField
                      key={index}
                      fullWidth
                      variant="standard"
                      multiline
                      rows={1}
                      placeholder="Type keyword to search Unsplash and press Enter"
                      sx={{
                        backgroundColor: "#eeeeeeff",
                        letterSpacing: "2px",
                        p: 1,
                        fontSize: "200%",
                        width: "80%",
                        ml: 0,
                        mt: 2,
                      }}
                      onChange={(e) => {
                        setQuery(e.target.value)
                      }}
                      onKeyDown={(e) => handleSearch(e)}
                    />
                    : line.type == "UNSPLASH" ?
                      <img key={index} src={line.value} alt="file" />
                      : <TextField
                        key={index}
                        fullWidth
                        variant="standard"
                        multiline
                        rows={1}
                        value={line.value || ""}
                        placeholder={index === 0 ? "Tell your story..." : ""}
                        inputRef={(el) => (lineRefs.current[index] = el)}
                        InputProps={{ disableUnderline: true }}
                        sx={{
                          letterSpacing: "2px",
                          p: 1,
                          fontSize: "200%",
                          width: "80%",
                          ml: 0,
                          mt: 2,
                        }}
                        onFocus={() => setActiveLine(index)}
                        onChange={(e) => {
                          const newLines = [...lines];
                          newLines[index] = { ...newLines[index], value: e.target.value };
                          setLines(newLines);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                      />
        ))}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {imageState && images.map((img, index) => (
            <Box
              onClick={() => setEmbedImage(img.urls.small)}
              key={index}
              sx={{
                width: "20vw",
                position: "relative",
                overflow: "hidden",
                borderRadius: 2,
                cursor: "pointer",
                "&:hover img": {
                  transform: "scale(1.05)",
                  filter: "brightness(60%)",
                },
                "&:hover .overlay": {
                  opacity: 1,
                },
              }}
            >
              <img
                src={img.urls.small}
                alt={img.alt_description}
                style={{
                  width: "200px",
                  transition: "all 0.3s ease",
                }}
              />

              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                  background: "rgba(0,0,0,0.3)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
              >
              </Box>
            </Box>
          ))}
        </div>
      </Box>

      {codeState && <div style={{ width: "100%" }}>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ marginBottom: "10px" }}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>


        <Editor
          height="400px"
          theme="vs-dark"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true
          }}
        />
      </div>}

      {postUIState && <div style={{ zIndex: "10", color: "black", backgroundColor: "white", width: "50%", height: "50%", position: "absolute", top: "0", bottom: "0", left: "0", right: "0", margin: "auto", alignItems: "center" }}>

        <h2> Confirm Publish Post</h2>
        <p>Are you sure you want to publish this post?</p>
        <ul>
          <li>1. Your post will first go to the Draft box. You can update or delete it there.</li>
          <li>2. After admin approval, your post will be published and visible to everyone.</li>
          <li>3. Posts with illegal or prohibited content will be automatically canceled.</li>
          <li>4. Once published to everyone, your post cannot be changed or deleted.</li>
        </ul>
        <div>
          <Button onClick={() => setpostUIState(false)} variant="outlined" color="secondary">Cancel</Button> <Button onClick={() => sendPhostRequest()} variant="outlined" color="info">Publish</Button>
        </div>
      </div>}
      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    </Box>
  );
}

export default EditPhost;
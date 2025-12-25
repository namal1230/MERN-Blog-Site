import * as React from 'react';
import { Box, AppBar, Stack, Toolbar, Typography, IconButton, Badge, Menu, MenuItem, Input, TextField, Avatar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CodeIcon from "@mui/icons-material/Code";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import { useSelector } from 'react-redux';
import type { RootState } from '../utilities/store/store';
import { useState, useRef } from 'react';
import {Tooltip} from '@mui/material';
export default function NewStory() {
  const image = useSelector((state: RootState) => state.profile);
  const name = useSelector((state: RootState) => state.name);

  const [showTools, setShowTools] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [lines, setLines] = useState<string[]>([""]);
  const [activeLine, setActiveLine] = useState<number | 'title'>(0.1);
  const LINE_HEIGHT = 60;

  const [text,setText]= useState<string>("");
  React.useEffect(()=>{
    if(lines[lines.length-1]==="img"){
        
  const last = lines[lines.length - 1];
  const prev = lines[lines.length - 2];
  if (last === "img" && prev !== "") {
    setLines((prevLines) => [...prevLines, ""]);
  }
    }
  },[lines])

  const titleRef = useRef<HTMLInputElement>(null);
  const lineRefs = useRef<(HTMLInputElement | null)[]>([]);

  // AppBar menu
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const attachText=()=>{
    console.log("text catched");
    console.log(text);
    
    const newLines = [...lines];
    
      newLines.push(text);
      console.log("New line",newLines);
      setLines(newLines);
      console.log("lines new ",lines);
      
  }

  const attachImage=()=>{
    // console.log("added image");
     setLines((prev) => {
    const index = activeLine === 'title' ? 0 : (activeLine as number) + 1;
    const newLines = [...prev];
    newLines.splice(index, 0, 'img'); // insert image at cursor
    return newLines;
  });
    // console.log(lines)
  }


  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => {
    // attachText();
    if (e.key === 'Enter') {
        attachText();
        e.preventDefault();
    //   const newLines = [...lines];
    //   newLines.push(index);
    //   setLines(newLines);
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* ===== APP BAR ===== */}
      <AppBar position="static" elevation={0} sx={{ color: "black", backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar disableGutters sx={{ minHeight: 48, px: 2 }}>
          <Typography variant="h6" noWrap component="div" sx={{ pr: 2, fontSize: "19px", fontWeight: "bold" }}>
            Smart Blog Phost
          </Typography>
          Draft in {name}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ pt: 2.3, color: "black" }} size="large" aria-label="write">
            <Badge>
              <EditNoteIcon /> <Typography sx={{ pl: 1, pr: 2 }}>Write</Typography>
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

      {/* ===== LINE EDITOR ===== */}
      <Box sx={{ position: "relative", width: "80%", ml: 10, mt: 5 }}>
        {/* + ICON */}
        <IconButton
          onClick={() => setShowTools(!showTools)}
          sx={{
            position: "absolute",
            top: activeLine === 'title' ? -1 : activeLine * LINE_HEIGHT+100,
            left: -40,
            transition: "top 0.2s",
          }}
        >
          <AddCircleIcon color="disabled" />
        </IconButton>

        {/* TOOLBAR */}
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
                <IconButton onClick={()=>attachImage()} color='success' size="small" sx={{zIndex:10}}><CropOriginalIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Search here">
                 <IconButton color='success' size="small" sx={{zIndex:10}}><CodeIcon /></IconButton>
            </Tooltip>
          </Stack>
        )}

        {/* TITLE */}
        <Input
          fullWidth
          placeholder="Title"
          disableUnderline
          inputRef={titleRef}
          sx={{ fontSize: "2.2rem", fontWeight: "bold", mb: 3 }}
          onFocus={() => setActiveLine('title')}
        />

        {/* STORY LINES */}
        {lines.map((line, index) => (
          line==="img"? <TextField
            key={index}
            fullWidth
            variant="standard"
            multiline
            rows={1}
            // value={line}
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
              backgroundColor:"red"
            }}
            onFocus={() => setActiveLine(index)}
            onChange={(e) => {
                 setText(e.target.value)
    //   setActiveLine(index);
            //   const newLines = [...lines];
            //   newLines[index] = e.target.value;
            //   setLines(newLines);
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />:
          <TextField
            key={index}
            fullWidth
            variant="standard"
            multiline
            rows={1}
            // value={line}
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
                 setText(e.target.value)
    //   setActiveLine(index);
            //   const newLines = [...lines];
            //   newLines[index] = e.target.value;
            //   setLines(newLines);
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </Box>

      {/* MENU */}
      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    </Box>
  );
}

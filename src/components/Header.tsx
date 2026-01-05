import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
  Avatar,
  styled,
  InputBase,
  TextField,
  alpha,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import EditNoteIcon from "@mui/icons-material/EditNote";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../utilities/store/store";
import { searchPhosts, getNotifications, setNotificationStatus } from "../api/sendPhosts.api";
import PublishedPosts from "../pages/PublishedPosts";
import { Title } from "chart.js";
import { logout } from "../firebase/auth";
import { removeAuth } from "../utilities/slices/loginSlice";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export interface reaction {
  comment: string;
  createdAt: string;
  liked: boolean;
  profilePicture: string;
  username: string;
}

export interface notifications {
  phostId: string;
  reactions: reaction[];
  title: string;
  totalComments: number;
  totalLikes: number;
  totalReactions: number;
}

export interface draft {
  _id: string;
  title: string;
  createdAt: string;
  image?: string | null;
  username: string;
  likeCount: number;
  commentCount: number;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const drawer = (
  <Box sx={{ p: 2 }}>
    <Typography variant="h6">Smart Blog</Typography>
    <Divider sx={{ my: 2 }} />
    <List>
      <Box>
        <Link to={"/home-page"}>Home Page</Link>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Link to={"/new-story"}>Write Phosts</Link>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Link to={"/stories"}>My Library</Link>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Link to={"/follow-phosts"}>Followers Story</Link>
      </Box>
    </List>
  </Box>
);

const drawerWidth = 240;

export const Header = ({ action }: { action: any }) => {
  const axiosPrivate = useAxiosPrivate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [search, setSearch] = useState<string>("");
  const [draftData, setdraftData] = useState<draft[]>([]);
  const [currentdata, setcurrentdata] = useState<boolean>(false);
  const [totalreacts, settotalreacts] = useState<number>(0);
  const [topReactions, setTopReactions] = useState<notifications[]>([]);
  const [showTopUp, setShowTopUp] = useState(false);
  const [anchorEls, setAnchorEls] = useState<null | HTMLElement>(null);

  const email = useSelector((state: RootState) => state.persistedReducer.email);
  const image = useSelector((state: RootState) => state.persistedReducer.profile);
  const name: string = useSelector((state: RootState) => state.persistedReducer.name) || "";

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setAnchorEls(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const setNotificationUpdate = async () => {
    if (showTopUp == false) {

      await setNotificationStatus(axiosPrivate, name);
    }

  }

  const handleMobileMenuOpenSmall = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEls(event.currentTarget);
  };

  const handleSearch = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      navigate("/home-page");
      if (search == "") {

        action(true);
        setcurrentdata(false);
      } else {
        setcurrentdata(true);
        try {

          action(false);
          const result = await searchPhosts(axiosPrivate, email, search);
          setdraftData(result);

        } catch (err) {

        }
      }
    }
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setAnchorEl(null);
      dispatch(removeAuth());
      navigate("/");
    } catch (error) {

    }
  };

  useEffect(() => {
    const notification = async () => {
      try {
        const response = await getNotifications(axiosPrivate, name);


        if (Array.isArray(response.data) && response.data.length > 0) {
          const total = response.data.reduce(
            (acc: number, post: notifications) => acc + post.totalReactions,
            0
          );
          settotalreacts(total);

          if (total > 0) {
            setTopReactions(response.data);
          }
        } else {
          settotalreacts(0);
          setTopReactions([]);
        }
      } catch (err) {
        settotalreacts(0);
        setTopReactions([]);
      }
    };

    notification();
  }, [name]);


  return (
    <AppBar
      position="static"
      sx={{
        color: "black",
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
      elevation={0}
    >
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: 'block',
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 48,
          px: 2,
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => setMobileOpen((prev) => !prev)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Smart Blog Phost
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onKeyDown={(e) => handleSearch(e)}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Search>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Link to={"/new-story"}>
            <IconButton
              sx={{ pt: 2.3, color: "black" }}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge>
                <EditNoteIcon />{" "}
                <Typography sx={{ pl: 1, pr: 2 }}>Write</Typography>
              </Badge>
            </IconButton>
          </Link>
          <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
            onClick={() => {
              setShowTopUp((prev) => !prev);
              setNotificationUpdate();
            }}
          >
            <Badge badgeContent={totalreacts} color="default">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar alt="Remy Sharp" src={image} />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpenSmall}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {currentdata &&
        draftData.map((draft) => (
          <PublishedPosts
            key={draft._id}
            draftId={draft._id}
            title={draft.title}
            createdAt={draft.createdAt}
            image={draft.image}
            name={draft.username}
            status={""}
            like={draft.likeCount}
            comment={draft.commentCount}
          />
        ))}

      <Box sx={{ position: "relative" }}>
        {showTopUp && (
          <Box
            id="topup-box"
            sx={{
              position: "absolute",
              top: "48px",
              right: 0,
              width: 300,
              maxHeight: 400,
              overflowY: "auto",
              bgcolor: "background.paper",
              boxShadow: 3,
              borderRadius: 2,
              p: 1,
              zIndex: 10,
            }}
          >
            {topReactions.length > 0 ? (
              topReactions.map((post, idx) => (
                <Box key={idx} sx={{ mb: 1 }}>
                  {post.reactions.map((r, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1,
                        borderBottom:
                          i < post.reactions.length - 1
                            ? "1px solid #ccc"
                            : "none",
                      }}
                    >
                      <Avatar
                        src={r.profilePicture}
                        alt={r.username}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Box>
                        <Typography variant="body2">{r.username}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(r.createdAt).toLocaleDateString()} |{" "}
                          {post.title} | {r.comment || (r.liked ? "Liked" : "")}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ))
            ) : (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  No notifications yet
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        open={Boolean(anchorEls)}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={handleMobileMenuClose}>
          <Avatar sx={{ width: 24, height: 24, ml: 2 }} src={image} />
        </MenuItem>
        <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>
          <Typography variant="body2">Sign Out</Typography>
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </AppBar>
  );
};

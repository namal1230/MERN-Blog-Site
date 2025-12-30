import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../utilities/store/store';
import NewStory from './NewStory';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DraftBox from './DraftBox';
import { draftPhosts } from "../api/draftPhosts.api";

export interface draft {
    _id: string;
    title: string;
    createdAt: string;
    image?: string | null;
}


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const drawerWidth = 240;

const DraftPage = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const image = useSelector((state: RootState) => state.profile);

    const name = useSelector((state: RootState) => state.name);
    const email = useSelector((state: RootState) => state.email);
    const [draftData, setdraftData] = useState<draft[]>([]);

    // const [param,setParam] = useSearchParams();
    const [params] = useSearchParams();
    const value = params.get("value");

    useEffect(() => {
        console.log("log is worked", name, email);

        const getDrafts = async () => {
            if(!value || !name) return
            const result = await draftPhosts({ name, email, value })
            console.log(result);
            setdraftData(result);
        }
        getDrafts();
    }, [value]);

    useEffect(() => {

        console.log(image)

    }, [image])

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const drawer = (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6">Smart Blog</Typography>
            <Divider sx={{ my: 2 }} />
            <List>
                {['Home', 'Posts', 'Profile', 'Settings'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge>
                        <EditNoteIcon />
                    </Badge>
                </IconButton>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="primary">
                        <NotificationsNoneIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"
                sx={{
                    // width: { sm: `calc(100% - ${drawerWidth}px)` },
                    // ml: { sm: `${drawerWidth}px` },
                    color: "black",
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                }} elevation={0}>
                <Toolbar disableGutters sx={{
                    minHeight: 48, // or 'auto'
                    px: 2,
                }}>
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
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Smart Blog Phost
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Link to={"/new-story"}>
                            <IconButton sx={{ pt: 2.3, color: "black" }} size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge>
                                    <EditNoteIcon /> <Typography sx={{ pl: 1, pr: 2 }}>Write</Typography>
                                </Badge>
                            </IconButton>
                        </Link>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={19} color="default">
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
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                {/* Mobile */}
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

                {/* Desktop */}
                {/* <Drawer
                    variant="temporary"
                    open
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer> */}
            </nav>
            <Typography sx={{ mt: 7, ml: 5 }} variant="h4" gutterBottom>
                Stories
            </Typography>
            <div>

            </div>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "80%", ml: 8, mt: 5 }}>
                <NavLink style={{ textDecoration: "none" }} to="/stories?value=pending">
                    Draft
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/stories?value=published">
                    Published
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/stories?value=unlisted">
                    Unlisted
                </NavLink>
            </Box>
            <hr />
            {draftData.map((draft) => (
                <DraftBox
                    key={draft._id}          // React identity
                    draftId={draft._id}      // Coding identity
                    title={draft.title}
                    createdAt={draft.createdAt}
                    image={draft.image}
                    status={value||""}
                />
            ))}
        </Box>
    );
}

export default DraftPage;
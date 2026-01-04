import { AppBar, Toolbar, IconButton, Typography, Box, Badge, Avatar, Drawer, Divider, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import type { RootState } from '../utilities/store/store';
import { useDispatch, useSelector } from 'react-redux';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom"
import { logout } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { removeAuth } from '../utilities/slices/loginSlice';

const AdminHeader = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorEls, setAnchorEls] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const image = useSelector((state: RootState) => state.persistedReducer.profile);

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const drawerWidth = 240;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleMobileMenuOpenSmall = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEls(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setAnchorEls(null);
    };

    const handleSignOut = async () => {
        try {
            await logout();
            setAnchorEls(null);
            dispatch(removeAuth());
            navigate("/");
        } catch (error) {
            console.error("Failed to sign out:", error);
        }
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const drawer = (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6">Smart Blog</Typography>
            <Divider sx={{ my: 2 }} />
            <Box>
                <Link to={"/admin"}>Home Page</Link>
            </Box>
            <Box sx={{ pt: 2 }}>
                <Link to={"/admin-email?value=login-issue"}>Email Requests</Link>
            </Box>
        </Box>
    );

    return (
        <AppBar position="static"
            sx={{
                color: "black",
                backgroundColor: 'transparent',
                boxShadow: 'none',
            }} elevation={0}>
            <Toolbar disableGutters sx={{ minHeight: 48, px: 2, }}>
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
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>

        </AppBar>
    )
}

export default AdminHeader;



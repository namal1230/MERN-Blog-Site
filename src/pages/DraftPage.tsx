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
import { Header } from '../components/Header';

export interface draft {
    _id: string;
    title: string;
    createdAt: string;
    image?: string | null;
}

const DraftPage: React.FC = () => {
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
            <Header action={undefined}/>
            
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
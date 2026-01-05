import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import type { RootState } from '../utilities/store/store';
import { SignOut } from './SignOut';
import { getPublishedPhosts } from '../api/sendPhosts.api';
import PublishedPosts from './PublishedPosts';
import { Header } from '../components/Header';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export interface draft {
    _id: string;
    title: string;
    createdAt: string;
    image?: string | null;
    username: string;
    likeCount: number;
    commentCount: number;
}

const HomePage: React.FC = () => {
    const axiosPrivate = useAxiosPrivate();
    const [draftData, setdraftData] = useState<draft[]>([]);
    const [lastId, setlastIds] = useState<string | null>(null);
    const [loading, setloading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [dataStatus, setdataStatus] = useState(true);

    const email = useSelector((state: RootState) => state.persistedReducer.email);
    const fetchingRef = useRef(false);

    const fetchPosts = async () => {
        if (loading || !hasMore || fetchingRef.current) return;

        fetchingRef.current = true;
        setloading(true);

        try {
            const res = await getPublishedPhosts(axiosPrivate, lastId, email);
            setdraftData(prev => {
                const existingIds = new Set(prev.map(p => p._id));
                const newData = res.data.filter((p: draft) => !existingIds.has(p._id));
                return [...prev, ...newData];
            });
            setlastIds(res.nextCursor);
            setHasMore(Boolean(res.nextCursor));

            
        } catch (err) {
            
        } finally {
            fetchingRef.current = false;
            setloading(false);
        }
    };

    useEffect(() => {
        if (
            !loading &&
            hasMore &&
            document.body.offsetHeight < window.innerHeight
        ) {
            fetchPosts();
        }
    }, [draftData]);


    useEffect(() => {
        const handleScroll = () => {
            if (
                window.scrollY > 0 &&
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200
            ) {
                fetchPosts();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

    const changeDataState = (value: boolean) => {
        setdataStatus(value);
    }

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
            <MenuItem onClick={handleMenuClose}><SignOut /></MenuItem>
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
            <Header action={changeDataState} />
            {dataStatus && draftData.map((draft) => (
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
            {renderMobileMenu}
            {renderMenu}


        </Box>
    );
}

export default HomePage;
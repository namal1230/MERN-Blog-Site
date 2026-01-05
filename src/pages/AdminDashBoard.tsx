import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useEffect } from 'react';
import { SignOut } from './SignOut';
import {
    Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getDashBoardStats } from '../api/admin.api';
import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashBoard: React.FC = () => {
    const axiosPrivate = useAxiosPrivate();
    const [validUser, setvalidUsers] = useState();
    const [rejectUser, setrejectUsers] = useState();
    const [reportedUser, setreportedUser] = useState();
    const [publishedPhosts, setpublishedPhosts] = useState();
    const [unlistedPhosts, setunlistedPhosts] = useState();
    const [pendingPhosts, setpendingPhosts] = useState();

    const data = {
        labels: ['Users', 'Phosts'],
        datasets: [
            {
                id: 1,
                label: 'Valid Users',
                data: [validUser, 0],
                backgroundColor: 'rgba(102, 187, 106, 0.7)',
            },
            {
                id: 2,
                label: 'Rejected Users',
                data: [rejectUser, 0],
                backgroundColor: 'rgba(239, 154, 154, 0.7)',
            },
            {
                id: 2,
                label: 'Reported Users',
                data: [reportedUser, 0],
                backgroundColor: 'rgba(239, 198, 154, 0.7)',
            },
            {
                id: 3,
                label: 'Published Phosts',
                data: [0, publishedPhosts],
                backgroundColor: 'rgba(100, 181, 246, 0.7)',
            },
            {
                id: 4,
                label: 'Unlisted Phosts',
                data: [0, unlistedPhosts],
                backgroundColor: 'rgba(255, 224, 130, 0.7)',
            },
            {
                id: 5,
                label: 'Pending Phosts',
                data: [0, pendingPhosts],
                backgroundColor: 'rgba(186, 104, 200, 0.7)',
            },
        ],
    };

    useEffect(() => {
        const getDrafts = async () => {
            const result = await getDashBoardStats(axiosPrivate);

            setpublishedPhosts(result.phosts.published);
            setunlistedPhosts(result.phosts.unlisted);
            setpendingPhosts(result.phosts.pending);
            setvalidUsers(result.users.valid);
            setrejectUsers(result.users.rejected);
            setreportedUser(result.users.reported);
        };

        getDrafts();

    }, [axiosPrivate])

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

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
            <AdminHeader />
            {renderMobileMenu}
            {renderMenu}
            <Bar data={data} />;
        </Box>
    );
}

export default AdminDashBoard;
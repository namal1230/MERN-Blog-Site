import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import {
    registerWithEmail,
    loginWithEmail
} from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import { authFire } from '../firebase/firebaseConfig';
import DashTopup from '../components/DashTopup';


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];


const Title = styled('div')({
    fontSize: 'clamp(24px, 4vw, 48px)',
    fontWeight: 'bold',
    textAlign: 'center',
});

const Subtitle = styled('div')({
    fontSize: '16px',
    marginTop: '16px',
    textAlign: 'center',
    color: '#555',
});


const DashBoard: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authFire, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    const drawer = (
        <Box sx={{ textAlign: 'center', backgroundColor: 'white' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Smart Blog
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: 'center' }}
                            onClick={handleDrawerToggle}
                        >
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <>
            <CssBaseline />

            <Box sx={{ flexGrow: 1, position: 'relative' }}>

                <AppBar
                    component="nav"
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        boxShadow: 'none',
                    }}
                >
                    <Toolbar>
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Smart Blog Phost
                        </Typography>

                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                <Button key={item} sx={{ color: '#000' }}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                        <Popper
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            placement="bottom"
                        >
                            <Paper sx={{ borderRadius: 2, boxShadow: 3, width: "60vw", height: 360 }}>
                                <DashTopup close={() => setAnchorEl(null)} />
                            </Paper>
                        </Popper>
                    </Toolbar>
                </AppBar>

                <nav>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>

                <Box
                    component="main"
                    sx={{
                        p: 3,
                        minHeight: '100vh',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Toolbar />

                    <Title>Developers Blog Stories & Code Ideas</Title>
                    <Subtitle>
                        A place to read, find and solve real problems
                    </Subtitle>

                    <Button
                        onClick={handleClick}
                        variant="contained"
                        sx={{
                            mt: 4,
                            backgroundColor: '#000',
                            borderRadius: '30px',
                            px: 4,
                            py: 1.2,
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#222',
                            },
                        }}
                    >
                        Start Reading
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default DashBoard;

import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, styled, TextField, Toolbar, Typography } from '@mui/material';
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { email } from '../api/email.api';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
const navItems = ['Back to Home'];
const drawerWidth = 240;

const Title = styled('div')({
    fontSize: 'clamp(24px, 4vw, 48px)',
    fontWeight: 'bold',

});

const Subtitle = styled('div')({
    fontSize: '16px',
    marginTop: '16px',
    textAlign: 'center',
    color: '#555',
});

const ForgotCredentials: React.FC = () => {
    const axiosPrivate = useAxiosPrivate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [emailAddress, setEmailAddress] = useState<string>();
    const [descriptions, setDescription] = useState<string>();

    const sendEmail = () => {
        if (!emailAddress || !descriptions) {

            return;
        }

        const response = email(axiosPrivate, { email: emailAddress, description: descriptions });
        if (!response) return
        alert("Request Send Successfully");
        navigate(-1)
    }

    const navigate = useNavigate();

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
                            <Button onClick={() => navigate(-1)} sx={{ color: '#000' }}>
                                Back to Home
                            </Button>
                        </Box>
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
                        mt: 20,
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Toolbar />

                    <Title>How can we help you?</Title>

                    <InputLabel sx={{ pt: 2 }} htmlFor="email">Your email address</InputLabel>
                    <Input
                        onChange={(e) => setEmailAddress(e.target.value)}
                        sx={{ width: 400 }}
                        id="email"
                        aria-describedby="component-helper-text"
                    />
                    <InputLabel sx={{ pt: 5 }} htmlFor="description">Description</InputLabel>
                    <TextField
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ width: 400 }}
                        id="description"
                        multiline
                        rows={4}
                        variant="standard"
                    />
                    <Button onClick={() => sendEmail()} sx={{ mt: 2, width: 400 }} variant="contained" color="success">
                        Submit
                    </Button>
                </Box>
            </Box>

        </>
    )
}

export default ForgotCredentials;
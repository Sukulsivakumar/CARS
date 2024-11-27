import React, { useState } from 'react';
import {
    AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText , CssBaseline, Box,
} from '@mui/material';
import {
    Dashboard as DashboardIcon, Analytics as AnalyticsIcon, Group as GroupIcon,
    MenuOpenOutlined
} from '@mui/icons-material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import srm from '../assets/Images/reco.png';  // Logo for expanded view
import seal from '../assets/Images/reco.png'; // Logo for collapsed view
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { logoutUser } from '../services/Auth.services';


const drawerWidth = 180;

const AdminLayout = () => {
    const [open, setOpen] = useState(false);
    // const [openSubmenu, setOpenSubmenu] = useState(null); // State to track which submenu is open
    const location = useLocation(); // Get the current location to determine the selected menu item

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate('/');
    };

    // Function to toggle the collapsed state
    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Function to toggle submenu (profile or home)
    // const toggleSubmenu = (menu) => {
    //     // If the clicked menu is already open, close it. Otherwise, open the clicked menu and close others.
    //     setOpenSubmenu(openSubmenu === menu ? null : menu);
    // };

    // Function to determine if the menu item is selected
    const isSelected = (path) => location.pathname === path;

    const listItemSx = {
        borderRadius: '8px', // Rounded corners
        boxShadow: "2px",
        padding: '10px 16px', // Increased padding
        color: '#616161', // Default font color
        marginBottom: '2px', // Add space between menu items
        '&:hover': {
            backgroundColor: '#edeef0', // Hover background color
            color: '#616161', // Hover font color
        },
        '& .MuiTypography-root': {
            fontWeight: '600', // Bold text
            fontSize: '1rem', // Slightly smaller font size for a sleek look
        },
    };

    const selectedItemSx = {
        backgroundColor: '#1976D2', // Highlighted background
        color: '#FFFFFF', // Highlighted text color
        '&:hover': {
            backgroundColor: '#7DC4FF', // Slightly darker hover for selected items
        },
    };

    const listItemIconSx = {
        minWidth: '35px', // Reduced icon spacing
        color: 'inherit', // Icon color to match the font
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />

            {/* Navbar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: '',
                    width: open ? `calc(100% - ${drawerWidth}px)` : 'calc(100% - 64px)', // Adjust based on drawer state
                    transition: 'width 0.3s ease', // Smooth transition for responsiveness
                }}
            >
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
                        <MenuOpenOutlined />
                    </IconButton>
                    <Button onClick={handleLogout} variant="contained" color='error'>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
 
            {/* Sidebar */}
            <Drawer
                sx={{
                    width: open ? drawerWidth : '64px',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? drawerWidth : '64px',
                        boxSizing: 'border-box',
                        position: 'fixed', // Fix the drawer to the side
                        height: '100vh', // Make it take the full height of the viewport
                    },
                }}
                variant="permanent"
                open={open}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: open ? '10px 8px' : '8px' }}>
                    <img
                        src={open ? srm : seal}
                        alt="Logo"
                        style={{ maxHeight: open ? '80px' : '40px', width: 'auto' }}
                    />
                </Box>

                {/* Menu Items */}
                <List>
                    {/*Dashboard */}
                    <ListItem
                        button
                        component={Link}
                        to="/admin/dashboard"
                        sx={{
                            ...listItemSx,
                            ...(isSelected('/admin/dashboard') && selectedItemSx),
                        }}
                    >
                        <ListItemIcon sx={listItemIconSx}>
                            <DashboardIcon />
                        </ListItemIcon>
                        {open && <ListItemText primary="Dashboard" />}
                    </ListItem>

                    {/* Report */}
                    <ListItem
                        button
                        component={Link}
                        to="/admin/report"
                        sx={{
                            ...listItemSx,
                            ...(isSelected('/admin/report') && selectedItemSx),
                        }}
                    >
                        <ListItemIcon sx={listItemIconSx}>
                            <AnalyticsIcon />
                        </ListItemIcon>
                        {open && <ListItemText primary="Report" />}
                    </ListItem>

                    {/* Users */}
                    <ListItem
                        button
                        component={Link}
                        to="/admin/users"
                        sx={{
                            ...listItemSx,
                            ...(isSelected('/admin/users') && selectedItemSx),
                        }}
                    >
                        <ListItemIcon sx={listItemIconSx}>
                            <GroupIcon />
                        </ListItemIcon>
                        {open && <ListItemText primary="Users" />}
                    </ListItem>
                </List>
            </Drawer>

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar />

                {/* Gray gap between Navbar and Sidebar */}
                <Box
                    sx={{
                        backgroundColor: '#f5f5f5', // Very light gray background
                        padding: '10px', // Some padding to create the gap
                        height: 'calc(100vh - 64px)', // Full height minus the navbar
                        boxSizing: 'border-box',
                    }}
                >
                    {/* White content area */}
                    <Box
                        sx={{
                            backgroundColor: '#fff', // Pure white background
                            borderRadius: '8px', // Rounded corners for the content area
                            padding: '20px',
                            height: '100%', // Full height for the content box
                            boxSizing: 'border-box',
                        }}
                    >
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminLayout;

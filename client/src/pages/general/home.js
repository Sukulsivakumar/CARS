import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const   HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <Button component={Link} to="/login" variant="contained" color="primary">
                Login
            </Button>
            <Button component={Link} to="/register" variant="contained" color="secondary">
                Register
            </Button>
        </div>
    );
};

export default HomePage;

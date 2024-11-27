import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import UsersList from './components/UserList'
import BulkRegister from './components/CreateUser'; // Import BulkUpload

const Users = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Map the selected tab to its corresponding component
    const tabComponents = {
        0: <UsersList />,
        1: <BulkRegister />
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Users" />
                <Tab label="Create User" />
            </Tabs>
            {tabComponents[tabValue]}
        </Box>
    );
};

export default Users;

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    IconButton,
    Tooltip,
    // useMediaQuery,
    Grid,
    Box,
} from '@mui/material';
import { Edit, Delete, Visibility, Person } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const UsersList = () => {
    const [data, setData] = useState([
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', userId: 'U001' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', userId: 'U002' },
    ]);

    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleEditClick = (user) => {
        setCurrentUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setData((prevData) =>
            prevData.map((user) =>
                user.id === currentUser.id ? currentUser : user
            )
        );
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    return (
        <Box sx={{ padding: 2 }}>
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="user list table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', padding: 2 }}>
                                S.No
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', padding: 2 }}>
                                First Name
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', padding: 2 }}>
                                Last Name
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', padding: 2 }}>
                                Email
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', padding: 2 }}>
                                User ID
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', padding: 2 }} align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' },
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0',
                                        cursor: 'pointer',
                                    },
                                    transition: 'background-color 0.3s ease',
                                }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.firstName}</TableCell>
                                <TableCell>{row.lastName}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.userId}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title="View">
                                        <IconButton onClick={() => alert(`Viewing ${row.firstName}`)}>
                                            <Visibility color="primary" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => handleEditClick(row)}>
                                            <Edit color="secondary" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => alert(`Deleting ${row.firstName}`)}>
                                            <Delete color="error" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Redesigned Edit User Modal */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, padding: 3, boxShadow: 5 } }}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Person sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                    <DialogTitle sx={{ paddingLeft: 1, fontWeight: 'bold', fontSize: '1.5rem' }}>Edit User</DialogTitle>
                </Box>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                fullWidth
                                variant="outlined"
                                value={currentUser.firstName || ''}
                                onChange={handleChange}
                                sx={{ mt: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                fullWidth
                                variant="outlined"
                                value={currentUser.lastName || ''}
                                onChange={handleChange}
                                sx={{ mt: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                name="email"
                                fullWidth
                                variant="outlined"
                                value={currentUser.email || ''}
                                onChange={handleChange}
                                sx={{ mt: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="User ID"
                                name="userId"
                                fullWidth
                                disabled
                                variant="outlined"
                                value={currentUser.userId || ''}
                                onChange={handleChange}
                                sx={{ mt: 1 }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ paddingRight: 3, paddingBottom: 2 }}>
                    <Button onClick={handleClose} sx={{ mr: 2 }}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UsersList;

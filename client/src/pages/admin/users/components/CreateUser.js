import React, { useState, useCallback } from 'react';
import {
    Box, Typography, Button, IconButton, TextField, MenuItem, Grid, Paper
} from '@mui/material';
import { CloudUpload, Close, Download } from '@mui/icons-material';
import {bulkRegister, createUser} from "../../../../services/User.services"

// Allowed Excel MIME types
const allowedFileTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const CreateUser = () => {
    const [formType, setFormType] = useState('file'); // 'file' or 'singleUser'
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    // Handle switching between form types
    const handleFormTypeChange = (event) => {
        setFormType(event.target.value);
        setFile(null);
        setUserData({ firstName: '', lastName: '', email: '' });
        setError('');
    };

    // Handle file validation and upload
    const handleFileChange = useCallback((event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            validateFile(selectedFile);
        }
    }, []);

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            validateFile(droppedFile);
        }
    }, []);

    const validateFile = (file) => {
        if (allowedFileTypes.includes(file.type)) {
            setFile(file);
            setError('');
        } else {
            setFile(null);
            setError('Only Excel files (.xls, .xlsx) are allowed.');
        }
    };

    const handleRemoveFile = useCallback(() => {
        setFile(null);
        setError('');
    }, []);

    // Handle user data changes
    const handleUserDataChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(''); // Reset error before processing

        if (formType === 'file') {
            if (!file) {
                setError('Please upload a valid Excel file.');
                return;
            }

            // Create FormData to send the file
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await bulkRegister(formData)
                console.log('Excel file uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading Excel file:', error);
                setError('Failed to upload the Excel file.');
            }
        } else if (formType === 'singleUser') {
            const { firstName, lastName, email } = userData;

            if (!firstName || !lastName || !email) {
                setError('All fields are required.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError('Please enter a valid email address.');
                return;
            }

            try {
                const response = await createUser(userData)
                console.log('User created successfully:', response.data);
            } catch (error) {
                console.error('Error creating user:', error);
                setError('Failed to create the user.');
            }
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                maxWidth: 500,
                margin: 'auto',
                padding: 3,
            }}
        >
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    {formType === 'file' ? 'Upload Excel File' : 'Create a Single User'}
                </Typography>

                {/* Form Type Switcher */}
                <TextField
                    select
                    label="Form Type"
                    value={formType}
                    onChange={handleFormTypeChange}
                    fullWidth
                    sx={{ mb: 3 }}
                >
                    <MenuItem value="file">Upload Excel File</MenuItem>
                    <MenuItem value="singleUser">Create Single User</MenuItem>
                </TextField>

                {/* File Uploader Section */}
                {formType === 'file' && (
                    <>
                        <Box
                            sx={{
                                width: '100%',
                                margin: 'auto',
                                padding: 3,
                                border: '2px dashed #ccc',
                                borderRadius: 2,
                                textAlign: 'center',
                                cursor: 'pointer',
                                '&:hover': {
                                    borderColor: '#999',
                                },
                            }}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {!file ? (
                                <>
                                    <CloudUpload fontSize="large" />
                                    <Typography variant="h6" gutterBottom>
                                        Drag & Drop an Excel file here
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        or click to select an Excel file
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        sx={{ mt: 2 }}
                                    >
                                        Upload File
                                        <input
                                            type="file"
                                            hidden
                                            accept=".xls,.xlsx"
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                    {error && (
                                        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                                            {error}
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ mt: 2 }}
                                >
                                    <Typography variant="body1" noWrap>
                                        {file.name}
                                    </Typography>
                                    <IconButton
                                        onClick={handleRemoveFile}
                                        aria-label="Remove file"
                                        size="small"
                                    >
                                        <Close />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>

                        {/* Add Downloadable Template Section */}
                        <Box mt={2} textAlign="center">
                            <Typography variant="body2" color="textSecondary">
                                Need a template? Download the example Excel file below:
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<Download />}
                                href="/path-to-your-excel-template.xlsx" // Replace with the actual path to your template
                                download="Template.xlsx"
                                sx={{ mt: 1 }}
                            >
                                Download Template
                            </Button>
                        </Box>
                    </>
                )}

                {/* Single User Form Section */}
                {formType === 'singleUser' && (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleUserDataChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleUserDataChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={userData.email}
                                onChange={handleUserDataChange}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                )}

                {/* Error Message */}
                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}

                {/* Submit Button */}
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Submit
                </Button>
            </Paper>
        </Box>
    );
};

export default CreateUser;

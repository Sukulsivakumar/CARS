import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { loginUser } from '../services/Auth.services';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import branding from '../assets/Images/branding.svg'; // Placeholder for branding illustration

// Styled components
const StyledGridContainer = styled(Grid)({
    minHeight: '100vh',
});

const LeftSection = styled(Grid)({
    backgroundColor: '#24dde3',
    color: '#FFFFFF',
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
});

const BrandingImage = styled('img')({
    width: '600px', // Increased width for larger SVG
    height: 'auto',
    marginBottom: '20px',
});

const RightSection = styled(Grid)({
    backgroundColor: '#ECF0F1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
});

const FormContainer = styled(Paper)({
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    backgroundColor: '#FFFFFF',
});

const StyledButton = styled(Button)({
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#24dde3',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#1C598A',
    },
});

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '& fieldset': {
            borderColor: '#BDC3C7',
        },
        '&:hover fieldset': {
            borderColor: '#95A5A6',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#2980B9',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#7F8C8D',
    },
});

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`Email: ${email} Password: ${password}`);
        try {
            const { data } = await loginUser({ email, password });
            console.log(data)
            setUser(data.user);
            navigate('/admin/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <StyledGridContainer container>
            {/* Left Section with Branding SVG */}
            <LeftSection item xs={12} md={6}>
                <BrandingImage src={branding} alt="Branding Logo" /> {/* Larger Branding SVG */}
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome Back!
                </Typography>
                <Typography variant="subtitle1">
                    Please sign in to continue.
                </Typography>
            </LeftSection>

            {/* Right Section with the Login Form */}
            <RightSection item xs={12} md={6}>
                <FormContainer elevation={3}>
                    <Typography variant="h5" component="h1" gutterBottom align="center">
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <StyledTextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <StyledTextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <StyledButton type="submit" variant="contained" fullWidth>
                            Sign In
                        </StyledButton>
                    </form>
                </FormContainer>
            </RightSection>
        </StyledGridContainer>
    );
};

export default LoginForm;

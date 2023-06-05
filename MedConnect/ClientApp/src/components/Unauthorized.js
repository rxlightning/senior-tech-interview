import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h1" style={{ marginTop: '2rem' }}>
                Unauthorized
            </Typography>
            <Typography variant="body1" style={{ marginTop: '1rem' }}>
                You do not have permission to access this page.
            </Typography>
            <Button variant="contained" color="primary" style={{ marginTop: '2rem' }} onClick={handleLogin}>
                Login
            </Button>
        </div>
    );
};

export default Unauthorized;
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer" 
            py={4}
            px={8}
            mt={8}
            sx={{ 
                backgroundColor: '#f8b6bc', 
                color: 'black', 
                textAlign: 'center'
            }}
        >
            <Typography variant="body1" fontWeight="bold"  color="white">&copy; {new Date().getFullYear()} ASW - WIQ_ES2C</Typography>
        </Box>
    );
}

export default Footer;

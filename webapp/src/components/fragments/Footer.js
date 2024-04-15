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
                backgroundColor: '#9A77B0', 
                color: 'black', 
                textAlign: 'center'
            }}
        >
            <Typography variant="body1" fontWeight="bold">&copy; {new Date().getFullYear()} ASW - WIQ_ES5B</Typography> 
        </Box>
    );
}

export default Footer;

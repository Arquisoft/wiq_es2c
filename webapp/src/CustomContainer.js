import Container from '@mui/material/Container';
import backgroundImage from './components/images/fondo.png';

export function CustomContainer({ children, ...props }) {
  return (
    <Container 
      component="main" 
      maxWidth="xxl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '77vh', 
        width: '100%', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        maxHeight: '80vh', overflow: 'auto'
      }}
      {...props}
    >
      {children}
    </Container>
  );
}
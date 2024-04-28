import Container from '@mui/material/Container';;

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
        maxHeight: '80vh', overflow: 'auto'
      }}
      {...props}
    >
      {children}
    </Container>
  );
}
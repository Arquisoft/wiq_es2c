import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { UserProvider } from './components/UserContext';

test('renders learn react link', () => {
  render(<UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>);

  const linkElement = screen.getByText('¿Ya tienes cuenta? Inicia sesión aquí.');
  const linkElement2 = screen.getByText('¿No tienes cuenta? Registrate aquí.');
  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});

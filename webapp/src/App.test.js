import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; 

test('renders learn react link', () => {
  render(<Router>
    <App />
  </Router>);
  const linkElement = screen.getByText(/¿Ya tienes cuenta? Inicia sesión aquí./i);
  const linkElement2 = screen.getByText(/¿No tienes cuenta? Registrate aquí./i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});

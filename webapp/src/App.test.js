import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);

  //const linkElement = screen.getByText("¿Ya tienes cuenta? Inicia sesión aquí.");
  const linkElement2 = screen.getByText("¿No tienes cuenta? Registrate aquí.");
  //expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});

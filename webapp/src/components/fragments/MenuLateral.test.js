import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MenuLateral from './MenuLateral'; // Asegúrate de que la ruta es correcta
import { I18nextProvider } from "react-i18next";
import i18n from "../../translations/i18n";
import { UserProvider } from '../UserContext';
import { MemoryRouter as Router, useLocation } from 'react-router-dom';



i18n.changeLanguage("es");
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('MenuLateral', () => {
  test('renders AppBar', () => {
    const { getByRole } = render(
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router>
            <MenuLateral />
          </Router>
        </UserProvider>
      </I18nextProvider>
    );
    const appBar = getByRole('banner');
    expect(appBar).toBeInTheDocument();
  });

  test('muestra la barra de navegacion correctamente en /', async () => {
    const customLocation = { pathname: '/', search: '', hash: '', state: null };
    useLocation.mockReturnValue(customLocation);
    const { getByRole, getByLabelText } = render(
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router>
            <MenuLateral />
          </Router>
        </UserProvider>
      </I18nextProvider>
    );
    const menuButton = getByLabelText('menu');
    fireEvent.click(menuButton);
    const drawer = getByRole('presentation');
    expect(drawer).toBeInTheDocument();
  });

  // Añade más pruebas según sea necesario
});
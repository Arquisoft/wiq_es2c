import React from 'react';
import { render, waitFor, act, fireEvent} from '@testing-library/react';
import { MemoryRouter as Router, useLocation } from 'react-router-dom';
import { UserProvider } from '../UserContext';
import NavigationBar from './NavigationBar';
import { I18nextProvider } from "react-i18next";
import i18n from "../../translations/i18n";

i18n.changeLanguage("es");
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('Navigation bar component', () => {
  it('muestra la barra de navegacion correctamente en /', async () => {
    const customLocation = { pathname: '/', search: '', hash: '', state: null };
    useLocation.mockReturnValue(customLocation);

    const { getByAltText, getByRole, getByText } = render(<I18nextProvider i18n={i18n}>
      <UserProvider>
        <Router initialEntries={['/']} initialIndex={0}>
          <NavigationBar />
        </Router>
      </UserProvider>
    </I18nextProvider>);

    var spanishButton = null;
    var englishButton = null;

    await waitFor(() => {
      spanishButton = getByAltText('Imagen español');
      expect(spanishButton).toBeInTheDocument();
      expect(spanishButton).toHaveAttribute('src', 'esp.png');

      englishButton = getByAltText('Imagen ingles');
      expect(englishButton).toBeInTheDocument();
      expect(englishButton).toHaveAttribute('src', 'ing.png');
    });

    await act(async() => {
      let iconButton = getByRole('button', { name: 'menu' });
      fireEvent.click(iconButton);

      // Simulamos un cambio de idioma
      fireEvent.click(spanishButton);
      fireEvent.click(englishButton);
    });
  });

  it('muestra la barra de navegacion correctamente en /Game', async () => {
    const customLocation = { pathname: '/Game', search: '', hash: '', state: null };
    useLocation.mockReturnValue(customLocation);

    const { getByAltText } = render(<I18nextProvider i18n={i18n}>
      <UserProvider>
        <Router initialEntries={['/']} initialIndex={0}>
          <NavigationBar />
        </Router>
      </UserProvider>
    </I18nextProvider>);

    var homeButton = null;

    await waitFor(() => {
      homeButton = getByAltText('Imagen home');
      expect(homeButton).toBeInTheDocument();
      expect(homeButton).toHaveAttribute('src', 'home.png');
    });

    await act(async() => {
      fireEvent.click(homeButton);
    });
  });
});
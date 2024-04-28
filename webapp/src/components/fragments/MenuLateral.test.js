import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
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
  it('renders the complete list', async() => {
    const customLocation = { pathname: '/PantallaInicio', search: '', hash: '', state: null };
    useLocation.mockReturnValue(customLocation);
    const toggleDrawer = jest.fn();

    const { getByRole, getByLabelText, getByText } = render(
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router initialEntries={['/']} initialIndex={0}>
            <MenuLateral toggleDrawer={toggleDrawer}/>
          </Router>
        </UserProvider>
      </I18nextProvider>
    );

    const iconButton = getByLabelText('menu3');

    await act(() => {
      fireEvent.click(iconButton);
    }); 
   
    var boxElement;
    await waitFor(() => {
      boxElement = getByRole('presentation2');
    });

    await act(() => {
      fireEvent.click(boxElement);
      fireEvent.keyDown(boxElement, { key: 'Enter' }); 
      fireEvent.keyDown(boxElement, { key: 'Escape' });

      fireEvent.click(getByText('Historico'));
      fireEvent.click(getByText('Ranking'));
      fireEvent.click(getByText('Perfil'));
      fireEvent.click(getByText('Cerrar sesión'));
  
    });
  });
  
  it('renders MenuLateral', async() => {
    const customLocation = { pathname: '/', search: '', hash: '', state: null };
    useLocation.mockReturnValue(customLocation);

    const { getByRole, getByText } = render(
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router initialEntries={['/']} initialIndex={0}>
            <MenuLateral />
          </Router>
        </UserProvider>
      </I18nextProvider>
    );
    const appBar = getByRole('banner');
    expect(appBar).toBeInTheDocument();

    await act(() => {
      const menuButton = getByText('BrainWIQ');
      fireEvent.click(menuButton);
    });
  });

  it('muestra la barra de navegacion correctamente en /', async () => {
    const customLocation = { pathname: '/Game', search: '', hash: '', state: null };
    useLocation.mockReturnValue(customLocation);

    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router initialEntries={['/']} initialIndex={0}>
            <MenuLateral />
          </Router>
        </UserProvider>
      </I18nextProvider>
    );

    await act(() => {
      const menuButton = getByText('BrainWIQ2');
      fireEvent.click(menuButton);
    });
  });
});
import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PantallaInicio from './PantallaInicio';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { I18nextProvider } from "react-i18next";
import i18n from "../translations/i18n";

i18n.changeLanguage("es");
const mockAxios = new MockAdapter(axios);

describe('PantallaInicio component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra la pantalla de inicio correctamente', async () => {

    render(<I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router>
            <PantallaInicio />
          </Router>
        </UserProvider>
      </I18nextProvider>);

    const element = screen.getByText(/BIENVENIDO/);
    const nuevaPartidaButton = screen.getByRole('button', { name: 'NUEVA PARTIDA' });

    // Verifica si el elemento se encuentra en el DOM
    expect(element).toBeInTheDocument();

    // Simulate user input
    await act(async () => {
        fireEvent.click(nuevaPartidaButton);
      });
  });
});
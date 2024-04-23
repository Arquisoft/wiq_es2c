import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PantallaInicioAdmin from './PantallaInicioAdmin';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { I18nextProvider } from "react-i18next";
import i18n from "../translations/i18n";


i18n.changeLanguage("es");
const mockAxios = new MockAdapter(axios);

describe('PantallaInicioAdmin component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra la pantalla de inicio admin correctamente', async () => {

    render(<I18nextProvider i18n={i18n}>
      <UserProvider>
        <Router>
          <PantallaInicioAdmin />
        </Router>
      </UserProvider>
    </I18nextProvider>);

    const usuariosButton = screen.getByRole('button', { name: 'USUARIOS' });
    const preguntasButton = screen.getByRole('button', { name: 'PREGUNTAS' });

    // Simulate user input
    await act(async () => {
        fireEvent.click(usuariosButton);
        fireEvent.click(preguntasButton);
      });
  });
});
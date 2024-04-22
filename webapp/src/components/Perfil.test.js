import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Perfil from './Perfil';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import i18n from "../translations/i18n";

i18n.changeLanguage("es");
const mockAxios = new MockAdapter(axios);

describe('Perfil component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra el perfil correctamente', async () => {

    // Mockeamos la petición que devuelve el histórico
    mockAxios.onGet("http://localhost:8000/getUser").reply(200, 
        {  username: "angela",
          email: "angela@gmail.com",
          creado: "2024-04-14T20:21:34.969Z"});


    render(<I18nextProvider i18n={i18n}>
      <UserProvider>
      <Router>
        <Perfil />
      </Router>
    </UserProvider>
    </I18nextProvider>);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('PERFIL');

      expect(screen.getByText('Usuario')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Creado')).toBeInTheDocument();

      expect(screen.getByText('angela')).toBeInTheDocument();
      expect(screen.getByText('angela@gmail.com')).toBeInTheDocument();
      expect(screen.getByText('2024-04-14T20:21:34.969Z')).toBeInTheDocument();

    }); 
  });
});
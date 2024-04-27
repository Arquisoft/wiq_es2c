import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AllUsers from './AllUsers';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import i18n from "../translations/i18n";
import { I18nextProvider } from "react-i18next";


i18n.changeLanguage("es");
const mockAxios = new MockAdapter(axios);

describe('AllUsers component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra la api usuarios correctamente', async () => {

    // Mockeamos la petición que devuelve el histórico
    mockAxios.onGet("http://localhost:8000/getAllUsers").reply(200, 
        [{  username: "angela",
          email: "angela@gmail.com",
          creado: "2024-04-14T20:21:34.969Z"}]);


    render(<I18nextProvider i18n={i18n}>
        <UserProvider>
        <Router>
          <AllUsers />
        </Router>
      </UserProvider>
    </I18nextProvider>);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('TODOS LOS USUARIOS');

      expect(screen.getByText('Usuario')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Creado')).toBeInTheDocument();

      expect(screen.getByText('angela')).toBeInTheDocument();
      expect(screen.getByText('angela@gmail.com')).toBeInTheDocument();
      expect(screen.getByText('2024-04-14T20:21:34.969Z')).toBeInTheDocument();

    }); 
  });

  test('should display Snackbar when error is present', async () => {
    render(<I18nextProvider i18n={i18n}>
      <UserProvider>
        <Router><AllUsers error="Request failed with status code 404" setError={jest.fn()} /></Router>
      </UserProvider>
    </I18nextProvider>);

    // Verificar que el Snackbar se muestra con el mensaje de error correcto
    const errorElement = await screen.findByRole('alert');

    expect(errorElement).toHaveTextContent('Error: Request failed with status code 404');
  });
});
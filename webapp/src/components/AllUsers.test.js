import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Perfil from './Perfil';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';

const mockAxios = new MockAdapter(axios);

describe('Perfil component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra el perfil correctamente', async () => {

    // Mockeamos la petición que devuelve el histórico
    mockAxios.onGet("http://localhost:8000/getAllUsers").reply(200, 
        {  username: "angela",
          email: "angela@gmail.com",
          creado: "2024-04-14T20:21:34.969Z"});


    render(<UserProvider>
      <Router>
        <Perfil />
      </Router>
    </UserProvider>);

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
});
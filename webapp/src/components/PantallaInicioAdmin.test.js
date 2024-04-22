import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PantallaInicioAdmin from './PantallaInicioAdmin';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';

const mockAxios = new MockAdapter(axios);

describe('PantallaInicioAdmin component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra la pantalla de inicio admin correctamente', async () => {

    render(<UserProvider>
      <Router>
        <PantallaInicioAdmin />
      </Router>
    </UserProvider>);

    const usuariosButton = screen.getByRole('button', { name: 'USUARIOS' });
    const preguntasButton = screen.getByRole('button', { name: 'PREGUNTAS' });

    // Verifica si el elemento se encuentra en el DOM
    expect(element).toBeInTheDocument();

    // Simulate user input
    await act(async () => {
        fireEvent.click(nuevaPartidaButton);
      });
  });
});
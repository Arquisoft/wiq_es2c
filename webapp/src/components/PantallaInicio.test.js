import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PantallaInicio from './PantallaInicio';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';

const mockAxios = new MockAdapter(axios);

describe('PantallaInicio component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra la pantalla de inicio correctamente', async () => {

    const { getByAltText } = render(<UserProvider>
      <Router>
        <PantallaInicio />
      </Router>
    </UserProvider>);

    const element = screen.getByText(/¡BIENVENIDO A WIQ/);
    const nuevaPartidaButton = screen.getByRole('button', { name: 'NUEVA PARTIDA' });

    // Verifica si el elemento se encuentra en el DOM
    expect(element).toBeInTheDocument();
    var logoutButton = getByAltText('Imagen logout');
    expect(logoutButton).toBeInTheDocument();

    // Simulate user input
    await act(async () => {
        fireEvent.click(nuevaPartidaButton);
      });
      
  });

  it('logout', async () => {
    const { getByAltText } = render(<UserProvider>
      <Router>
        <PantallaInicio />
      </Router>
    </UserProvider>);

    const element = screen.getByText(/¡BIENVENIDO A WIQ/);

    // Verifica si el elemento se encuentra en el DOM
    expect(element).toBeInTheDocument();
    var logoutButton = getByAltText('Imagen logout');
    expect(logoutButton).toBeInTheDocument();

    // Simulate user input
    await act(async () => {
        fireEvent.click(logoutButton);
    });
    
    var closeSession = screen.getByText("Sesion cerrada");
    expect(closeSession).toBeInTheDocument();
  });

});
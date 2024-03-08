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

    const usernameGlobal = 'UsuarioPrueba';

    render(<UserProvider>
      <Router>
        <PantallaInicio />
      </Router>
    </UserProvider>);

    const textoBienvenida = screen.getByLabelText(new RegExp(`¡BIENVENIDO A WIQ ${usernameGlobal}!`, 'i'));
    const nuevaPartidaButton = screen.getByRole('button', { name: /NUEVA PARTIDA/i });
    

    // Simulate user input
    await act(async () => {
        fireEvent.click(nuevaPartidaButton);
      });

    expect(textoBienvenida).toBeInTheDocument();
  });

});

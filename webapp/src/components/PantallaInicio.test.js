import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PantallaInicio from './PantallaInicio';

const mockAxios = new MockAdapter(axios);

describe('PantallaInicio component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra la pantalla de inicio correctamente', async () => {
    render(<PantallaInicio />);

    const element = screen.getByText(/¡BIENVENIDO A WIQ/);
    const nuevaPartidaButton = screen.getByRole('button', { name: 'NUEVA PARTIDA' });

    // Verifica si el elemento se encuentra en el DOM
    expect(element).toBeInTheDocument();
    

    // Simulate user input
    await act(async () => {
        fireEvent.click(nuevaPartidaButton);
      });
      
  });

});

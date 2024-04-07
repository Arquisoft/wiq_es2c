import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import { UserProvider } from './UserContext';
import { navigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';

describe('Navigation bar component', () => {
  it('muestra la barra de navegacion correctamente', async () => {
    const { getByAltText } = render(<UserProvider>
        <Router>
            <NavigationBar />
        </Router>
    </UserProvider>);

    var homeButton;
    var historicButton;
    var userButton;
    var logoutButton;

    await waitFor(() => {
        homeButton = getByAltText("Imagen home");
        historicButton = getByAltText("Imagen historico");
        userButton = getByAltText("Imagen usuario");
        logoutButton = getByAltText("Imagen logout");

         // Verifica si los elementos se encuentran en el DOM
        expect(homeButton).toBeInTheDocument();
        expect(historicButton).toBeInTheDocument();
        expect(userButton).toBeInTheDocument();
        expect(logoutButton).toBeInTheDocument(); 
    });

    // Simulate user input
    await act(async () => {
        fireEvent.click(homeButton);
        expect(navigate).toHaveBeenCalledWith('/PantallaInicio');
    });

    await act(async () => {
        fireEvent.click(historicButton);
        expect(navigate).toHaveBeenCalledWith('/gameHistory');
    });

    await act(async () => {
        fireEvent.click(logoutButton);
        expect(navigate).toHaveBeenCalledWith('/App');
    });
  });
});
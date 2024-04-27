import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import EndGame from './EndGame';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import i18n from "../translations/i18n";
import { I18nextProvider } from "react-i18next";


i18n.changeLanguage("es");
const mockAxios = new MockAdapter(axios);

describe('EndGame component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra el resumen con imagen 1 correctamente', async () => {

    // Mockeamos la petición que devuelve el histórico
    mockAxios.onGet("http://localhost:8000/endgamestats").reply(200, 
        {  totalRightQuestions: 1,
          totalIncorrectQuestions: 1,
          ratio: "50%",
          totalTime: "2s",
          endgameImageWithRatio: 3});


    render(<I18nextProvider i18n={i18n}>
      <UserProvider>
      <Router>
        <EndGame />
      </Router>
    </UserProvider>
    </I18nextProvider>);

    await waitFor(() => {
      expect(screen.getByText('Estadísticas de la última partida')).toBeInTheDocument();

      expect(screen.getByText('Preguntas correctas: 1')).toBeInTheDocument();
      expect(screen.getByText('Preguntas incorrectas: 1')).toBeInTheDocument();
      expect(screen.getByText('Ratio de aciertos: 50%')).toBeInTheDocument();
      expect(screen.getByText('Tiempo total: 2s')).toBeInTheDocument();
      
    }); 

  });

  it('muestra el resumen con imagen 2 correctamente', async () => {

    // Mockeamos la petición que devuelve el histórico
    mockAxios.onGet("http://localhost:8000/endgamestats").reply(200, 
        {  totalRightQuestions: 1,
          totalIncorrectQuestions: 1,
          ratio: "50%",
          totalTime: "2s",
          endgameImageWithRatio: 43});


    render(<I18nextProvider i18n={i18n}>
      <UserProvider>
      <Router>
        <EndGame />
      </Router>
    </UserProvider>
    </I18nextProvider>);

    await waitFor(() => {
      expect(screen.getByText('Estadísticas de la última partida')).toBeInTheDocument();

      expect(screen.getByText('Preguntas correctas: 1')).toBeInTheDocument();
      expect(screen.getByText('Preguntas incorrectas: 1')).toBeInTheDocument();
      expect(screen.getByText('Ratio de aciertos: 50%')).toBeInTheDocument();
      expect(screen.getByText('Tiempo total: 2s')).toBeInTheDocument();
      
    }); 
  });

    it('muestra el resumen con imagen 3 correctamente', async () => {

      // Mockeamos la petición que devuelve el histórico
      mockAxios.onGet("http://localhost:8000/endgamestats").reply(200, 
          {  totalRightQuestions: 1,
            totalIncorrectQuestions: 1,
            ratio: "50%",
            totalTime: "2s",
            endgameImageWithRatio: 67});
  
  
      render(<I18nextProvider i18n={i18n}>
        <UserProvider>
        <Router>
          <EndGame />
        </Router>
      </UserProvider>
      </I18nextProvider>);
  
      await waitFor(() => {
        expect(screen.getByText('Estadísticas de la última partida')).toBeInTheDocument();
  
        expect(screen.getByText('Preguntas correctas: 1')).toBeInTheDocument();
        expect(screen.getByText('Preguntas incorrectas: 1')).toBeInTheDocument();
        expect(screen.getByText('Ratio de aciertos: 50%')).toBeInTheDocument();
        expect(screen.getByText('Tiempo total: 2s')).toBeInTheDocument();
        
    }); 
  });

  test('should display Snackbar when error is present', async () => {
    render(<I18nextProvider i18n={i18n}>
      <UserProvider>
        <Router><EndGame error="Request failed with status code 404" setError={jest.fn()} /></Router>
      </UserProvider>
    </I18nextProvider>);

    // Verificar que el Snackbar se muestra con el mensaje de error correcto
    const errorElement = await screen.findByRole('alert');

    expect(errorElement).toHaveTextContent('Error: Request failed with status code 404');
  });
  
});
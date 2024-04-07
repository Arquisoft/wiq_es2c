import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import GameHistory from './Gamehistory';

const mockAxios = new MockAdapter(axios);

describe('Game history', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('show game history', async () => {
    // Mockeamos la petición que devuelve el histórico
    mockAxios.onGet("http://localhost:8000/gamehistory").reply(200, 
        {  userId: "12345abcde",
            totalGamesPlayed: 1,
            totalQuestionsAnswered: 5,
            totalRightQuestions: 5,
            totalIncorrectQuestions: 0,
            ratio: 100,
            totalTime: 15 });

    render(<UserProvider>
      <Router>
        <GameHistory/>
      </Router>
    </UserProvider>);

    await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('MIS ESTADÍSTICAS');

        expect(screen.getByText('Partidas Jugadas')).toBeInTheDocument();
        expect(screen.getByText('Preguntas respondidas')).toBeInTheDocument();
        expect(screen.getByText('Aciertos')).toBeInTheDocument();
        expect(screen.getByText('Fallos')).toBeInTheDocument();
        expect(screen.getByText('Ratio de Acierto')).toBeInTheDocument();
        expect(screen.getByText('Tiempo jugado')).toBeInTheDocument();

        /*expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('15')).toBeInTheDocument();*/

    }); 
  });
});
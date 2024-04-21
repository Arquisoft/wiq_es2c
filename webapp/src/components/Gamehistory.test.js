import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import GameHistory from './Gamehistory';
import { I18nextProvider } from "react-i18next";
import i18n from "../translations/i18n";

i18n.changeLanguage("es");
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
          totalQuestionsAnswered: 3,
          totalRightQuestions: 2,
          totalIncorrectQuestions: 0,
          ratio: "60 %",
          totalTime: "10 s"});

    render(<I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router>
            <GameHistory/>
          </Router>
        </UserProvider>
      </I18nextProvider>);

    await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('MIS ESTADÍSTICAS');

        expect(screen.getByText('Partidas jugadas')).toBeInTheDocument();
        expect(screen.getByText('Preguntas respondidas')).toBeInTheDocument();
        expect(screen.getByText('Aciertos')).toBeInTheDocument();
        expect(screen.getByText('Fallos')).toBeInTheDocument();
        expect(screen.getByText('Ratio de acierto')).toBeInTheDocument();
        expect(screen.getByText('Tiempo jugado')).toBeInTheDocument();

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByText('60 %')).toBeInTheDocument();
        expect(screen.getByText('10 s')).toBeInTheDocument();

    }); 
  });
});
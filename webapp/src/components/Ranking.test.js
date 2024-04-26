import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import Ranking from './Ranking';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { I18nextProvider } from "react-i18next";
import i18n from "../translations/i18n";

const mock = new MockAdapter(axios);

describe('Ranking test', () => {
  it('renders correctly', async () => {
    mock.onGet('http://localhost:8000/topUsers').reply(200, {
        topUsers: [
          { userId: 'usuario1', ratio: 80 },
          { userId: 'usuario2', ratio: 75 },
          { userId: 'usuario3', ratio: 70 },
        ],
    });

    mock.onGet('http://localhost:8000/ranking').reply(200, 
    [
        { userId: 'usuario1', totalGamesPlayed: 10, totalQuestionsAnswered: 50, totalRightQuestions: 40, ratio: '80%', totalTime: '100s' },
        { userId: 'usuario2', totalGamesPlayed: 12, totalQuestionsAnswered: 60, totalRightQuestions: 45, ratio: '75%', totalTime: '120s' },
    ]);

    const { getByText, getByLabelText } = render(
    <I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router>
            <Ranking />
          </Router>
        </UserProvider>
      </I18nextProvider>);

    await waitFor(() =>  {
        expect(getByLabelText('Número de usuarios')).toBeInTheDocument();
        expect(getByText('Posición')).toBeInTheDocument();
    });
  });

  it('can handle errors', async () => {
    mock.onGet('http://localhost:8000/ranking').reply(500, {error: "Error al obtener el ranking"});

    const { getByText } = render(
    <I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router>
            <Ranking />
          </Router>
        </UserProvider>
      </I18nextProvider>);

    await waitFor(() =>  {
       let error = getByText("Error: Error al obtener el ranking");
       expect(error).toBeInTheDocument();
    });
  });
});

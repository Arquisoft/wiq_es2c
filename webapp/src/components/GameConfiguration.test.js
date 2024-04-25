import React from 'react';
import { render, screen, waitFor, fireEvent, act, within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import GameConfiguration from './GameConfiguration';
import { I18nextProvider } from "react-i18next";
import i18n from "../translations/i18n";

i18n.changeLanguage("es");
const mockAxios = new MockAdapter(axios);

// Prueba de cambio del número de preguntas
async function changeQuestionsNumber(getByLabelText, questionsNumber) {
  await act(async() => {
    let textField = getByLabelText('Número de preguntas');
    fireEvent.change(textField, { target: { value: questionsNumber } });
  
    let textFieldValue = textField.value;
    expect(textFieldValue).toBe(questionsNumber);
  });
}

// Prueba de cambio del tiempo
async function changeTime(getByLabelText, time) {
  await act(async() => {
    let textField = getByLabelText('Tiempo disponible por pregunta');
    fireEvent.change(textField, { target: { value: time } });
  
    let textFieldValue = textField.value;
    expect(textFieldValue).toBe(time);
  });
}

describe('Game history', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('show game configuration and put correct parameters', async () => {
    const { getByLabelText } = render(<I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router>
            <GameConfiguration/>
          </Router>
        </UserProvider>
      </I18nextProvider>);

    await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Personaliza tu partida');

        expect(screen.getByLabelText('Número de preguntas')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Número del 2 al 30')).toBeInTheDocument();
        expect(screen.getByLabelText('Tiempo disponible por pregunta')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Número del 10 al 60')).toBeInTheDocument();

        expect(screen.getByText('Selecciona las tematicas de la pregunta para jugar')).toBeInTheDocument();
        expect(screen.getByText('Todas')).toBeInTheDocument();
    }); 

    await changeQuestionsNumber(getByLabelText, '15');
    await changeTime(getByLabelText, '30');

    // Prueba de juego
    await act(async() => {
      mockAxios.onPost('http://localhost:8000/configureGame').reply(200, 
        { valueTime: "15", 
        valuedQuestion: "30" });

      let button = screen.getByText('JUGAR');
      fireEvent.click(button);
    });
  });

  it('show game configuration and put incorrect number of questions', async () => {
    const { getByLabelText } = render(<I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router>
            <GameConfiguration/>
          </Router>
        </UserProvider>
      </I18nextProvider>);

    await changeQuestionsNumber(getByLabelText, '0');
    await changeTime(getByLabelText, '30');

    // Prueba de juego 
    await act(async() => {
      let button = screen.getByText('JUGAR');
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByText('Error: Debe introducir un número de preguntas mayor o igual a 2')).toBeInTheDocument();
    });
  });

  it('show game configuration and put incorrect number of time', async () => {
    const { getByLabelText } = render(<I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router>
            <GameConfiguration/>
          </Router>
        </UserProvider>
      </I18nextProvider>);

    await changeQuestionsNumber(getByLabelText, '5');
    await changeTime(getByLabelText, '5');

    // Prueba de juego 
    await act(async() => {
      let button = screen.getByText('JUGAR');
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByText('Error: Debe introducir un tiempo igual o mayor a 10')).toBeInTheDocument();
    });
  });

  it('send a bad request to /configuregame', async () => {
    const { getByLabelText } = render(<I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router>
            <GameConfiguration/>
          </Router>
        </UserProvider>
      </I18nextProvider>);

    await changeQuestionsNumber(getByLabelText, '15');
    await changeTime(getByLabelText, '30');

    // Prueba de juego
    await act(async() => {
      mockAxios.onPost('http://localhost:8000/configureGame').reply(400);

      let button = screen.getByText('JUGAR');
      fireEvent.click(button);
    });
  });
});
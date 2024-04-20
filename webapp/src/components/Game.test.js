import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Game from './Game';
import { I18nextProvider } from "react-i18next";
import i18n from "../translations/i18n";

i18n.changeLanguage("es");
const mockAxios = new MockAdapter(axios);
jest.useFakeTimers(); // Para simular el paso del tiempo

describe('Start game', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('play', async () => {
    // Mockeamos la petición al generador de preguntas y la respuesta
    const locationState = {
      time: 30,
      question: 5,
      thematic: 'Geografia',
    };

    const location = {
      state: locationState,
    };

    const responseOptionsResult = ["Madrid", "Barcelona", "Oviedo", "Valladolid"];
    const updatedQuestion = {
      _id: '660434f228670016dfcac277',
      enunciado: '¿Cual es la capital de España?',
      respuesta_correcta: 'Madrid',
      respuesta_falsa1: 'Barcelona',
      respuesta_falsa2: 'Oviedo',
      respuesta_falsa3: 'Valladolid',
      __v: 0
      }

    mockAxios.onGet('http://localhost:8000/generateQuestion').reply(200, 
        {  responseQuestion: "¿Cual es la capital de España?",
        responseOptions: responseOptionsResult,
        responseCorrectOption: "Madrid",
        question_Id: "1",
        responseImage: ""});

    mockAxios.onGet('http://localhost:8000/updateQuestion').reply(200, 
        { message: "Tiempo de pregunta actualizado exitosamente", 
        updatedQuestion });

    render(<I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router>
            <Game location={location}/>
          </Router>
        </UserProvider>
      </I18nextProvider>);

    var button1;
    var button2;
    var button3;
    var button4;

    await waitFor(() => {
        const question = screen.getByText("¿Cual es la capital de España?");
        expect(question).toBeInTheDocument();

        const timer = screen.getByText("Tiempo restante: ");
        expect(timer).toBeInTheDocument();

        const timerBar = screen.getByRole("progressbar");
        expect(timerBar).toBeInTheDocument();

        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(4);

        button1 = screen.getByRole("button", { name: "Madrid" });
        button2 = screen.getByRole("button", { name: "Barcelona" });
        button3 = screen.getByRole("button", { name: "Oviedo" });
        button4 = screen.getByRole("button", { name: "Valladolid" });

        expect(button1).toBeInTheDocument();
        expect(button2).toBeInTheDocument();
        expect(button3).toBeInTheDocument();
        expect(button4).toBeInTheDocument();
    }); 

    // Comprobamos que pase el tiempo
    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText('Tiempo restante: 29 segundos')).toBeInTheDocument();
    });

    // Simulamos la interacción del usuario
    await act(async () => {
        fireEvent.click(button1);
    });

    await waitFor(() => {
      expect(button1).toHaveStyle('background-color: #00C853');
    });
  });

  /*
  it('error', async () => {
    const updatedQuestion = {
      _id: '660434f228670016dfcac277',
      enunciado: '¿Cual es la capital de España?',
      respuesta_correcta: 'Madrid',
      respuesta_falsa1: 'Barcelona',
      respuesta_falsa2: 'Oviedo',
      respuesta_falsa3: 'Valladolid',
      __v: 0
      }

    mockAxios.onGet('http://localhost:8000/generateQuestion').reply(500, {error: "Error al generar la pregunta"});

    mockAxios.onGet('http://localhost:8000/updateQuestion').reply(200, 
        { message: "Tiempo de pregunta actualizado exitosamente", 
        updatedQuestion });

    render(<UserProvider>
      <Router>
        <Game/>
      </Router>
    </UserProvider>);

    await waitFor(() => {
      expect(screen.getByText('Error: Error al generar la pregunta')).toBeInTheDocument();
    });
  });
  */
});
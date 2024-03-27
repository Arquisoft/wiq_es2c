import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Game from './Game';

const mockAxios = new MockAdapter(axios);

describe('Login component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('play', async () => {
    // Mock the axios.post request to simulate a successful response
    const responseOptionsResult = ["Madrid", "Barcelona", "Oviedo", "Valladolid"];
    const usernameGlobal = 'Prueba';
    const createNewGame = true;
    const answeredQuestionsValue = 5;
    const questionId = "1";
    const timePassed = 30;
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

    render(<UserProvider>
      <Router>
        <Game />
      </Router>
    </UserProvider>);

    var button1;
    var button2;
    var button3;
    var button4;

    await waitFor(() => {
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

    // Simulate user input
    await act(async () => {
        fireEvent.click(button2);
        expect(button2).toHaveStyle('background-color: rgb(21, 101, 192)');

        fireEvent.click(button1);
        expect(button1).toHaveStyle('background-color: rgb(21, 101, 192)');
      });

  });
});
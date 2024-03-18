import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
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
    mockAxios.onGet('http://localhost:8003/generateQuestion').reply(200, 
        {  responseQuestion: "¿Cual es la capital de España?",
        responseOptions: responseOptionsResult,
        responseCorrectOption: "Madrid"});        

    render(<Game />);

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
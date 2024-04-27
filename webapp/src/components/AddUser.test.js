import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddUser from './AddUser';
import { I18nextProvider } from "react-i18next";
import i18n from "../translations/i18n";

i18n.changeLanguage("es");
const mockAxios = new MockAdapter(axios);

describe('AddUser component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should add user successfully', async () => {
    render(<I18nextProvider i18n={i18n}>
        <AddUser />
      </I18nextProvider>);

    const usernameInput = screen.getByLabelText('Usuario');
    const passwordInput = screen.getByLabelText('Contraseña');
    const emailInput = screen.getByLabelText('Email');
    const addUserButton = screen.getByRole('button', { name: 'REGÍSTRATE' });

    // Mock the axios.post request to simulate a successful response
    mockAxios.onPost('http://localhost:8000/adduser').reply(200);

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(emailInput, { target: { value: 'testEmail' } });

    // Trigger the add user button click
    fireEvent.click(addUserButton);

    // Wait for the Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText('Usuario añadido correctamente')).toBeInTheDocument();
    });
  });

  it('should handle error when adding user', async () => {
    render(<I18nextProvider i18n={i18n}>
        <AddUser />
      </I18nextProvider>);

    const usernameInput = screen.getByLabelText('Usuario');
    const passwordInput = screen.getByLabelText('Contraseña');
    const emailInput = screen.getByLabelText('Email');
    const addUserButton = screen.getByRole('button', { name: 'REGÍSTRATE'});

    // Mock the axios.post request to simulate an error response
    mockAxios.onPost('http://localhost:8000/adduser').reply(500, { error: 'Internal Server Error' });

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(emailInput, { target: { value: 'testEmail' } });


    // Trigger the add user button click
    fireEvent.click(addUserButton);

    // Wait for the error Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText('Error: Internal Server Error')).toBeInTheDocument();
    });
  });
});

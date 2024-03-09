import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { UserProvider } from './UserContext';


const mockAxios = new MockAdapter(axios);

describe('Login component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should log in successfully', async () => {
    render(<UserProvider>
      <Router>
        <Login />
      </Router>
    </UserProvider>);

    const usernameInput = screen.getByLabelText('Usuario');
    const passwordInput = screen.getByLabelText('Contraseña');
    const loginButton = screen.getByRole('button', { name: 'ENTRA' });

    // Mock the axios.post request to simulate a successful response
    mockAxios.onPost('http://localhost:8000/login').reply(200, { createdAt: '2024-01-01T12:34:56Z' });

    // Simulate user input
    await act(async () => {
        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
        fireEvent.click(loginButton);
      });

  });

  it('should handle error when logging in', async () => {
    render(<UserProvider>
      <Router>
        <Login />
      </Router>
    </UserProvider>);

    const usernameInput = screen.getByLabelText('Usuario');
    const passwordInput = screen.getByLabelText('Contraseña');
    const loginButton = screen.getByRole('button', { name: 'ENTRA' });

    // Mock the axios.post request to simulate an error response
    mockAxios.onPost('http://localhost:8000/login').reply(401, { error: 'Unauthorized' });

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Trigger the login button click
    fireEvent.click(loginButton);

    // Wait for the error Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText('Error: Unauthorized')).toBeInTheDocument();
    });

  });
});
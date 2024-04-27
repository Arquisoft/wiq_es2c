import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AllQuestions from './AllQuestions';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import i18n from "../translations/i18n";
import { I18nextProvider } from "react-i18next";


i18n.changeLanguage("es");
const mockAxios = new MockAdapter(axios);

describe('AllQuestions component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra la api de preguntas correctamente', async () => {

    // Mockeamos la petición que devuelve el histórico
    mockAxios.onGet("http://localhost:8000/getAllQuestions").reply(200, 
        [{  enunciado: "¿En que campo juega el Sociedad Deportiva Amorebieta?",
        respuesta_correcta: "Campo Municipal de Urritxe"}, {  enunciado: "pregunta2",
        respuesta_correcta: "respuesta2"}]);


    render(<I18nextProvider i18n={i18n}>
      <UserProvider>
        <Router>
          <AllQuestions />
        </Router>
      </UserProvider>
    </I18nextProvider>);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('TODAS LAS PREGUNTAS');

      expect(screen.getByText('Pregunta')).toBeInTheDocument();
      expect(screen.getByText('Respuesta')).toBeInTheDocument();

      expect(screen.getByText('¿En que campo juega el Sociedad Deportiva Amorebieta?')).toBeInTheDocument();
      expect(screen.getByText('Campo Municipal de Urritxe')).toBeInTheDocument();

      expect(screen.getByText('pregunta2')).toBeInTheDocument();
      expect(screen.getByText('respuesta2')).toBeInTheDocument();

    }); 
  });

  test('should display Snackbar when error is present', async () => {
    render(<I18nextProvider i18n={i18n}>
      <UserProvider>
        <Router><AllQuestions error="Request failed with status code 404" setError={jest.fn()} /></Router>
      </UserProvider>
    </I18nextProvider>);

    // Verificar que el Snackbar se muestra con el mensaje de error correcto
    const errorElement = await screen.findByRole('alert');

    expect(errorElement).toHaveTextContent('Error: Request failed with status code 404');
  });
});
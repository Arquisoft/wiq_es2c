import { render, screen, act, fireEvent} from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { UserProvider } from './components/UserContext';
import { I18nextProvider } from "react-i18next";
import i18n from "./translations/i18n";

i18n.changeLanguage("es");

describe('renders learn react link', () => {
  it('play', async () => {
    var showLogin = false;
    const setShowLogin = newState => {
      showLogin = newState;
    };

    render(<I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router>
            <App setShowLogin={setShowLogin} showLogin={showLogin}/>
          </Router>
        </UserProvider>
      </I18nextProvider>);
  
    const button = screen.getByText("¿No tienes cuenta? Registrate aquí.");
    expect(button).toBeInTheDocument();
  
    await act(async() => {
      fireEvent.click(button);
    });
  
     expect(showLogin).toBe(false);
  }); 
});
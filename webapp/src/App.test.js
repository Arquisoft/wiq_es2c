import { render, screen, act, fireEvent} from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { UserProvider } from './components/UserContext';

describe('renders learn react link', () => {
  it('play', async () => {
    var showLogin = false;
    const setShowLogin = newState => {
      showLogin = newState;
    };

    render(<UserProvider>
      <Router>
        <App setShowLogin={setShowLogin} showLogin={showLogin}/>
      </Router>
    </UserProvider>);
  
    const button = screen.getByText("¿No tienes cuenta? Registrate aquí.");
    expect(button).toBeInTheDocument();
  
    await act(async() => {
      fireEvent.click(button);
    });
  
     expect(showLogin).toBe(false);
  }); 
});
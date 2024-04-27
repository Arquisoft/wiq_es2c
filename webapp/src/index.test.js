import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { UserProvider } from './components/UserContext'; 
import i18next from './translations/i18n'; 
import NavigationBar from './components/fragments/NavigationBar';
import Footer from './components/fragments/Footer';
import PantallaInicio from './components/PantallaInicio';
import PantallaInicioAdmin from './components/PantallaInicioAdmin';
import Login from './components/Login';
import AddUser from './components/AddUser';
import App from './App';
import Game from './components/Game';
import EndGame from './components/EndGame';
import Gamehistory from './components/Gamehistory';
import Perfil from './components/Perfil';
import AllUsers from './components/AllUsers';
import AllQuestions from './components/AllQuestions';
import Ranking from './components/Ranking';
import GameConfiguration from './components/GameConfiguration';
  
describe('Root component', () => {
it('renders all routes correctly', () => {
    render(
    <Router>
        <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <UserProvider>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/PantallaInicio" element={<PantallaInicio />} />
                <Route path="/PantallaInicioAdmin" element={<PantallaInicioAdmin />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/AddUser" element={<AddUser />} />
                <Route path="/App" element={<App />} />
                <Route path="/Game" element={<Game />} />
                <Route path="/EndGame" element={<EndGame />} />
                <Route path="/Gamehistory" element={<Gamehistory />} />
                <Route path="/Perfil" element={<Perfil />} />
                <Route path="/AllUsers" element={<AllUsers />} />
                <Route path="/AllQuestions" element={<AllQuestions />} />
                <Route path="/Ranking" element={<Ranking />} />
                <Route path="/GameConfiguration" element={<GameConfiguration />} />
            </Routes>
            <Footer />
            </UserProvider>
        </I18nextProvider>
        </React.StrictMode>
    </Router>
    );
  });
});

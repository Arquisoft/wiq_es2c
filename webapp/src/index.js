import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NavigationBar from './components/fragments/NavigationBar';
import NavigationBar_Game from './components/fragments/NavigationBar_Game';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './components/UserContext';

import {
  Route,
  Routes,
  MemoryRouter as Router,
} from "react-router-dom";

import PantallaInicio from './components/PantallaInicio';
import PantallaInicioAdmin from './components/PantallaInicioAdmin';
import Login from './components/Login';
import AddUser from './components/AddUser';
import Game from './components/Game';
import Gamehistory from './components/Gamehistory';
import Perfil from './components/Perfil';
import AllUsers from './components/AllUsers';
import AllQuestions from './components/AllQuestions';
import Ranking from './components/Ranking';
import GameConfiguration from './components/GameConfiguration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <NavigationBar />
        <NavigationBar_Game/>
        <Routes>
          <Route path="/" element={<App/>}></Route>
          <Route path="/PantallaInicio" element={<PantallaInicio/>}></Route>
          <Route path="/PantallaInicioAdmin" element={<PantallaInicioAdmin/>}></Route>
          <Route path="/Login" element={<Login />} /> 
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/App" element={<App />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/Gamehistory" element={<Gamehistory />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/AllUsers" element={<AllUsers />} />
          <Route path="/AllQuestions" element={<AllQuestions />} />
          <Route path="/Ranking" element={<Ranking />} />
          <Route path="/GameConfiguration" element={<GameConfiguration />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

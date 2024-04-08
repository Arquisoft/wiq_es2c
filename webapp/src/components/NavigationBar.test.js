import React from 'react';
import { render} from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import { UserProvider } from './UserContext';
import NavigationBar from './NavigationBar';

describe('Navigation bar component', () => {
  it('muestra la barra de navegacion correctamente', async () => {
    render(<UserProvider>
      <Router>
        <NavigationBar />
      </Router>
    </UserProvider>);
  });
});
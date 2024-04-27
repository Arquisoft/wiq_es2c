import React from 'react';
import { render, screen} from '@testing-library/react';
import Footer from './Footer';

describe('Navigation bar component', () => {
  it('muestra la barra de navegacion correctamente', async () => {
    render(<Footer />);

    const footer= screen.getByText(/© 2024 ASW - WIQ_ES2C/);
    expect(footer).toBeInTheDocument();
  });
});
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom'; 
import LoginForm from '../components/login-view/log-in-view';
import { login } from '../services/tokenRepository';  // Importa la función 'login'

jest.mock('../services/tokenRepository', () => ({
  login: jest.fn(),  // Asegúrate de que el nombre sea el mismo que en tu módulo
}));

describe('LoginForm', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
  });

  it('should handle a successful login', async () => {
    // Configura la respuesta simulada para la función login
    const mockResponse = {
      accessToken: 'fakeAccessToken',
      user: { role: 'userRole' },
    };

    (login as jest.Mock).mockResolvedValueOnce(mockResponse);  // Usa el nombre correcto

    const emailInput = screen.getByPlaceholderText('ENTER EMAIL');
    const passwordInput = screen.getByPlaceholderText('ENTER PASSWORD');
    const loginButton = screen.getByText('LOGIN');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    fireEvent.click(loginButton);

    await waitFor(() => {
      // Expect your assertions for a successful login here
    });
  });

  it('should handle a login error', async () => {
    // Configura la respuesta simulada para la función login
    (login as jest.Mock).mockRejectedValueOnce(new Error('Ha ocurrido un error en la petición'));  // Usa el nombre correcto

    const emailInput = screen.getByPlaceholderText('ENTER EMAIL');
    const passwordInput = screen.getByPlaceholderText('ENTER PASSWORD');
    const loginButton = screen.getByText('LOGIN');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    fireEvent.click(loginButton);

    await waitFor(() => {
      // Expect your assertions for a login error here
    });
  });
});

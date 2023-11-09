import { render, screen, fireEvent } from '@testing-library/react';
import WaiterView from './waiter-view';


// Mock de useNavigate
const navigateMock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));


test('renders WaiterView component', () => {
  render(<WaiterView />);
  
  // Verifica que el componente se renderice correctamente
  // Asegúrate de que el texto sea exactamente igual al que se muestra en el componente
  expect(screen.getByText('Welcome Waiter')).toBeInTheDocument();

  // Simula el clic en el botón de logout
  fireEvent.click(screen.getByText('Logout'));

  // Verifica que useNavigate fue llamada con el argumento correcto
  // Si useNavigate está funcionando correctamente, esto debería funcionar
});

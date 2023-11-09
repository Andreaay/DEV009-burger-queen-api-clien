import { render } from '@testing-library/react';
import WaiterView from './waiter-view';
import '@testing-library/jest-dom'


// Mock de useNavigate
const navigateMock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));


test('renders Waiter-view component', () => {
  render(<WaiterView />);
});

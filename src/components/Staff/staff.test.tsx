import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Staff from './staff';
import { BrowserRouter } from 'react-router-dom';

interface User {
  email: string;
  role: string;
  id: string;
  password: string;
  name: string;
}

const navigateMock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

describe('Staff Component', () => {
  let mockUsersF: User[];

  beforeAll(() => {
    mockUsersF = [
      {
        id: '1',
        email: 'waiter@burgerqueen.com',
        role: 'waiter',
        password: '123456',
        name: 'Paola'
      },
      {
        id: '2',
        email: 'cook@burgerqueen.com',
        role: 'cook',
        password: '123456',
        name: 'Andrea'
      },
    ];

    const mockFetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUsersF),
    });

    // Crear un objeto global y agregar la función fetch
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should display a list of the staff', async () => {
    render(
      <BrowserRouter>
        <Staff />
      </BrowserRouter>
    );

    await waitFor(() => {
      mockUsersF.forEach((user) => {
        expect(screen.getByText(user.name)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
        expect(screen.getByText(user.role)).toBeInTheDocument();
      });
    });
  });

  test('should edit the staff', async () => {
    render(<Staff />);
    
    await waitFor(() => {
      const editButtons = screen.getAllByText('Edit');
      fireEvent.click(editButtons[0]);
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Role')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('id')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('name')).toBeInTheDocument();
    });
  });
});



  
//   test('should remove a product', async () => {
//     render(<ProductTableAdmi />);
  
//     const mockFetch = jest.fn();
//     global.fetch = mockFetch;
//     mockFetch.mockResolvedValueOnce({
//       ok: true,
//     });

//     await waitFor(() => {
//       expect(screen.queryByText('Deleted Product')).toBeNull();
//     });
//   });

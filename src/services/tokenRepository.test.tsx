import login  from '../components/login-view/log-in-view';
import fetchMock from 'jest-fetch-mock';

// Configura fetchMock
fetchMock.enableMocks();

describe('login function', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('should make a POST request with correct data', async () => {
    // Configura el mock de fetch para responder con un JSON y un estado 200
    fetchMock.mockResponseOnce(JSON.stringify({ 
      accessToken: 'fakeAccessToken',
      user: { role: 'userRole' } 
    }), { status: 200 });

    const email = 'test@example.com';
    const password = 'password123';

  

    // Verifica que la llamada a la API se haya hecho correctamente
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // Verifica que la función devuelve la data esperada
    expect(localStorage.getItem('accessToken')).toEqual('fakeAccessToken');
    expect(localStorage.getItem('userRole')).toEqual('userRole');
  });

  test('should throw an error for non-200 status', async () => {
    // Configura el mock de fetch para responder con un estado no 200
    fetchMock.mockResponseOnce('', { status: 500 });
  
    const email = 'test@example.com';
    const password = 'password123';
  
    // Verifica que la función lanza un error
    await expect(() => login(email, password)).rejects.toThrow('Ha ocurrido un error en la petición');
  });
  
  
});

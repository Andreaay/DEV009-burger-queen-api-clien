import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductTableAdmi from './Product-table-admi';
import '@testing-library/jest-dom';

interface Product {
  id: number;
  name: string;
  price: string;
  type: string;
  image: string;
}

describe('ProductTableAdmi Component', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should display a list of products', async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'juice',
        price: '10',
        type: 'Breakfast',
        image: 'juice.jpg',
      },
      {
        id: 2,
        name: 'coffee',
        price: '15',
        type: 'Lunch',
        image: 'coffee.jpg',
      },
    ];

    const mockFetch = jest.fn();
    global.fetch = mockFetch;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    render(<ProductTableAdmi />);

    await waitFor(() => {
      mockProducts.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
        expect(screen.getByText(product.type)).toBeInTheDocument();
        expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
      });
    });
  });

  test('should display a list of products', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'juice',
        price: '10',
        type: 'Breakfast',
        image: 'juice.jpg',
      },
      {
        id: 2,
        name: 'coffee',
        price: '15',
        type: 'Lunch',
        image: 'coffee.jpg',
      },
    ];
  
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockProducts),
    };
  
    global.fetch = jest.fn().mockResolvedValue(mockResponse);
  
    render(<ProductTableAdmi />);
  
    await waitFor(() => {
      mockProducts.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
        expect(screen.getByText(product.type)).toBeInTheDocument();
        expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
      });
    });
  });

  test('should edit a product', async () => {
    render(<ProductTableAdmi />);
    const mockFetch = jest.fn();
    global.fetch = mockFetch;
    mockFetch.mockResolvedValueOnce({
      ok: true,
    });
      await waitFor(() => {
      const editButtons = screen.getAllByText('Edit');
      fireEvent.click(editButtons[0]);
    });
  
    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument(); 
      expect(screen.getByLabelText('Type')).toBeInTheDocument();
      expect(screen.getByLabelText('Price')).toBeInTheDocument();
      expect(screen.getByLabelText('Image URL')).toBeInTheDocument();
    });  
  });
  
  test('should remove a product', async () => {
    render(<ProductTableAdmi />);
  
    const mockFetch = jest.fn();
    global.fetch = mockFetch;
    mockFetch.mockResolvedValueOnce({
      ok: true,
    });

    await waitFor(() => {
      expect(screen.queryByText('Deleted Product')).toBeNull();
    });
  });
});

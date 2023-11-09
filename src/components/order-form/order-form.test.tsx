import OrderForm from './order-form';
import { render, fireEvent, screen } from '@testing-library/react';
// import  OrderFormProps from './order-form';

describe('OrderForm Component', () => {
  const selectedProducts = [
    { product: { id: 1, name: 'Product 1', price: 10, type: 'Type 1', image: 'image1.jpg' }, qty: 2 },
    { product: { id: 2, name: 'Product 2', price: 15, type: 'Type 2', image: 'image2.jpg' }, qty: 3 },
  ];

  const onRemoveProduct = jest.fn();

  it('should render OrderForm with selected products', () => {
    render(
      <OrderForm
        id="1"
        client="Paola"
        selectedProducts={selectedProducts}
        onRemoveProduct={onRemoveProduct}
        updateProductQty={() => {}}
      />
    );

    expect(screen.getByText('Selected Products:')).toBeInTheDocument();
    selectedProducts.forEach((product) => {
      expect(screen.getByText(`${product.product.name} (${product.qty})`)).toBeInTheDocument();
    });

    const sendOrderButton = screen.getByText('Send Order');
    fireEvent.click(sendOrderButton);

  });

  // it('should trigger onRemoveProduct when removing a product', () => {
  //   render(
  //     <OrderForm
  //       id="1"
  //       client="Paola"
  //       selectedProducts={selectedProducts}
  //       onRemoveProduct={onRemoveProduct}
  //       updateProductQty={() => {}}
  //     />
  //   );

  //   const removeButton = screen.getAllByText('Remove')[0];

  //   fireEvent.click(removeButton);

  //   expect(onRemoveProduct).toHaveBeenCalledWith(selectedProducts[0].product);
  // });

  // it('handles the POST request correctly', async () => {
  //   const mockResponse = { ok: true };
  //   global.fetch = jest.fn().mockResolvedValueOnce({
  //     json: async () => mockResponse,
  //   });
  
  //   const setTable = jest.fn();
  //   const setClientName = jest.fn();
  
  //   const orderFormProps: OrderFormProps = {
  //     id: "1",
  //     client: "Andre",
  //     selectedProducts: selectedProducts,
  //     onRemoveProduct: onRemoveProduct,
  //     updateProductQty: () => {} // Asegúrate de proporcionar una función válida aquí
  //   };

  //   render(<OrderForm {...orderFormProps} />);
  
  //   // Llamar a la función que estamos probando
  //   await OrderFormProps.handlePostRequest(setTable, setClientName);
  
  //   // Verificar que se llame a fetch con los argumentos correctos
  //   expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/orders', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: "Bearer " + localStorage.getItem("accessToken"),
  //     },
  //     body: expect.any(String), // Puedes verificar que el body sea una cadena si es necesario
  //   });
  
  //   // Verificar si las funciones de estado fueron llamadas correctamente
  //   expect(setTable).toHaveBeenCalledWith('1');
  //   expect(setClientName).toHaveBeenCalledWith("Andre");
  // });
});
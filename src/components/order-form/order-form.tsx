import React from 'react';
import { useState } from 'react';
import './order-form.css';
import { SelectedProduct } from '../menu/menu';


interface Product {
    id: number;
    name: string;
    price: number;
    type: string;
    image: string;
}

interface OrderFormProps {
    id: string;
    client: string;
    selectedProducts: SelectedProduct[];
    onRemoveProduct: (product: Product) => void;
    updateProductQty: (productId: number, newQty: number) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ client, selectedProducts, onRemoveProduct }) => {
    const orderTotal = selectedProducts?.reduce((total, product) => total + product.product.price * product.qty, 0) || 0;
    const [table, setTable] = useState("1");
    const [clientName, setClientName] = useState(client);
    

    const peticionPost = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // Obtener la fecha y hora actual
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

        try {
            const response = await fetch("http://localhost:8080/orders", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: "Bearer " + localStorage.getItem("accessToken")
                },
                body: JSON.stringify({
                    client: clientName,
                    table: table,
                    products: selectedProducts,
                    dateEntry: formattedDate, // Agrega la fecha actual
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Restablecer los valores del formulario y la selección de productos
            setTable("1");
            setClientName(client);
            onRemoveAllProducts(); // Esta función debería eliminar todos los productos seleccionados
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const onRemoveAllProducts = () => {
        // Implementa la lógica para eliminar todos los productos seleccionados.
        // Puedes usar un bucle para llamar a `onRemoveProduct` para cada producto seleccionado.
        selectedProducts.forEach((product) => {
            onRemoveProduct(product.product);
        });
       
    };

    return (
        <>
            <form className="formfororder">
                <h2>Your order for </h2>
                <label htmlFor="table">Table:</label>
                <select
                    id="table"
                    className="inputfororder"
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                >
                    <option value="1"> 1</option>
                    <option value="2"> 2</option>
                    <option value="3"> 3</option>
                    <option value="4"> 4</option>
                    <option value="5"> 5</option>
                </select>

                {/* Utilizamos clientName para el campo de entrada */}
                <input
                    id="clientName"
                    type="text"
                    value={clientName}
                    placeholder="Client Name"
                    onChange={(e) => setClientName(e.target.value)}
                />

                <h3>Selected Products:</h3>
                <table className="choose">
                    <thead></thead>
                    <tbody>
                        {selectedProducts?.map((product) => (
                            <tr key={product.product.id}>
                                <td>{product.product.name} ({product.qty})</td>
                                <td>${product.product.price}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => onRemoveProduct(product.product)}
                                    >
                                        <i className="fa fa-times"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="btn btn-sendorder" onClick={peticionPost}>
                    Send Order
                </button>

                <p className="total">Total: ${orderTotal}</p>
            </form>
        </>
    );
};

export default OrderForm;

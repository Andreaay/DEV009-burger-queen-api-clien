import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import "./product-table-admi.css"

interface Product {
  id: number;
  name: string;
  price: string;
  type: string;
  image: string;
}

const ProductTableAdmi: React.FC = () => {
  const [productsAdmi, setProductsAdmi] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>();
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: '',
    price: '',
    type: 'Breakfast',
    image: '',
  });

  useEffect(() => {
    // Realiza una solicitud GET para obtener la lista de productos
    fetch('http://localhost:8080/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data: Product[]) => {
      setProductsAdmi(data);
    })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddProduct = async () => {
    try {
      // Realiza una solicitud POST para agregar un nuevo producto
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const data = await response.json();
        setProductsAdmi([...productsAdmi, data]);
        setShowAddModal(false);
        setNewProduct({
          id: 0,
          name: '',
          price: '',
          type: 'Breakfast',
          image: '',
        });
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditProduct = async () => {
    if (editedProduct) {
      try {
        // Realiza una solicitud PUT para editar el producto
        const response = await fetch(`http://localhost:8080/products/${editedProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
          body: JSON.stringify({
            id: editedProduct.id,
            name: editedProduct.name,
            type: editedProduct.type,
            price: editedProduct.price,
            image: editedProduct.image,
          }),
        });
  
        if (response.ok) {
          setProductsAdmi((prevProducts) =>
            prevProducts.map((product) =>
              product.id === editedProduct.id ? editedProduct : product
            )
          );
          setEditedProduct(null);
          setShowEditModal(false);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  

  const handleRemoveProduct = (id: number) => {
    try {
      // Realiza una solicitud DELETE para eliminar el producto
      fetch(`http://localhost:8080/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      })
        .then((response) => {
          if (response.ok) {
            setProductsAdmi((prevProducts) =>
              prevProducts.filter((product) => product.id !== id)
            );
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddButtonClick = () => {
    setShowAddModal(true);
  };

  const handleEditButtonClick = (product: Product) => {
    setShowEditModal(true);
    setEditedProduct(product);
  };

  return (
    <div className="staff-view">
      <table className="table custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productsAdmi.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>${product.price}</td>
              <td>
                <img className="product-image" src={product.image} alt={product.name} />
              </td>
              <td>
                <button className="edit-button" onClick={() => handleEditButtonClick(product)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleRemoveProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button className="ButtonAddProduct" onClick={handleAddButtonClick}>
        Add Product
      </Button>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                value={newProduct.type}
                onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder="Enter price"
              />
            </Form.Group>

            <Form.Group controlId="formBasicImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                placeholder="Enter image URL"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editedProduct?.name || ''}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct!, name: e.target.value})
                }
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                value={editedProduct?.type || 'Breakfast'}
                onChange={() =>
                  setEditedProduct({ ...editedProduct! })
                }
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editedProduct?.price || ''}
                onChange={() =>
                  setEditedProduct({ ...editedProduct!})
                }
                placeholder="Enter price"
              />
            </Form.Group>

            <Form.Group controlId="formBasicImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={editedProduct?.image || ''}
                onChange={() =>
                  setEditedProduct({ ...editedProduct!})
                }
                placeholder="Enter image URL"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductTableAdmi;

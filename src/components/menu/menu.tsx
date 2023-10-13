import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import OrderForm from "../order-form/order-form";
import ProductList from "../product-list/product-list";
import UserProfile from "../user-profile/userprofile";
import "./menu.css"

const Menu = ({ }) => {
  const [client, setClient] = useState("Kvn");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken")
      },
    })
      .then(response => response.json())
      .then((data) => {
        const products = data.products;
        setProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [])
  const handleBackClick = () => {
    navigate(-1);
  };
  const handleLogoutClick = () => {
    setAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <UserProfile
        profileType="waiter"
        waiterName=""
        onBackClick={handleBackClick}
        onLogoutClick={handleLogoutClick} administratorName={""} cookName={""} />
      <div className="menu-container">
        <div className="food-buttons-container">
          <button className="breakfast">Breakfast</button>
          <button className="lunch">Lunch</button>
        </div>
        <div>
          <ProductList editable={false} products={products} />
        </div>
        <div>
          Creating order:
          <OrderForm client={client} />
        </div>
      </div>

    </>
  );
};

export default Menu;

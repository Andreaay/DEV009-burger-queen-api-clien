import { Products } from "../../models/products-model.d";


const ProductList = ({ products }: { products: Products[] }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No products available.</p>;
  }
  
    return (
      <ul>
        Choose one:
        {
        products.map((product, index) => ( <li key={index}>{product.name}</li>)) //renderiza una lista de productos (index = desde el inicio)
        }
      </ul>
    );
  };
  
  export default ProductList;
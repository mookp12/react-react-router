import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ViewProductPage() {
  const navigate = useNavigate();
  const param = useParams();

  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    const response = await axios.get(`http://localhost:4001/products/${param.productId}`);
    setProduct(response.data.data);
    console.log(response);
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <h1>View Product Page</h1>
      <div className="view-product-container">
        <h2>Product Title: {product.name}</h2>
        <p>Content: {product.description}</p>
      </div>
      <button onClick={()=>{
        navigate("/");
      }}>Back to Home</button>
    </div>
  );
}

export default ViewProductPage;

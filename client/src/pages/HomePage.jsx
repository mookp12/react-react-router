import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate()
  const params = useParams()

  const getProducts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.get("http://localhost:4001/products/");
      setProducts(results.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsError(true);
    }
  };

  
  useEffect(() => {
    getProducts();
  }, []);



  async function handleDelete(id){
    try{
      await axios.delete(`http://localhost:4001/products/${id}`)
      getProducts()
    }catch(err){
      console.error(err);    
    }
  }


  return (
    <div>
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
        <button onClick={()=>navigate('product/create')}>Create Product</button>
      </div>
      <div className="product-list">
        {products.map((product) => {
          return (
            <div key={product.id} className="product">
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="250"
                  height="250"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name} </h1>
                <h2>Product price: {product.price}</h2>
                <p>Product description: {product.description} </p>
                <div className="product-actions">
                  <button onClick={()=>navigate(`product/view/${product.id}`)} className="view-button">View</button>
                  <button onClick={()=>navigate(`product/edit/${product.id}`)}className="edit-button">Edit</button>
                </div>
              </div>

              <button onClick={()=>handleDelete(product.id)} className="delete-button">x</button>
            </div>
          );
        })}
      </div>
      {isError ? <h1>Request failed</h1> : null}
      {isLoading ? <h1>Loading ....</h1> : null}
    </div>
  );
}

export default HomePage;

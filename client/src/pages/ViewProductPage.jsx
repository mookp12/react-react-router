import { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";


function ViewProductPage() {

  const [product, setProduct] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const params = useParams();
  const navigate = useNavigate()

  useEffect(()=>{
    async function getData(){
      try {
        setIsError(false);
        setIsLoading(true);
        const results = await axios.get(`http://localhost:4001/products/${params.id}`);
        setProduct(results.data.data);  
        setIsLoading(false);    
        
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    }
    getData()
  },[params.id])

  

  return (
    <div>
      <h1>View Product Page</h1>
      <div className="view-product-container">
        <h2>Name : {product.name}</h2>
        <p>{product.price} THB</p>
        <p>{product.description}</p>
      </div>
      <button  onClick={()=>navigate("/")}>Back to Home</button>
      {isError ? <h1>Request failed</h1> : null}
      {isLoading ? <h1>Loading ....</h1> : null}
    </div>
  );
}

export default ViewProductPage;

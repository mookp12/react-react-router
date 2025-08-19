import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

function EditProductForm() {

  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: 0,
    description: ""
  });

  const params = useParams();
  const navigate = useNavigate()

  useEffect(()=>{
    async function getData(){
      try {
        const results = await axios.get(`http://localhost:4001/products/${params.id}`);
        setProduct(results.data.data);   
        
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    }
    getData()
  },[params.id])


  return (
    <form className="product-form">
      <h1>Edit Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            value={product.name}
            placeholder={"Enter name here"}
            onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}

          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            value={product.image}
            placeholder="Enter image url here"
            onChange={(e) => setProduct(prev => ({ ...prev, image: e.target.value }))}

          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            value={product.price}
            placeholder="Enter price here"
            onChange={(e) => setProduct(prev => ({ ...prev, price: e.target.value }))}

          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            value={product.description}
            onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}

            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button onClick={()=>navigate("/")} type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditProductForm;

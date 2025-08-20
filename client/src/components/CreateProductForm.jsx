import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateProductForm() {

  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    description: ""
  });

  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    try{
    await axios.post('http://localhost:4001/products/',product)
    navigate("/")
    }catch(err){
      console.error(err);    
    }
  }

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h1>Create Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            value={product.name}
            type="text"
            placeholder="Enter name here"
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
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default CreateProductForm;

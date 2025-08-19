import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function EditProductForm() {
  const navigate = useNavigate();
  const param = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState("");

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/products/${param.productId}`
      );
      setName(response.data.data.name);
      setImage(response.data.data.image);
      setPrice(response.data.data.price);
      setDescription(response.data.data.description);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();
    if (name && image && price && description) {
      try {
        const response = await axios.put(
          `http://localhost:4001/products/${param.productId}`,
          {
            name: name,
            image: image,
            price: price,
            description: description,
          }
        );

        console.log(response);
        navigate("/");
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <form
      className="product-form"
      key={param.productId}
      onSubmit={updateProduct}
    >
      <h1>Edit Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            placeholder="Enter name here"
            onChange={(e) => {
              setName(e.target.value);
            }}
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
            value={image}
            placeholder="Enter image url here"
            onChange={(e) => {
              setImage(e.target.value);
            }}
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
            value={price}
            placeholder="Enter price here"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
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
            value={description}
            placeholder="Enter description here"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditProductForm;

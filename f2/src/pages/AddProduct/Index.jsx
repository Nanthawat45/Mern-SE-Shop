import React, { useState } from "react";
import Swal from "sweetalert2";
import ProductService from "../../services/product.service";

const Index = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("file", imageFile);
    formData.append("price", product.price);
    formData.append("category", product.category);
    try {
      await ProductService.addProduct(formData);
      Swal.fire({
        icon: "success",
        title: "Product added successfully",
      });
      setProduct({
        name: "",
        description: "",
        image: "",
        price: "",
        category: "",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
      });
    }
  };

  return (
    <div>
      <nav className="bg-gray-100 p-3 rounded mb-4">
        <ol className="list-reset flex text-grey-dark">
          <li>
            <a href="/" className="text-blue-600 hover:text-blue-700">
              Home
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <a href="/dashboard" className="text-blue-600 hover:text-blue-700">
              Dashboard
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>Add Product</li>
        </ol>
      </nav>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">Add Product</h1>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Name:</span>
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Description:</span>
          </label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Image:</span>
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            required
            className="file-input file-input-bordered w-full"
          />
          {imageFile && (
            <div className="mt-4 w-40 h-40 mx-auto">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Price:</span>
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Category:</span>
          </label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Index;

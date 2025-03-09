import React from "react";
import ProductService from "../../services/product.service";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await ProductService.getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure you want to delete this product?",
        showCancelButton: true,
        icon: "warning",
        confirmButtonText: `Delete`,
        cancelButtonText: `Cancel`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await ProductService.deleteProduct(id);
          const newProducts = products.filter((product) => product._id !== id);
          setProducts(newProducts);
          Swal.fire({
            icon: "success",
            title: "Product deleted successfully",
            timer: 1500,
          });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: error.message,
      });
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductService.updateProduct(currentProduct._id, currentProduct);
      const updatedProducts = products.map((product) =>
        product._id === currentProduct._id ? currentProduct : product
      );
      setProducts(updatedProducts);
      Swal.fire({
        icon: "success",
        title: "Product updated successfully",
        timer: 1500,
      });
      handleModalClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: error.message,
      });
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    });
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
          <li>Manage Items</li>
        </ol>
      </nav>
      <h1 className="text-2xl font-semibold mb-4 text-center">Manage Items</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-full"
                />
              </td>
              <td>{product.name}</td>
              <td className="text-wrap">{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/** Pagination */}
      {/* <div className="flex justify-center items-center gap-2 mt-5">
        <button className="btn btn-secondary" onClick={prevPage}>
          Previous
        </button>
        <button className="btn btn-secondary" onClick={nextPage}>
          Next
        </button>
      </div> */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Product</h3>
            <form onSubmit={handleModalSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name:</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleModalChange}
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
                  value={currentProduct.description}
                  onChange={handleModalChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Price:</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleModalChange}
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
                  value={currentProduct.category}
                  onChange={handleModalChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;

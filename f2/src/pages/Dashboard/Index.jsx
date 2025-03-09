import React from "react";

const Index = () => {
  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div className="card w-full md:w-1/2 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://picsum.photos/400"
            alt="Add Product"
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Add a New Product</h2>
          <p>Add a new product to your store.</p>
          <div className="card-actions justify-end">
            <a href="/dashboard/add-product" className="btn btn-primary">
              Add Product
            </a>
          </div>
        </div>
      </div>
      <div className="card w-full md:w-1/2 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://picsum.photos/400"
            alt="Manage Products"
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Manage Products</h2>
          <p>View and manage your existing products.</p>
          <div className="card-actions justify-end">
            <a href="/dashboard/manage-items" className="btn btn-secondary">
              Manage Products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

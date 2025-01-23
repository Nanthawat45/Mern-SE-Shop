import React, { useState } from "react";
const categoryItems = [
  {
    id: 1,
    title: "Clothing",
    number: 86,
    image: "/category/img1.jpg",
  },
  {
    id: 2,
    title: "Accessories",
    number: 12,
    image: "/category/img2.jpg",
  },
  {
    id: 3,
    title: "Gadgets",
    number: 48,
    image: "/category/img3.jpg",
  },
  {
    id: 4,
    title: "Swag",
    number: 25,
    image: "/category/img4.jpg",
  },
];

const Categories = () => {
  const [categories, setCategories] = useState(categoryItems);
  return (
    <div className="section-container py-16 bg-[#1E1E1E]">
      <div className="text-center text-white">
        <p className="subtitle text-gray-400">Customer Favorites</p>
        <h2 className="title text-gray-200">Popular Categories</h2>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-around items-center mt-12">
        {categories.length > 0 &&
          categories.map((item) => {
            return (
              <div
                key={item.id}
                className="shadow-lg rounded-md bg-[#2A2A2A] py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300"
              >
                <div className="w-full mx-auto flex items-center justify-center">
                  <img
                    src={item.image}
                    alt=""
                    className="bg-[#3B82F6] p-2 rounded-full w-28 h-28"
                  />
                </div>
                <div className="mt-5 space-y-1">
                  <h5 className="text-gray-100 font-semibold">{item.title}</h5>
                  <p className="text-gray-400 text-sm">({item.number} items)</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
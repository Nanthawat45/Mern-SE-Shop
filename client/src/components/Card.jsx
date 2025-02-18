import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../context/AuthContext'
import { useContext } from "react";
import useCart from "../hocks/useCart";
import Swal from "sweetalert2";
import Product from "../pages/Home/Poroduct";
import CartService from "../services/cart.sarvices";

const Card = ({ item }) => {
  const { _id, name, image, description, category, price } = item;
const {user}=useContext(AuthContext);
const [cart, refetch]= useCart();
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  const handleAddToCart = async () =>{
    if(!user || !user.email){
    Swal.fire({
      icon:"error",
      title:"Oops...",
      text:"Please login to add to cart"
    });
    return;
  }

  try{
    const cartItem ={
      productId:_id,
      email: user.email,
      quantity:1,
      name,
      price,
      image,
    };
    const response = await CartService.createCartItem(cartItem);
    if(response.status === 200){
      Swal.fire({
        icon:"success",
        title:"Success",
        text:"Item added to cart",
        timer:1500,
        showCloseButton: false,
      });
      refetch();
    }
  }catch(error){
    Swal.fire({
      icon:"error",
      title:"Oops...",
      text:""
    });
    }
  };
  return (
    <div className="card shadow-xl relative mr-5 md:my-5 h-120">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar
        }
      `}
        onClick={handleHeartClick}
      >
        <input
          type="radio"
          name="heart"
          className={`mask mask-heart ${isHeartFilled ? "bg-green-400" : ""} `}
        />
      </div>
      <figure>
        <img
          src={image}
          alt=""
          className="hover:scale-105 transition-all duration-300 md:h-60"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            {price} <span className="text-sm text-red">฿</span>
          </h5>
          <button className="btn bg-red text-white"
          onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;

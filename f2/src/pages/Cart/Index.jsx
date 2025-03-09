import React, { useContext } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import CartService from "../../services/cart.service";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import PaymentButton from "../../components/PaymentButton";

const Index = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };
  const handleClearCart = async () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure to clear your shopping cart?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      showConfirmButton: true,
      confirmButtonText: "Yes, clear it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.clearCart(user?.email);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Shopping Cart Cleared!",
              text: response.message,
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };
  const handleDeleteItem = async (cartItem) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      showConfirmButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.deleteCartItem(cartItem._id);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: response.message,
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };
  const handleIncrease = async (cartItem) => {
    if (cartItem.quantity + 1 <= 10) {
      try {
        // const data = { quantity: cartItem.quantity + 1 };
        const response = await CartService.updateCartItem(cartItem._id, {
          quantity: cartItem.quantity + 1,
        });
        if (response.status === 200) {
          refetch();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "You reach maximum buy limit!",
        showConfirmButton: true,
      });
    }
  };
  const handleDecrease = async (cartItem) => {
    if (cartItem.quantity > 1) {
      //decrease
      try {
        // const data = { quantity: cartItem.quantity + 1 };
        const response = await CartService.updateCartItem(cartItem._id, {
          quantity: cartItem.quantity - 1,
        });
        if (response.status === 200) {
          refetch();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    } else {
      //qty=1
      //delete
      Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        showConfirmButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await CartService.deleteCartItem(cartItem._id);
            if (response.status === 200) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: response.message,
                timer: 1500,
                showConfirmButton: false,
              });
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
            });
          }
        }
      });
    }
  };

  const totalPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  return (
    <div>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
          <div className="py-28 flex flex-col items-center justify-center">
            <div className="text-center px-4 space-y-7">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                Items Added to The <span className="text-red">Cart</span>
              </h2>
            </div>
          </div>
        </div>
        {cart.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-red text-white rounded-sm text-center">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price Per Unit</th>
                  <th>Price</th>
                  <th>
                    <button
                      className="btn btn-outline btn-error"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {cart.length > 0 &&
                  cart.map((cartItem, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {" "}
                            <img
                              src={cartItem.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold">{cartItem.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="space-x-6 text-center">
                          <button
                            className="btn btn-xs mr-6"
                            onClick={() => handleDecrease(cartItem)}
                          >
                            -
                          </button>
                          {cartItem.quantity}
                          <button
                            className="btn btn-xs mr-2"
                            onClick={() => handleIncrease(cartItem)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-center">
                        {formatPrice(cartItem.price)}
                      </td>
                      <td className="text-center">
                        {formatPrice(cartItem.quantity * cartItem.price)}
                      </td>
                      <td className="text-center">
                        <button onClick={() => handleDeleteItem(cartItem)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr className="bg-red text-white rounded-sm text-center">
                  <th>#</th>
                  <th>Product</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price Per Unit</th>
                  <th>Price</th>
                  <th>
                    <button className="btn btn-outline btn-error">
                      Clear Cart
                    </button>
                  </th>
                </tr>
              </tfoot>
            </table>
            <hr />
            <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <p>Name: {user?.displayName}</p>
                <p>Email: {user?.email}</p>
                <p>User Id: {user?.uid}</p>
              </div>
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Shopping Details</h3>
                <p>Total Products: {cart.length} items</p>
                <p>Total Price: {formatPrice(totalPrice(cart))}</p>
                <PaymentButton cartItems={cart} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-2xl font-bold text-center text-red mb-4">
              Shopping cart is Empty!
            </div>
            <button
              className="btn btn-primary"
              onClick={() => (window.location.href = "/shop")}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

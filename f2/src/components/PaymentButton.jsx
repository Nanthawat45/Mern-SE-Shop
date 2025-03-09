import stripsService from "../services/stripe.service";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const PaymentButton = ({ cartItems }) => {
  const { user } = useContext(AuthContext);
  const handleCheckOut = () => {
    stripsService
      .createCheckOutSession({
        cart: cartItems,
        email: user.email,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <button
        className="btn btn-md bg-red text-white px-8 py-1"
        onClick={() => handleCheckOut()}
      >
        Proceed to checkout
      </button>
    </>
  );
};

export default PaymentButton;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  checkoutCart,
} from "../ReduxSlices/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleCheckout = () => {
    dispatch(checkoutCart());
    navigate("/checkout");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return (
      <p className="text-2xl font-bold text-center">Your cart is empty!</p>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <ul className="w-full lg:w-2/3 space-y-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between border-b py-4"
            >
              {/* Product Info */}
              <div className=" w-full flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="text-center sm:text-left">
                    <h2 className="font-bold">{item.title}</h2>
                    <p>${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 "
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 h-48 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <p className="mb-2">Items: {cart.length}</p>
          <p className="mb-2">Total Price: ${totalPrice.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 "
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

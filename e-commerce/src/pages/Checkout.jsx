import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const orderedItems = useSelector((state) => state.cart.orderedItems);
  const navigate = useNavigate();

  const totalPrice = orderedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="mb-2">Thank you for shopping with us!</p>
      <div className="border rounded-md p-4 mb-4">
        <h2 className="text-xl font-bold">Order Details</h2>
        <ul className="mt-4">
          {orderedItems.map((item) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <h3 className="text-lg font-bold mt-4">
          Total: ${totalPrice.toFixed(2)}
        </h3>
      </div>
      {/* Continue Shopping Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 block mx-auto text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default CheckoutPage;

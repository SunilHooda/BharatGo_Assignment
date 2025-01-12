import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">E-commerce</h1>
      <nav className="flex justify-between items-center">
        <Link to="/" className="mr-4">
          Home
        </Link>
        <div className="relative py-2 ">
          <Link className="p-2 text-white rounded-full" to="/cart">
            Cart
          </Link>
          <span className="absolute top-0 right-[-7px] bg-red-500 text-white text-xs w-[18px] h-[18px] flex items-center justify-center rounded-full">
            {cartItems.length}
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;

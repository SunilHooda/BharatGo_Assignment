import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../ReduxSlices/cart/cartSlice";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [userDetail, setUserDetail] = useState(null);

  const imageUrl = product.images[0] || "https://via.placeholder.com/150";

  const isProductInCart = cart.some((item) => item.id === product.id);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      setUserDetail(user);
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAddToCart = () => {
    if (!userDetail) {
      toast.info("Please log in to add products to your cart!", {
        position: "top-right",
      });

      return;
    }

    if (!isProductInCart) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="border rounded-md p-4 relative">
      <img
        src={imageUrl}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-lg font-bold mt-2">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={handleAddToCart}
        disabled={isProductInCart}
        className={`absolute top-2 right-2 ${
          isProductInCart ? "bg-gray-400" : "bg-green-600"
        } text-white text-4xl pb-2 px-2 rounded-full`}
      >
        +
      </button>

      <Link
        to={`/productDetails/${product.id}`}
        className="text-blue-600 underline mt-2 block"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;

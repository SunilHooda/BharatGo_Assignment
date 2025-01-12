import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../ReduxSlices/cart/cartSlice";
import { fetchProductDetails } from "../apiCalls/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const isInCart = cart.some((item) => item.id === parseInt(id));

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await fetchProductDetails(id);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    getProductDetails();
  }, [id]);

  if (loading)
    return (
      <p className="text-2xl font-bold text-center">
        Loading product details...
      </p>
    );

  return (
    <div className="p-4">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full lg:w-[450px] h-[311px] object-cover rounded-md"
      />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-600 mt-2">${product.price}</p>
      <p className="mt-4">{product.description}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className={`py-2 px-4 rounded-md mt-4 ${
          isInCart
            ? "bg-gray-400 text-gray-800 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        disabled={isInCart}
      >
        {isInCart ? "Already in Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductDetails;
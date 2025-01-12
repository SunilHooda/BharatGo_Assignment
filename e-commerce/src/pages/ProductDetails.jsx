import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../ReduxSlices/cart/cartSlice";
import { fetchProductDetails } from "../apiCalls/api";
import { auth } from "../components/firebase";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const isProductInCart = cart.some((item) => item.id === parseInt(id));

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      setUserDetail(user);
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
        onClick={handleAddToCart}
        className={`py-2 px-4 rounded-md mt-4 ${
          isProductInCart
            ? "bg-gray-400 text-gray-800 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        disabled={isProductInCart}
      >
        {isProductInCart ? "Already in Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductDetails;

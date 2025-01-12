import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../ReduxSlices/cart/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="text-xl font-bold">Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className="border p-2 my-2">
          <h2>{item.title}</h2>
          <button
            onClick={() => dispatch(removeFromCart(item))}
            className="text-red-600"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;

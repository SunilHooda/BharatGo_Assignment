import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/Checkout";
//import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <ToastContainer></ToastContainer>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

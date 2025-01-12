import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "./firebase";
import { FaUserCheck } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";

const Header = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      setUserDetail(user);
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Logout function
  const handleLogout = () => {
    auth.signOut().then(() => {
      setUserDetail(null);
      setIsDropdownOpen(!isDropdownOpen);
    });
  };

  return (
    <header className="bg-blue-600 text-white p-5 py-1 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        E-commerce
      </Link>
      <nav className="flex justify-between items-center gap-3">
        {userDetail ? (
          <div className="flex justify-between items-center gap-4 relative">
            <FaUserCheck
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            {/* Dropdown menu for user details */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg p-3 z-20">
                <div className="mb-2">
                  <p className="font-semibold">{userDetail.displayName}</p>
                  <p className="text-sm text-gray-600">{userDetail.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 mt-2"
                >
                  Log Out
                </button>
              </div>
            )}

            <div className="relative">
              <Link className="p-1 text-white rounded-full" to="/cart">
                <FaCartArrowDown className="w-6 h-6" />
              </Link>
              <span className="absolute top-3 right-[-10px] bg-red-500 text-white text-xs w-[18px] h-[18px] flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            </div>
          </div>
        ) : (
          <Link to="/login" className="p-4 text-lg">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

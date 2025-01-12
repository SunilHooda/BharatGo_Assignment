import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../ReduxSlices/products/productsSlice";
import ProductList from "../components/ProductList";

const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        page: currentPage,
        limit: productsPerPage,
        category,
        sort: sortOrder,
      })
    );
  }, [dispatch, currentPage, category, sortOrder]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  if (status === "loading")
    return <p className="text-2xl font-bold text-center">Loading...</p>;
  if (status === "failed")
    return (
      <p className="text-2xl font-bold text-center">Failed to load products.</p>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold">Products</h1>

      {/* Filter and Sort */}
      <div className="flex gap-4 mb-4">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border rounded px-4 py-2 cursor-pointer "
        >
          <option value="">All Categories</option>
          <option value="1">Clothes</option>
          <option value="2">Electronics</option>
          <option value="3">Furniture</option>
        </select>

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border rounded px-4 py-2 cursor-pointer "
        >
          <option value="">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Listing */}
      <ProductList products={items} />

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-600 text-white"
          } rounded-md`}
        >
          Prev
        </button>
        <span className="mx-1 bg-slate-400 px-2 rounded ">{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={items.length < productsPerPage} // Disable if no more products
          className={`px-4 py-2 mx-2 ${
            items.length < productsPerPage
              ? "bg-gray-300"
              : "bg-blue-600 text-white"
          } rounded-md`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;

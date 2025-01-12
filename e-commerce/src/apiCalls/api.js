import axios from "axios";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";

export const fetchProducts = async ({
  page = 1,
  limit = 12,
  category,
  sort,
}) => {
  let url = `${API_BASE_URL}/products?offset=${
    (page - 1) * limit
  }&limit=${limit}`;

  if (category) {
    url += `&categoryId=${category}`;
  }
  if (sort) {
    url += `&order_by=${sort}`;
  }

  const response = await axios.get(url);
  return response;
};

export const fetchCategories = () => axios.get(`${API_BASE_URL}/categories`);

export const fetchProductDetails = (id) =>
  axios.get(`${API_BASE_URL}/products/${id}`);

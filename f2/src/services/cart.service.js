import api from "./api";
const API_URL = "/cart";

const getAllCartItems = async () => {
  return await api.get(`${API_URL}`);
};
const getCartItemsByEmail = async (email) => {
  return await api.get(`${API_URL}/${email}`);
};
const createCartItem = async (data) => {
  return await api.post(`${API_URL}`, data);
};
const updateCartItem = async (id, data) => {
  return await api.put(`${API_URL}/${id}`, data);
};
const deleteCartItem = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};
const clearCart = async (email) => {
  return await api.delete(`${API_URL}/clear/${email}`);
};
const CartService = {
  getAllCartItems,
  getCartItemsByEmail,
  createCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
};

export default CartService;

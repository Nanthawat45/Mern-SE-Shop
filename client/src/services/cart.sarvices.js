import api from "./api";
const API_URL = "/cart";

const getAllCart = async()=>{
    return await api.get(`${API_URL}`);
}
// const usdateCartTtem = async (id, data) =>{
//     return await api.put(`${API_URL}/${id}`, data);
// }
const careateCartItemByEmail = async (email) => {
    return await api.get(`${API_URL}/${email}`);
}
const careateCartItem = async (data) => {
    return await api.get(`${API_URL}`,data);
}
const updateCartItem = async (id, data) => {
    return await api.get(`${API_URL}/${id}`,data);
}
const deleteCartItme = async (id) => {
    return await api.get(`${API_URL}/${id}`);
};
const clearCart = async (email) => {
    return await api.get(`${API_URL}/clear/${email}`);
};

const CartService = {
    getAllCart,
    // usdateCartTtem,
    careateCartItemByEmail,
    careateCartItem,
    updateCartItem,
    deleteCartItme,
    clearCart,
};

export default CartService;
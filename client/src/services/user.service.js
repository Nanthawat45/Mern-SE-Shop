import api from "./api";
const API_URL = "/product";
const signJwt = async (email) => {
return await api.post(`${API_URL}/sign-jwt`, { email });
};
const addUser = async (user) => {
    const
}
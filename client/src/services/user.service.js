import api from "./api";
const API_URL = "/auth"; // แก้ไขให้ตรงกับ endpoint ที่ถูกต้อง

const signJwt = async (email) => {
  return await api.post(`${API_URL}/sign`, { email });
};
const addUser = async (email) => {
  return await api.post(`${API_URL}/add-user`, { email });
};

const getUsers = async () => {
  return await api.get(`${API_URL}/get-users`);
};

const updateUser = async (id, data) => {
  return await api.put(`${API_URL}/${id}`, data);
};

const deleteUser = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const makeAdmin = async (email) => {
  return await api.patch(`${API_URL}/make-admin/${email}`);
};

const makeUser = async (email) => {
  return await api.patch(`${API_URL}/make-user/${email}`);
};

const UserService = {
  signJwt,
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  makeAdmin,
  makeUser,
};

export default UserService;
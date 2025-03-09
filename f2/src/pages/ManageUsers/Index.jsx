import { useContext, useEffect, useState } from "react";
import UserService from "../../services/user.service";
import { FaTrash, FaUser } from "react-icons/fa6";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const Index = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // const fetUsers = async () => {
    //   try {
    //     const response = await UserService.getUsers();
    //     if (response.status === 200) {
    //       setUsers(response.data);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetUsers();
    UserService.getUsers().then((res) => {
      if (res.status === 200) {
        setUsers(res.data);
      }
    });
  }, []);
  const changeRole = (email) => {
    UserService.getRoleByEmail(email).then((res) => {
      const role = res.data.role;
      if (role === "admin") {
        UserService.makeUser(email).then(() => {
          setUsers(
            users.map((user) => {
              if (user.email === email) {
                user.role = "user";
              }
              return user;
            })
          );
        });
      } else {
        UserService.makeAdmin(email).then(() => {
          setUsers(
            users.map((user) => {
              if (user.email === email) {
                user.role = "admin";
              }
              return user;
            })
          );
        });
      }
    });
  };
  return (
    <div className="w-full">
      {/** Breadcrumb */}
      <nav className="bg-gray-100 p-3 rounded mb-4">
        <ol className="list-reset flex text-grey-dark">
          <li>
            <a href="/" className="text-blue-600 hover:text-blue-700">
              Home
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <a href="/dashboard" className="text-blue-600 hover:text-blue-700">
              Dashboard
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>Manage Users</li>
        </ol>
      </nav>
      {/** header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-4 bg-white shadow-md rounded-lg">
        <FaUser />
        <h2 className="text-3xl font-bold mb-2 md:mb-0">Manage Users</h2>
        <div className="flex space-x-2 mr-4">
          <h2 className="text-xl md:text-2xl">Total Users: {users.length}</h2>
        </div>
      </div>
      {/** Table */}
      <div className="flex flex col items-center">
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px] w-screen">
            <thead className="bg-red text-white text-center">
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td className="flex justify-items-center space-x-2 justify-center">
                    <p>User</p>
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      onClick={() => changeRole(user.email)}
                      checked={user.role === "admin"}
                    />
                    <p>Admin</p>
                  </td>
                  <td>
                    <button>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;

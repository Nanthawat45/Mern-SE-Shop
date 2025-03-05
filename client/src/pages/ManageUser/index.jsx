import { useEffect, useState } from "react";
import UserService from "../../services/user.service";

const index = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    //const fetUsers = async () => {
    //  try {
    //    const response = await UserService.getUsers();
    //    if (response.status === 200) {
    //      setUsers(response.data);
    //    }
    //  } catch (error) {
    //    console.log(error);
    //  }
    //};
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
    <div>
      {/**Breadcrumb */}
      <nav className="bg-gray-100 p-3 rounded mb-4"></nav>
      {/**header */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-md rounded-lg"></div>
      {/**Table */}
      <div className="flex col items-center">
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
                <tr key={user.id}>
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

export default index;
import React from 'react';
//import {logo} from"/logo.png";
// import { Outlet } from 'react-router';
// import {MdDashboard}from"react-icons/md";
// import { IoBagCheck} from"react-icons/io5";
// import { IomdAddCircle } from "react-icons/io";
const DashboardLayout = () => {
    const isAdmin = true;

  return (
    <div>
       {isAdmin ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>

          {/* Sidebar */}
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Profile Section */}
              <div className="flex flex-col items-center mb-4">
                <img
                  src="https://i.imgur.com/your-avatar.png"
                  alt="Admin Avatar"
                  className="w-16 h-16 rounded-full"
                />
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full mt-2">
                  Admin
                </span>
              </div>

              {/* Sidebar Menu */}
              <ul>
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <a href="#">Manage Orders</a>
                </li>
                <li>
                  <a href="#">All Users</a>
                </li>
                <li className="mt-4">
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Product</a>
                </li>
                <li>
                  <a href="#">Order Tracking</a>
                </li>
                <li>
                  <a href="#">Customer Support</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 w-full">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <AddProduct /> {/* ใส่ AddProduct ไว้ใน Dashboard */}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen text-xl font-bold">
          You are not an Admin.{" "}
          <a href="/" className="text-blue-500 underline ml-2">
            Back to Home
          </a>
        </div>
      )}

    </div>
  )
}

export default DashboardLayout
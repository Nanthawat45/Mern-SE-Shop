import React, { useContext } from "react";
import logo from "/logo.png";
import { Outlet } from "react-router";
import { MdDashboard } from "react-icons/md";
import { IoBagCheck } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
const DashboardLayout = () => {
  const { user, getUser, logout } = useContext(AuthContext);
  const userInfo = getUser();
  const isAdmin = userInfo?.role === "admin";

  return (
    <div>
      {isAdmin ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center">
            {/* Page content here */}
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-70 p-4 ">
              {/* Sidebar content here */}
              <li>
                <a href="/dashboard" className="flex justify-start mb-3">
                  <img src={logo} className="w-20" />
                  <div className="badge badge-primary">Admin</div>
                </a>
              </li>
              <li>
                <p>Welcome: {user.displayName}</p>
              </li>
              <li>
                <a onClick={() => logout()}>Logout</a>
              </li>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Menu</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a href="/dashboard">
                  <MdDashboard />
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/dashboard/manage-orders">
                  <IoBagCheck />
                  Manage Orders
                </a>
              </li>
              <li>
                <a href="/dashboard/add-product">
                  <IoMdAddCircle />
                  Add Product
                </a>
              </li>
              <li>
                <a href="/dashboard/manage-items">
                  <MdOutlineDashboardCustomize />
                  Manage Items
                </a>
              </li>
              <li>
                <a href="/dashboard/manage-users">
                  <FaUserCircle />
                  All Users
                </a>
              </li>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Hot Link</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a>Products</a>
              </li>
              <li>
                <a>Order Tracking</a>
              </li>
              <li>
                <a>Customer Support</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>You are not an Admin! Back to Home</div>
      )}
    </div>
  );
};

export default DashboardLayout;

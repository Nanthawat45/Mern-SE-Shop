import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/Index";
import Shop from "../pages/Shop/Index";
import Cart from "../pages/Cart/Index";
import SignUp from "../components/SignUp";
import SignIn from "../components/SingIn";
import Setting from "../pages/Setting/Index";
import Profile from "../pages/Profile/Index";
import ProtectPage from "../pages/ProtectPage/Index";
import Dashboard from "../pages/Dashboard/Index";
import AddProduct from "../pages/AddProduct/Index";
import ManageItems from "../pages/ManageItems/Index";
import AdminRoute from "../ProtectedRoutes/AdminRoute";
import ManageUsers from "../pages/ManageUsers/Index";
import CheckOutSuccess from "../pages/CheckOutSuccess/Index";
import ManageOrders from "../pages/ManageOrders/index";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/checkout-success",
        element: <CheckOutSuccess />,
      },
      {
        path: "/cart",
        element: (
          <ProtectPage>
            <Cart />
          </ProtectPage>
        ),
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/update-profile",
        element: (
          <ProtectPage>
            <Setting />
          </ProtectPage>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectPage>
            <Profile />
          </ProtectPage>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "manage-items",
        element: <ManageItems />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
    ],
  },
]);
export default router;

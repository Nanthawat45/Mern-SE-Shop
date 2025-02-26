import { createBrowserRouter } from "react-router";
import Main from "../layouts/Main";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/index";
import Shop from "../pages/Shop/index";
import Cart from "../pages/Cart/index";
import SignUp from "../components/SigUp";
import SignIn from "../components/SigIn";
import Setting from "../pages/Setting/index";
import Profile from "../pages/Profile/index";
import ProtectPage from "../pages/ProtectPage/index";
import Dashboard from "../pages/Dashboard/Index";
import AddProduct from "../pages/AddProduct/index";
import ManageItems from "../pages/ManageItems/Index";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
    element: <DashboardLayout />,
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
    ],
  },
]);
export default router;

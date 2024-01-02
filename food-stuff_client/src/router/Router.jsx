import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Shop/Menu";
import SignUp from "../components/SignUp";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import Profile from "../components/Profile";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartView from "../pages/Shop/CartView";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/menu",
        element: <PrivateRouter><Menu /></PrivateRouter>
      },
      {
        path: "/cart-view",
        element: <CartView />
      },
      {
        path: '/update-profile',
        element: <UpdateProfile />
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "dashboard",
    element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: 'users',
        element: <Users />
      }
    ]
  }
]);

export default router;
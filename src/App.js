import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Main/Main";
import Headers from "./Page/Headers/Headers";

import DashboardLayout from "./Main/DashboardLayout/DashboardLayout";
import AddProduct from "./Page/Headers/Dashboard/AddProduct/AddProduct";

import CategoryAllProduct from "./Page/CategoryAllProduct/CategoryAllProduct";
import Login from "./Page/Authentation/Login/Login";
import SignUp from "./Page/Authentation/SignUp/SignUp";
import MyOrder from "./Page/Headers/Dashboard/MyOrder/MyOrder";
import AllSeller from "./Page/Headers/Dashboard/AllSeller/AllSeller";
import AllBuyer from "./Page/Headers/Dashboard/AllBuyer/AllBuyer";
import AdminRoute from "./route/AdminRoute/AdminRoute";
import SellerRoute from "./Page/Headers/Dashboard/AllBuyer/SellerRoute/SellerRoute";
import BuyerRoute from "./Page/Headers/Dashboard/AllBuyer/BuyerRoute/BuyerRoute";
import PrivetRoute from "./route/PrivetRoute/PrivetRoute";
import Page from "./Page/Page/Page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Headers></Headers>,
        },
        {
          path: "/allProduct/:category",
          loader: (params) =>
            fetch(
              `http://localhost:5000/allProduct?category=${params.category}`
            ),
          element: (
            <PrivetRoute>
              <CategoryAllProduct></CategoryAllProduct>
            </PrivetRoute>
          ),
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/signUp",
          element: <SignUp></SignUp>,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <PrivetRoute>
          <DashboardLayout></DashboardLayout>
        </PrivetRoute>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Page></Page>,
        },
        {
          path: "/dashboard/addProduct",
          element: (
            <SellerRoute>
              <AddProduct></AddProduct>
            </SellerRoute>
          ),
        },
        {
          path: "/dashboard/myOrder",
          element: (
            <BuyerRoute>
              {" "}
              <MyOrder></MyOrder>{" "}
            </BuyerRoute>
          ),
        },
        {
          path: "/dashboard/allBuyer",
          element: (
            <AdminRoute>
              <AllBuyer></AllBuyer>
            </AdminRoute>
          ),
        },
        {
          path: "/dashboard/allSeller",
          element: (
            <AdminRoute>
              <AllSeller></AllSeller>
            </AdminRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <div className="max-w-[1440px] mx-auto">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

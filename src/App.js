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
import MyProduct from "./Page/Headers/Dashboard/MyProduct/MyProduct";
import Payment from "./Payment/Payment";
import MyBuyer from "./MyBuyer/MyBuyer";
import Blog from "./Blog/Blog";
import Error from "./Page/Error/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error></Error>,
      children: [
        {
          path: "/",
          element: <Headers></Headers>,
        },
        {
          path: "/blogs",
          element: <Blog></Blog>,
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
          element: (
            <PrivetRoute>
              <Page></Page>
            </PrivetRoute>
          ),
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
              <MyOrder></MyOrder>
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
          path: "/dashboard/myProduct",
          element: (
            <SellerRoute>
              <MyProduct></MyProduct>
            </SellerRoute>
          ),
        },
        {
          path: "/dashboard/payment/:id",
          loader: ({ params }) =>
            fetch(`http://localhost:5000/paymentRoute/${params.id}`, {
              headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
              },
            }),
          element: (
            <PrivetRoute>
              <Payment></Payment>
            </PrivetRoute>
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
        {
          path: "/dashboard/myBuyer",
          element: (
            <SellerRoute>
              <MyBuyer></MyBuyer>
            </SellerRoute>
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

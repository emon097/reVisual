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
          element: <CategoryAllProduct></CategoryAllProduct>,
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
      element: <DashboardLayout></DashboardLayout>,
      children: [
        {
          path: "/dashboard",
          element: (
            <h1 className="text-accent text-2xl"> Welcome To DashBoard </h1>
          ),
        },
        {
          path: "/dashboard/addProduct",
          element: <AddProduct></AddProduct>,
        },
        {
          path: "/dashboard/myOrder",
          element: <MyOrder></MyOrder>,
        },
        {
          path: "/dashboard/allBuyer",
          element: <AllBuyer></AllBuyer>,
        },
        {
          path: "/dashboard/allSeller",
          element: <AllSeller></AllSeller>,
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

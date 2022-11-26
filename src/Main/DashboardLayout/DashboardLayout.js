import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Navber from "../../Share/Navber";
import { FaBars } from "react-icons/fa";
import Footer from "../../Share/Footer";
import { AuthContext } from "../../Context/AuthProvider";
import useAdmin from "../../Hooks/useAdmin";
const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  return (
    <div>
      <Navber></Navber>
      <div className="drawer bg-secondary ">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content mx-3 my-3">
          <label
            htmlFor="my-drawer"
            className="btn text-white btn-primary drawer-button"
          >
            <FaBars></FaBars>
          </label>
          <div className="mx-auto">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side  ">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu bg-accent p-4 w-80  ">
            <li className="hover:text-primary">
              <Link to="/dashboard/myOrder"> My Order</Link>
            </li>
            <li className="hover:text-primary">
              <Link> My Whistlist</Link>
            </li>
            <li className="hover:text-primary">
              <Link to="/dashboard/addProduct">Add Product</Link>
            </li>
            <li className="hover:text-primary">
              <Link>My Product</Link>
            </li>
            <li className="hover:text-primary">
              <Link>My Product</Link>
            </li>
            {isAdmin && (
              <>
                <li className="hover:text-primary">
                  <Link to="/dashboard/allSeller">All Sellers</Link>
                </li>
                <li className="hover:text-primary">
                  <Link to="/dashboard/allBuyer">All Buyers</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;

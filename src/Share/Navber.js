import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut().then();
  };
  return (
    <div className="sticky">
      <div className="navbar bg-secondary   text-white">
        <div className="navbar-start ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 text-white bg-secondary"
            >
              <li>
                <Link to="/"> Home </Link>
              </li>
              <li tabIndex={0}>
                <Link to="/dashboard"> Dashboard </Link>
              </li>
              <li>
                <Link to="/blogs">Blog</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            ReVisual
          </Link>
        </div>
        <div className="navbar-center  hidden lg:flex">
          <ul className="menu menu-horizontal p-0 ">
            <li>
              <Link to="/"> Home </Link>
            </li>
            <li tabIndex={0}>
              <Link to="/dashboard"> Dashboard </Link>
            </li>
            <li>
              <Link to="/blogs">Blog</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user?.uid ? (
            <button
              className="btn btn-primary text-white"
              onClick={handleLogOut}
            >
              LogOut
            </button>
          ) : (
            <Link to="/signup" className="btn btn-primary text-white">
              SignUp
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;

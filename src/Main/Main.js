import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../Share/Navber";
import Footer from "../Share/Footer";
const Main = () => {
  return (
    <div>
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;

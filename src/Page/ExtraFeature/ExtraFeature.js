import React from "react";
import { FaUserTie, FaUserFriends, FaStoreAlt } from "react-icons/fa";

const ExtraFeature = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          Our Company Buy Selling Strategy
        </h2>
      </div>
      <div className="grid gap-8 row-gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="sm:text-center lg:text-center md:text-center bg-primary p-7 rounded-lg">
          <div className="flex  sm:justify-center lg:justify-center items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <FaUserTie className="text-5xl "></FaUserTie>
          </div>
          <h6 className="mb-2 bg-secondary p-3 rounded font-bold leading-5 text-white ">
            User Benefits
          </h6>
          <p className="max-w-md  mb-3 text-sm  sm:mx-auto font-bold text-white">
            <ul>
              <li>User Product Order Can Easy</li>
              <li>Smooth Browsing Experience</li>
              <li>Easy Payment Way</li>
            </ul>
          </p>
        </div>
        <div className="sm:text-center bg-primary p-7 rounded-lg">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <FaStoreAlt className="text-5xl"></FaStoreAlt>
          </div>
          <h6 className="mb-2 bg-secondary p-3 rounded font-bold leading-5 text-white">
            {" "}
            Seller Benefits{" "}
          </h6>
          <p className="max-w-md mb-3 text-sm  sm:mx-auto">
            <ul className="font-bold text-white">
              <li>Seller Can Easily Add Her Product</li>
              <li>Seller Can Add Run Her Product On Home Page</li>
              <li>Seller Will See Her Personal Buyer </li>
            </ul>
          </p>
        </div>
        <div className="sm:text-center bg-primary p-7 rounded-lg">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <FaUserFriends className="text-5xl"></FaUserFriends>
          </div>
          <h6 className="mb-2 font-bold leading-5 text-white bg-secondary p-3 rounded">
            All Over Benefits
          </h6>
          <p className="max-w-md mb-3 text-white text-sm  sm:mx-auto">
            <ul className=" font-bold text-white">
              <li>User Or Seller Can See Her Profile</li>
              <li>
                User Her Product Favorite Buy to Easily And Payment SuccessFully{" "}
              </li>
              <li>
                If someone goes to the dashboard he can see his profile whether
                he is a user or a seller
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtraFeature;

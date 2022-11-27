import React, { useContext, useState } from "react";
import { FaCheckCircle, FaLocationArrow } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthProvider";
import BookingModal from "../BookingModal/BookingModal";

const CategoryAllProducts = ({ allProduct, setModalAllProduct }) => {
  console.log(allProduct);
  const {
    buyingPrice,
    category,
    condition,
    description,
    image,
    location,
    phoneNo,
    productName,
    purchaseYear,
    sellingPrice,
    sellerAvatar,
    sellerName,
    dates,
    _id,
  } = allProduct;
  const [bookingBtn, setBookingBtn] = useState();
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="w-full my-9 bg-white rounded-lg shadow-md dark:bg-secondary dark:border-gray-700">
        <img className="p-8 rounded-t-lg" src={image} alt="img" />
        <div className="px-5 pb-5">
          <div>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Product Name {productName}
            </h5>
            <p className="text-sm font-semibold tracking-tight dark:text-white">
              {" "}
              Brand Name: {category}
            </p>
          </div>
          <div className="flex items-center mt-5 justify-between">
            <span className="text-lg font-bold bg-primary p-2 rounded-lg text-gray-900 dark:text-white">
              ReSell Price: ${sellingPrice}
            </span>

            <span className="text-white">Years Of Use: {purchaseYear}</span>
          </div>
          <div className="flex items-center mt-5 justify-between">
            <span className="text-lg font-bold  p-2 rounded-lg text-gray-900 dark:text-white">
              Original Price: ${buyingPrice}
            </span>
          </div>
          <div class="flex mt-5 items-center space-x-4">
            <img class="w-10 h-10 rounded-full" src={sellerAvatar} alt="" />

            <div class="font-medium dark:text-white">
              <div className="flex items-center">
                {sellerName}{" "}
                <FaCheckCircle className="text-blue-700 rounded-xl bg-white mx-1"></FaCheckCircle>
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                Posted Date: {dates}
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-white ">
              <p className="font-bold">Description:</p>
              {description.slice(0, 150) + "...more"}
            </p>
          </div>
          <div className="flex bg-secondary p-3 rounded-lg mt-5 justify-between items-center">
            <div className="flex text-white item-center justify-center">
              <FaLocationArrow className="mt-1 mx-1"></FaLocationArrow>

              <p className="text-sm ">Location: {location}</p>
            </div>
            <div className="text-sm flex text-white">
              Condition:
              <p className="text-green-700 mx-2 rounded px-3 bg-green-100 ">
                {condition}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <label
              onClick={() => setModalAllProduct(allProduct)}
              htmlFor="BookingModal"
              className="btn bg-primary  text-white"
            >
              Book Now
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAllProducts;

import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const BookingModal = ({ modalAllProduct }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  const {
    buyingPrice,
    category,
    condition,
    description,
    _id,
    image,
    location,
    phoneNo,
    productName,
    purchaseYear,
    sellerName,
    sellerAvatar,
    sellerEmail,
    sellingPrice,
    quantity,
  } = modalAllProduct;
  const onSubmit = (userInfo) => {
    const Userphone = userInfo.phone;
    const selleremail = sellerEmail;
    const productId = _id;
    const Userlocation = userInfo.location;
    const email = (userInfo.email = user?.email);
    const userName = (userInfo.displayName = user?.displayName);
    const userimage = (userInfo.photoURL = user?.photoURL);
    userInfo.quantity = quantity;
    userInfo.buyingPrice = buyingPrice;
    userInfo.category = category;
    userInfo.condition = condition;
    userInfo.description = description;
    userInfo.image = image;
    userInfo.phoneNo = phoneNo;
    userInfo.productName = productName;
    userInfo.purchaseYear = purchaseYear;
    userInfo.sellerName = sellerName;
    userInfo.sellingPrice = parseInt(sellingPrice);
    userInfo.location = location;
    const allinfos = {
      email,
      productId,
      userimage,
      selleremail,
      Userlocation,
      userName,
      Userphone,
      userInfo,
    };
    console.log(allinfos);

    fetch("https://revisual-server.vercel.app/myOrder", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allinfos),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success(
            "Product Order Successfully Please Pay Must be Complete"
          );
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="checkbox" id="BookingModal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="BookingModal"
              className="btn btn-sm btn-circle btn-primary absolute right-2 top-2"
            >
              ✕
            </label>
            <div className="mb-7">
              <h3 className="text-lg font-bold">
                Your Name: {user?.displayName}
              </h3>
              <p className="py-4">Your Email: {user?.email}</p>
              <p className="font-semibold mt-5">Location</p>
              <input
                {...register("location")}
                className="input m-2"
                type="text "
                placeholder="Enter Your Location"
              />
              <br />
              <p className="font-semibold mt-5">Phone Number</p>
              <input
                {...register("phone")}
                className="input m-2"
                type="text "
                placeholder="Enter Your Phone Number"
              />
            </div>
            <p className="text-white flex items-center bg-primary p-2">
              Seller Information <FaInfoCircle className="mx-2"></FaInfoCircle>
            </p>
            <div className="flex justify-between">
              <p>
                <p className="font-bold">Product Name:</p> {productName}
              </p>
              <p>
                <p className="font-bold">Product Use Days:</p> {purchaseYear}{" "}
              </p>
            </div>
            <div className="bg-secondary p-2 rounded-xl mt-5 text-white">
              <p>Product Description: {description}</p>
            </div>

            <div className="bg-secondary p-5 mt-5 rounded-lg  text-white">
              <div className="flex justify-between">
                <p>
                  {" "}
                  <p className="font-bold">Resale Price:</p> ${sellingPrice}{" "}
                </p>
                <p>
                  {" "}
                  <p className="font-bold">Original Price:</p> ${buyingPrice}{" "}
                </p>
              </div>
              <div className="flex justify-between">
                <p>
                  <p className="font-bold">Posted Location:</p> {location}
                </p>
              </div>
              <div className="flex justify-between">
                <p>
                  {" "}
                  <p className="font-bold">Brand Name:</p> {category}{" "}
                </p>
                <p>
                  <p className="font-bold">AvailableProduct:</p> {quantity}
                </p>
                <p>
                  {" "}
                  <p className="font-bold ">Condition:</p>{" "}
                  <p className="bg-green-100 p-1 rounded-lg text-green-700">
                    {condition}
                  </p>
                </p>
              </div>
              <div>
                <div class="flex items-center space-x-4">
                  <img
                    class="w-10 h-10 rounded-full"
                    src={sellerAvatar}
                    alt=""
                  />
                  <div class="font-medium dark:text-white">
                    <div className="flex text-white">
                      {" "}
                      Seller Name: {sellerName}
                      <FaCheckCircle className="text-blue-700 rounded-xl bg-white mx-2"></FaCheckCircle>{" "}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      Seller Phone No: {phoneNo}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      Seller Phone No: {phoneNo}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                // onClick={() => handleBookingModal(modalAllProduct, user)}
                className="btn-primary btn text-white"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingModal;

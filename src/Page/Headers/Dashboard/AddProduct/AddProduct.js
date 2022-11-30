import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthProvider";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [category, setCategory] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch("http://localhost:5000/category")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);

  const handleProduct = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const dates = format(new Date(), "yyyy-MM-dd");
    const url = `https://api.imgbb.com/1/upload?key=a9092fb79f783fc4527950882d60d253`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log(imgData);
        const image = imgData.data.display_url;
        const paid = false;
        const allUser = {
          buyingPrice: data.buyingPrice,
          category: data.category,
          condition: data.condition,
          description: data.description,
          location: data.location,
          phoneNo: data.phoneNo,
          price: data.price,
          productName: data.productName,
          purchaseYear: data.purchaseYear,
          sellingPrice: data.sellingPrice,
          image,
          sellerName: user?.displayName,
          sellerEmail: user?.email,
          sellerAvatar: user?.photoURL,
          dates,
          paid,
        };
        console.log(allUser);
        fetch("http://localhost:5000/allProduct", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(allUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              toast.success("Product Added Successfully");
            }
          });
      });
  };

  return (
    <div className="bg-accent my-16 p-5 rounded-xl mx-28 ">
      <form onSubmit={handleSubmit(handleProduct)}>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-6 w-full group">
            <input
              {...register("productName")}
              type="text"
              id="productName"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              for="productName"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Product Name
            </label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-6 w-full group">
            <input
              {...register("condition")}
              type="text"
              id="condition"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              for="condition"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Condition
            </label>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              {...register("phoneNo")}
              type="number"
              id="phoneNo"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              for="phoneNo"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mobile Number
            </label>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              {...register("location")}
              type="text"
              id="location"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              for="location"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Location
            </label>
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <input
              {...register("buyingPrice")}
              type="text"
              id="buyingPrice"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              for="buyingPrice"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Original Price
            </label>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              {...register("sellingPrice")}
              type="text"
              id="sellingPrice"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              for="sellingPrice"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ReSell Price
            </label>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              {...register("purchaseYear")}
              type="text"
              id="purchaseYear"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              for="purchaseYear"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Years Of use
            </label>
          </div>
          <select
            {...register("category")}
            className="select bg-secondary text-white w-full max-w-xs"
          >
            {category.map((ctg) => (
              <option value={ctg.categoryName}>{ctg.categoryName}</option>
            ))}
          </select>
          <div class="flex justify-center">
            <div class="mb-3 w-96">
              <label
                for="image"
                class="form-label inline-block mb-2 text-gray-700"
              >
                Upload Your Product Image
              </label>
              <input
                {...register("image")}
                class="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-white
                bg-secondary bg-clip-padding
                border border-solid border-secondary
                rounded
                transition
                ease-in-out
                m-0
                focus:text-white focus:bg-secondary focus:border-secondary focus:outline-none"
                type="file"
                id="image"
              />
            </div>
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <textarea
              {...register("description")}
              className="block py-2.5 px-0 w-full text-gray-900 bg-transparent bg-secondary border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary "
              id="description"
              cols="30"
              rows="4"
            ></textarea>
            <label
              for="description"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Discription
            </label>
          </div>
        </div>
        <input
          //   onClick={handleProduct(category._id)}
          type="submit"
          className="btn btn-primary text-white"
        />
      </form>
    </div>
  );
};

export default AddProduct;

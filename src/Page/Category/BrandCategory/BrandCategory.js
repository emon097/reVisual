import React from "react";
import { Link } from "react-router-dom";

const BrandCategory = ({ category }) => {
  const { categoryName, categoryImg } = category;
  return (
    <div>
      <Link to={`/allProduct/${categoryName}`}>
        <div class="container mx-auto ">
          <div class="mt-10 lg:w-1/2 sm:max-w-sm mx-auto">
            <div class="relative group">
              <img
                src={categoryImg}
                alt=""
                class="w-full rounded shadow-xl hover:shadow-2xl"
              />
              <div class="flex  items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
              <div class="absolute top-0 left-0 w-full h-full flex   opacity-0 hover:opacity-100">
                <div class="flex-row justify-center text-center my-14">
                  <h1 class="text-white rounded bg-secondary font-bold text-2xl p-3">
                    {categoryName}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BrandCategory;

import React, { useEffect, useState } from "react";
import BrandCategory from "./BrandCategory/BrandCategory";

const Category = () => {
  const [Categorys, setCategorys] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/category")
      .then((res) => res.json())
      .then((data) => {
        setCategorys(data);
      });
  }, []);

  return (
    <div>
      <h1 className=" font-bold text-center text-3xl">
        Here Is Our ReUse Product Category
      </h1>
      <div className="grid mx-10 mb-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {Categorys.map((category) => (
          <BrandCategory category={category}></BrandCategory>
        ))}
      </div>
    </div>
  );
};

export default Category;

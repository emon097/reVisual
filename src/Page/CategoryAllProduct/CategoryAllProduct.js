import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import Loading from "../../Loading/Loading";
import BookingModal from "./BookingModal/BookingModal";
import CategoryAllProducts from "./CategoryAllProducts/CategoryAllProducts";

const CategoryAllProduct = () => {
  const category = useParams();
  const [allProducts, setAllProduct] = useState([]);
  const [modalAllProduct, setModalAllProduct] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/allProduct?category=${category.category}`)
      .then((data) => data.json())
      .then((data) => setAllProduct(data));
  }, []);

  return (
    <div>
      <div>
        {allProducts?.length === 0 ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-1 gap-8 mx-10 md:grid-cols-2 lg:grid-cols-3">
            {allProducts.map((allProduct) => (
              <CategoryAllProducts
                setModalAllProduct={setModalAllProduct}
                allProduct={allProduct}
                key={allProduct._id}
              ></CategoryAllProducts>
            ))}
          </div>
        )}

        {modalAllProduct && (
          <BookingModal modalAllProduct={modalAllProduct}></BookingModal>
        )}
      </div>
    </div>
  );
};

export default CategoryAllProduct;

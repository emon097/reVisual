import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";

const MyProduct = () => {
  const { user } = useContext(AuthContext);
  const [myProduct, setMyProduct] = useState([]);
  fetch(`http://localhost:5000/allMyProduct?email=${user?.email}`)
    .then((res) => res.json())
    .then((data) => {
      setMyProduct(data);
      console.log(data);
    });
  return (
    <div className="mx-28">
      <h1 className="text-3xl bg-primary my-10 p-4 w-60 rounded-lg font-semibold text-white">
        My Product
      </h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Brand Name</th>
              <th>Quantity</th>
              <th>Action</th>
              <th>Advertisements</th>
            </tr>
          </thead>
          <tbody>
            {myProduct.map((myProducts) => (
              <tr>
                <th></th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src="photo" alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{myProducts.productName}</div>
                    </div>
                  </div>
                </td>
                <td>{myProducts.sellingPrice}</td>
                <td>{myProducts.category}</td>
                <th>Quantity</th>
                <th>delete</th>
                <th>
                  <button className="btn text-white btn-xs btn-primary">
                    Advertisement
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProduct;

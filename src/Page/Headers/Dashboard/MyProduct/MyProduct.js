import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthProvider";

const MyProduct = () => {
  const { user } = useContext(AuthContext);

  const { data: myProduct = [], refetch } = useQuery({
    queryKey: ["Seller"],
    queryFn: async () => {
      const res = await fetch(
        `https://revisual-server.vercel.app/allMyProduct?sellerEmail=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  const handleDelete = (id) => {
    fetch(`https://revisual-server.vercel.app/allMyProduct/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        if (data.deletedCount >= 1) {
          toast.success("Product SuccessFully Deleted");
        }
      });
  };

  const handleAdvertaisment = (id) => {
    fetch(`https://revisual-server.vercel.app/advertisement/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        if (data.modifiedCount === 0) {
          toast.error("Advertisement Already Running On Home Page ");
        }
        if (data.modifiedCount >= 1) {
          toast.success("Advertisement Running On Home Page");
        }
      });
  };

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
              <th>Product Status</th>
            </tr>
          </thead>
          <tbody>
            {myProduct.map((myProducts) => (
              <tr>
                <th></th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="w-12 h-12">
                        <img src={myProducts.image} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{myProducts.productName}</div>
                    </div>
                  </div>
                </td>
                <td>${myProducts.sellingPrice}</td>
                <td>{myProducts.category}</td>
                <th>
                  {myProducts.quantity === "" ? "soldOut" : myProducts.quantity}
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(myProducts._id)}
                    className="btn btn-error text-white btn-xs"
                  >
                    Delete
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleAdvertaisment(myProducts._id)}
                    className="btn text-white btn-xs btn-primary"
                  >
                    {myProducts?.advertisement === "advertised"
                      ? "AdVertisement is Running"
                      : "Run AdVertisement"}
                  </button>
                </th>
                <th>AvailAble</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProduct;

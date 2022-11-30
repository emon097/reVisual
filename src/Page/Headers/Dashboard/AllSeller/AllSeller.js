import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

const AllSeller = () => {
  const { data: allSeller = [], refetch } = useQuery({
    queryKey: ["Seller"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users?role=Seller", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();

      return data;
    },
  });
  const handleSellersDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        if (data.acknowledged) {
          toast.success("Seller Deleted SuccessFully");
        }
      });
  };

  const userVerified = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Seller Verified SuccessFully");
        }
        refetch();
      });
  };

  return (
    <div className="md:mx-28 lg:mx-28">
      <h1 className="text-3xl bg-primary my-10 p-4 w-60 rounded-lg font-semibold text-white">
        All Sellers
      </h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Verification</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allSeller.map((allBuyers, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={allBuyers.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{allBuyers.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{allBuyers.email}</td>
                <td>{allBuyers.role}</td>
                <td>
                  <button onClick={() => userVerified(allBuyers._id)}>
                    {allBuyers.Verification ? (
                      <>
                        <FaCheckCircle className="text-blue-700 rounded-xl bg-white mx-1"></FaCheckCircle>
                      </>
                    ) : (
                      <>
                        {" "}
                        <button className="btn btn-xs btn-primary">
                          Verification Pending
                        </button>{" "}
                      </>
                    )}
                  </button>
                </td>

                <th>
                  <button
                    onClick={() => handleSellersDelete(allBuyers._id)}
                    className="btn text-white btn-error btn-xs"
                  >
                    Delete
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

export default AllSeller;

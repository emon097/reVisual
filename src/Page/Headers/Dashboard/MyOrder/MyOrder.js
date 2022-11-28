import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const [myOrder, setMyOrder] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/myOrder?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyOrder(data);
        console.log(data);
      });
  }, [user?.email]);
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
              <th>Product Condition</th>
              <th>Seller Phone No</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myOrder.map((myProducts) => (
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
                <td>{myProducts.condition}</td>
                <td>{myProducts.phoneNo}</td>
                <th>${myProducts.sellingPrice}</th>
                <th>
                  <button className="btn text-white btn-success btn-xs">
                    Pay Now
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

export default MyOrder;

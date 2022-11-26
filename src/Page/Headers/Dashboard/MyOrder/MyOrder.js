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
    <div className="w-full">
      <div className="overflow-x-auto mx-28 ">
        <table className="table table-zebra w-full">
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
            {myOrder.map((myOrders, i) => (
              <tr>
                <th>{i + 1}</th>
                <th> {myOrders.productName}</th>
                <th>{myOrders.productName}</th>
                <th>{myOrders.phoneNo}</th>
                <th>${myOrders.sellingPrice}</th>
                <th>
                  <button className="btn btn-error btn-sm text-white">
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

export default MyOrder;

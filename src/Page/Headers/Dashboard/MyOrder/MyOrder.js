import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthProvider";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const [myOrder, setMyOrder] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/myOrder?email=${user?.email}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMyOrder(data);
        console.log(data);
      });
  }, [user?.email]);
  return (
    <div className="mx-28">
      <h1 className="text-3xl bg-primary my-10 p-4 w-60 rounded-lg font-semibold text-white">
        My Order
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
              <th>location</th>
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
                        <img src={myProducts?.userInfo?.image} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {myProducts?.userInfo.productName}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{myProducts?.userInfo?.condition}</td>
                <td>{myProducts?.userInfo?.phoneNo}</td>
                <th>${myProducts?.userInfo?.sellingPrice}</th>
                <th>
                  {myProducts.userInfo.sellingPrice && !myProducts.paid && (
                    <Link to={`/dashboard/payment/${myProducts._id}`}>
                      <button className="btn text-white btn-success btn-xs">
                        Pay Now
                      </button>
                    </Link>
                  )}
                  {myProducts?.userInfo?.sellingPrice && myProducts.paid && (
                    <button className="btn text-white btn-success btn-xs">
                      Paid
                    </button>
                  )}
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

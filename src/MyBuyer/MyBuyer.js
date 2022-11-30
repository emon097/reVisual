import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";

const MyBuyer = () => {
  const { user } = useContext(AuthContext);
  const [myBuyer, setMyBuyer] = useState([]);
  useEffect(() => {
    fetch(
      `https://revisual-server.vercel.app/myBuyer?selleremail=${user?.email}`,
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMyBuyer(data);
        console.log(data);
      });
  }, [user?.email]);
  return (
    <div className="mx-28">
      <h1 className="text-3xl bg-primary my-10 p-4 w-60 rounded-lg font-semibold text-white">
        My Buyers
      </h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Buyer Phone Number</th>
              <th>Product Buy</th>
              <th>Buyer Address</th>
            </tr>
          </thead>
          <tbody>
            {myBuyer.map((myBuyers) => (
              <>
                <tr>
                  <th></th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={myBuyers.userimage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{myBuyers.userName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{myBuyers.email}</td>
                  <td>{myBuyers.Userphone}</td>
                  <td>{myBuyers?.userInfo?.productName}</td>
                  <th>{myBuyers.Userlocation}</th>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBuyer;

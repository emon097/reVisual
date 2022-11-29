import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckOut from "./CheckOut";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);
const Payment = () => {
  const payment = useLoaderData();
  console.log(payment);
  return (
    <div className="bg-primary mt-9 mx-20  p-9 rounded-xl">
      <div className="flex justify-center ">
        <h1 className="text-white">Payment for: </h1>
        <p className="text-white"> {payment?.userInfo?.productName}</p>
        <div className="mx-4 text-white">
          <p>Please Pay ${payment?.userInfo?.sellingPrice}</p>
        </div>
      </div>
      <div className=" bg-primary mt-20 flex justify-center ">
        <div className="text-white  w-1/4  ">
          <Elements stripe={stripePromise}>
            <CheckOut payment={payment} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckOut = ({ payment }) => {
  const [carderror, setCardError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const { userInfo, userName, email, productId, _id } = payment;

  const { sellingPrice, productName } = userInfo;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://revisual-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer  ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ sellingPrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [sellingPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError);
    }
    setSuccess("");
    setProcessing(true);
    if (paymentIntent.status === "succeeded") {
      const payment = {
        productName,
        sellingPrice,
        email,
        bookingId: _id,
        productId: productId,
        treansectionId: paymentIntent?.id,
      };
      fetch("https://revisual-server.vercel.app/payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Payment has Been Paid");
          }
          if (data.insertedId) {
            setSuccess(
              `Your Payment SuccessFully Complete Your Transection Id ${paymentIntent?.id}  `
            );
          }
        });
    }
    setProcessing(false);
  };
  return (
    <div className="text-white ">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#FFFFFF",
                "::placeholder": {
                  color: "#FFFFFF",
                },
              },
              invalid: {
                color: "#FF0000",
              },
            },
          }}
        />

        <div className="flex justify-center">
          <button
            className="btn mt-11 btn-secondary text-white btn-sm"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </div>
      </form>
      <text className="red-600">{carderror}</text>
      <div>
        <p className="bg-green-100 text-green-600 mt-7 rounded-lg p-5">
          {success}
        </p>
      </div>
    </div>
  );
};

export default CheckOut;

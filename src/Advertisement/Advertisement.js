import React, { useEffect, useState } from "react";

const Advertisement = () => {
  const [dismiss, setDismiss] = useState(false);
  const [advertisement, setAdvertisement] = useState([]);
  useEffect(() => {
    fetch(
      "https://revisual-server.vercel.app/showAdvertisement?advertisement=advertised",
      {
        headers: {
          authorization: `bearer  ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAdvertisement(data);
      });
  }, []);
  return (
    <div>
      <div className="flex justify-between mx-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {advertisement.map((advertised) => (
            <div
              className={`${
                dismiss && "hidden"
              } flex w-full flex-col rounded   px-4 py-3 text-sm `}
              role="alert"
            >
              <div className="mb-2 flex items-center gap-12">
                {/* body */}

                <div className="card w-96 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl p-4">
                  <div className="flex">
                    <div className="my-auto">
                      <img
                        className="w-48"
                        src={advertised.image}
                        alt="Shoes"
                      />
                    </div>

                    <div>
                      <p className="text-xl font-bold">
                        40% OFF Discount Offer Runing{" "}
                      </p>
                      <p>{advertised.productName}</p>
                      <button className="btn btn-sm text-white btn-error w-32 mt-2">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* body */}

                {/* crossbtn */}

                <button
                  onClick={() => setDismiss(true, advertised)}
                  className="btn btn-circle bg-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* crossbtn */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advertisement;

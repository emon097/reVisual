import { useEffect, useState } from "react";

const useSeller = (email) => {
  const [isSeller, setIsBuyer] = useState(false);
  const [isSellerLoading, setIsSellerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/Seller/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsBuyer(data.isSeller);
          setIsSellerLoading(false);
        });
    }
  }, [email]);
  return [isSeller, isSellerLoading];
};

export default useSeller;

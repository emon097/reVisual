import { useEffect, useState } from "react";

const useBuyer = (email) => {
  const [isBuyer, setIsBuyer] = useState(false);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/Buyer/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsBuyer(data.isBuyer);
        });
    }
  }, [email]);
  return [isBuyer];
};
export default useBuyer;

import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import useToken from "../../../Hooks/useToken";
import Loading from "../../../Loading/Loading";

const SignUp = () => {
  const { createUsersEmail, updateUser, googleRegister } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [createdUserJwt, setCreatedUserJwt] = useState("");
  const [token] = useToken(createdUserJwt);
  if (token) {
    navigate("/");
  }

  const handleGoogleSignUp = () => {
    googleRegister(provider).then((res) => {
      const user = res.user;
      setCreatedUserJwt(user?.email);
      const displayName = user?.displayName;
      const photoURL = user?.photoURL;
      const email = user?.email;
      const role = "Buyer";
      const GoogleUserInfo = {
        displayName,
        photoURL,
        email,
        role,
      };
      console.log(GoogleUserInfo);
      fetch("http://localhost:5000/googleSignUp", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(GoogleUserInfo),
      }).then((data) => {
        navigate("/");
        console.log(data);
      });
    });
  };

  const handleSignUp = (signUp) => {
    createUsersEmail(signUp.email, signUp.password).then((res) => {
      const user = res.user;
      console.log(user);
      const image = signUp.image[0];
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=a9092fb79f783fc4527950882d60d253`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageData) => {
          console.log(imageData);
          const image = imageData.data.display_url;
          const userInfo = {
            displayName: signUp.name,
            photoURL: image,
          };
          updateUser(userInfo).then((res) => {
            const userFullInfo = {
              displayName: signUp.name,
              photoURL: image,
              email: signUp.email,
              role: signUp.role,
            };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userFullInfo),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                setCreatedUserJwt(signUp.email);
                if (data.acknowledged) {
                  toast.success("Create User Successfully");
                }
              });
          });
        });
    });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card mt-5 mb-5 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                required
                {...register("name")}
                type="text"
                placeholder="Enter Your Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload Your Profile Image</span>
              </label>
              <input required {...register("image")} type="file" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                required
                {...register("email")}
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                required
                {...register("password")}
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
              <select
                {...register("role")}
                className="select my-7 w-full max-w-xs text-white bg-secondary "
              >
                <option>Buyer</option>
                <option>Seller</option>
              </select>
              <label className="label">
                <Link href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>
              <label>
                <p>
                  <p className="text-secondary">
                    If You Already Have An Account then
                  </p>
                  <p className="text-primary">
                    <Link to="/login">LogIn</Link>
                  </p>
                </p>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn text-white btn-primary">SignUp</button>
              <div className="flex text-white mt-5 btn btn-secondary justify-center items-center">
                <FaGoogle></FaGoogle>{" "}
                <button onClick={handleGoogleSignUp} className="mx-2">
                  Continue With Google
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

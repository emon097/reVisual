import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import useToken from "../../../Hooks/useToken";

const SignUp = () => {
  const { createUsersEmail, updateUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [createdUserJwt, setCreatedUserJwt] = useState("");
  const [token] = useToken(createdUserJwt);
  if (token) {
    navigate("/");
  }
  const handleSignUp = (signUp) => {
    console.log(signUp);
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
            console.log(userFullInfo);
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
              });
          });
        });
    });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
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
              <input {...register("image")} type="file" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
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
                {...register("password")}
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
              <select
                {...register("role")}
                className="select my-7 w-full max-w-xs text-white bg-secondary "
              >
                <option>Seller</option>
                <option>Buyer</option>
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

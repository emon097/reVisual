import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

const SignUp = () => {
  const { createUsersEmail, updateUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = (userLogin) => {
    console.log(userLogin);
    createUsersEmail(userLogin.email, userLogin.password).then((res) => {
      const user = res.user;
      console.log(user);
      const image = userLogin.image[0];
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
            displayName: userLogin.name,
            photoURL: image,
          };
          updateUser(userInfo).then((res) => {
            const userFullInfo = {
              displayName: userLogin.name,
              photoURL: image,
              email: userLogin.email,
              role: userLogin.role,
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
              .then((data) => console.log(data));
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

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import useToken from "../../../Hooks/useToken";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [loginJwt, setLoginJwt] = useState("");
  const [token] = useToken(loginJwt);
  const navigate = useNavigate();
  if (token) {
    navigate("/");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (userLogin) => {
    loginUser(userLogin.email, userLogin.password).then((res) => {
      const user = res.user;
      setLoginJwt(userLogin.email);
      console.log(user);
    });
    console.log(userLogin);
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="card-body">
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

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                <p>
                  <p className="text-secondary">Are You New Then</p>
                  <p className="text-primary">
                    <Link to="/signup">Create A Account</Link>
                  </p>
                </p>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

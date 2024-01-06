import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";

// bg-gradient-to-tr from-[#CFFDFB] to-[#AF85E4] h-screen
// hover:bg-[#FF7A92]
// text-[#0E3E4E]
// text-[#EB2424]
// [#316FF6]
// 

const LogIn = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const { signUpWithGmail, login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  //react hook form
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        // console.log(user);
        alert("Login successful!");
        navigate(from);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterrorMessage("Please provide valid email & password!");
      });
    reset()

  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        navigate(from);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="max-w-md  shadow w-full mx-auto flex items-center justify-center  text-[#0E3E4E]">
      <div className="mb-5 bg-gradient-to-tr from-[#CFFDFB] to-[#AF85E4] my-20 rounded-2xl">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >   <Link
          to='/'
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#FF7A92] hover:text-[#fff] ">✕</Link>
          <h3 className="font-bold text-lg text-center ">Login!</h3>

          {/* email */}
          <div className="form-control ">
            <label className="label">
              <span className="label-text text-[#0E3E4E]">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#0E3E4E]">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover mt-2 text-[#0E3E4E]">
                Forgot password?
              </a>
            </label>
          </div>

          {/* show errors */}
          {errorMessage ? (
            <p className="text-red text-xs italic">
              Provide a correct username & password.
            </p>
          ) : (
            ""
          )}

          {/* submit btn */}
          <div className="form-control mt-4">
            <input
              type="submit"
              className="btn button bg-green "
              value="Login"
            />
          </div>

          {/* close btn */}
          <Link to="/">
            <div
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </div></Link>

          <p className="text-center my-2">
            Don't have an account?
            <Link to="/signup" className="underline text-red ml-1">
              Signup
            </Link>
          </p>
        </form>
        <div className="text-center space-x-3">
          <button onClick={handleRegister} className="btn btn-circle hover:bg-green hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogIn

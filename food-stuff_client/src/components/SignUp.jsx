import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { useForm } from "react-hook-form"
import Modal from './Modal';
import { AuthContext } from '../context/AuthProvider';
import useAxiosPublic from "../hooks/useAxiosPublic";


const Signup = () => {
  const { signUpWithGmail, createUser, updateUserProfile } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password)
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfor = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfor)
            .then((response) => {
              console.log(response);
              alert("SignUp successful!");
              navigate(from, { replace: true });
            });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  // google logging
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic
          .post("/users", userInfor)
          .then((response) => {
            alert("SignIn successful!");
            navigate("/");
          });
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className=' flex items-center justify-center bg-gradient-to-tr from-[#CFFDFB] to-[#AF85E4] h-screen'>
      <div className=" modal-action flex flex-col justify-center mt-0 backgroundPrimary text-[#0E3E4E] rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog ">

          <Link
            to='/'
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#FF7A92] hover:text-[#fff] ">✕</Link>
          <h3 className='font-bold text-2xl text-center'>Create an Account!</h3>

          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text  text-[#0E3E4E]">Name</span>
            </label>
            <input
              type="name"
              placeholder="Your name"
              className="input input-bordered text-[#fff]"
              {...register("name")}
            />
          </div>

          {/* email */}
          <div className="form-control ">
            <label className="label ">
              <span className="label-text text-[#0E3E4E]">Email</span>
            </label>
            <input type="email" placeholder="email" className="input input-bordered text-[#fff]" required {...register("email")} />
          </div>


          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#0E3E4E]">Password</span>
            </label>
            <input type="password" placeholder="password" className="input input-bordered text-[#fff]"  {...register("password")} />
          </div>


          <div className="form-control mt-4">
            <input
              type="submit"
              value="Signup"
              className="btn button"
            />
          </div>

          <p className="text-center my-2">Have an account? <button onClick={() => document.getElementById("my_modal_5").showModal()} className="underline text-[#EB2424]">Login</button></p>

        </form>

        {/*sucial*/}

        <div className='text-center space-x-3  mb-5'>

          <button onClick={handleRegister} className="btn btn-circle bg-[#fff] hover:bg-[#fff] border-none hover:scale-105 shadow-md" >
            <FcGoogle className='h-6 w-6' />
          </button>

          <button className="btn btn-circle btn-outline hover:bg-[#316FF6] bg-[#316FF6] hover:text-[#fff] text-[#fff] border-none hover:scale-105 shadow-md">
            <FaFacebookF className='h-6 w-6  ' />
          </button>

          <button className="btn btn-circle btn-outline border-none hover:bg-[#fff] bg-[#fff] text-[#000] hover:scale-105 shadow-md">
            <TbBrandGithubFilled className='h-6 w-6' />
          </button>

        </div>

      </div>
      <Modal />
    </div>
  )
}

export default Signup
import React from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { useForm } from "react-hook-form"
import Modal from './Modal';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => { console.log(data) };


  return (
    <div className=' flex items-center justify-center bg-gradient-to-tr from-[#CFFDFB] to-[#AF85E4] h-screen'>
      <div className="modal-box backgroundPrimary text-[#0E3E4E]">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog ">
          <Link
            to='/'
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#FF7A92] hover:text-[#fff] ">✕</Link>
          <h3 className='font-bold text-2xl text-center py-4'>Create an Account!</h3>

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
            <input type="password" placeholder="password" className="input input-bordered text-[#fff]" required  {...register("password")} />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover text-[#0E3E4E]">Forgot password?</a>
            </label>
          </div>

          <div className="form-control mt-6">
            <input type='sumbit' value='SignUp' className="button" />
          </div>
          <p className='text-center mt-2' >Have an Account? <button onClick={() => document.getElementById("my_modal_3").showModal()}
            className='underline text-[#EB2424]'>Login</button> </p>
        </form>

        {/*button*/}

        <div className='text-center space-x-3  mt-5'>

          <button className="btn btn-circle bg-[#fff] hover:bg-[#fff] border-none hover:scale-105 shadow-md">
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
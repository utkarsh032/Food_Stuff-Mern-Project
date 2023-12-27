import React from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";

const Modal = () => {
  return (
    <dialog id="my_modal_3" className="modal ">
      <div className="modal-box backgroundPrimary text-[#0E3E4E]">
        <form className='' method="dialog ">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#FF7A92] hover:text-[#fff]">✕</button>
          <h3 className='font-bold text-2xl text-center'> Login</h3>
          <div className="form-control ">
            <label className="label ">
              <span className="label-text text-[#0E3E4E]">Email</span>
            </label>
            <input type="email" placeholder="email" className="input input-bordered text-[#fff]" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#0E3E4E]">Password</span>
            </label>
            <input type="password" placeholder="password" className="input input-bordered text-[#fff]" required />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover text-[#0E3E4E]">Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <input type='sumbit' value='Login' className="button" />
          </div>
          <p className='text-center mt-2' >Don't hav an account? <Link to='/signup' className='underline text-[#EB2424]'>SignUp</Link> </p>
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
    </dialog>
  )
}

export default Modal

import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { useForm } from "react-hook-form"
import { AuthContext } from '../context/AuthProvider';

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { signUpWithGmail, login } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";


  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password).then((result) => {
      const user = result.user;
      alert("Login successfull");
      document.getElementById("my_modal_5").close()
      navigate(from, { replace: true })
    }).catch((error) => {
      const errorMessage = error.message;
      setErrorMessage("Provide a correct email and password!")
    })
  };

  const handleLogin = () => {
    signUpWithGmail().then((result) => {
      const user = result.user;
      alert("Login successfull!")
      navigate(from, { replace: true })
    }).catch((error) => console.log(error))
  }

  return (

    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box backgroundPrimary text-[#0E3E4E]">
        <div className='modal-action flex flex-col justify-center mt-0'>
          <form onSubmit={handleSubmit(onSubmit)} className='card-body' method="dialog ">
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#FF7A92] hover:text-[#fff]"
            >✕</button>

            <h3 className='font-bold text-2xl text-center'>Login</h3>

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
              <input type="password" placeholder="password" className="input input-bordered text-[#fff]"   {...register("password")} />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-[#0E3E4E]">Forgot password?</a>
              </label>
            </div>

            {
              errorMessage ? <p className="text-[#EB2424] text-xs italic">{errorMessage}</p> : " "
            }

            {/*login btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                value="Login"
                className="btn button"
              />
            </div>


            <p className='text-center my-2' >Don't hav an account? <Link to='/signup' className='underline text-[#EB2424]'>SignUp</Link>
            </p>

          </form>
        </div>
        {/*button*/}

        <div className='text-center space-x-3  mt-5'>

          <button className="btn btn-circle bg-[#fff] hover:bg-[#fff] border-none hover:scale-105 shadow-md" onClick={handleLogin}>
            <FcGoogle className='h-6 w-6' />
          </button>

          <button className="btn btn-circle btn-outline hover:bg-[#316FF6] bg-[#316FF6] hover:text-[#fff] text-[#fff] border-none hover:scale-105 shadow-md">
            <FaFacebookF className='h-6 w-6' />
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
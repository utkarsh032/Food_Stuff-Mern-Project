import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { AuthContext } from '../../context/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
  const { updateUserProfile } = useContext(AuthContext)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    updateUserProfile(name, photoURL).then(() => {
      navigate(from, { replace: true })

    }).catch((error) => {

    })
  }

  return (
    <div className=' flex items-center justify-center h-screen'>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl backgroundPrimary">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className='font-bold text-2xl text-center text-[#0E3E4E]'>Update Your Profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#0E3E4E]">Name</span>
            </label>
            <input  {...register("name")} type="text" placeholder="Name" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#0E3E4E]">Upload Photo</span>
            </label>

            <input type="text" {...register("photoURL")} placeholder='photoURL' className='input input-bordered' required />
            {/* <input  {...register("photoURL")} type="file" className="file-input file-input-bordered w-full max-w-xs" />*/}


          </div>
          <div className="form-control ">
            <div className="form-control mt-4">
              <input
                type="submit"
                value="Update"
                className="btn button"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile

import React from 'react'
import { IoFastFood } from "react-icons/io5";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/useAxiosPublic"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateMenu = () => {
  const item = useLoaderData();
  const navigate = useNavigate()

  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure();


  // image_hosting_key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
  const onSubmit = async (data) => {
    console.log(data)

    const imageFile = { image: data.image[0] };
    const hostingImage = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(hostingImage)
    if (hostingImage.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: hostingImage.data.data.display_url
      };

      console.log(menuItem);
      const postMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem);
      if (postMenuItem) {
        reset()
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Recipe is updated successfully!",
          showConfirmButton: false,
          timer: 500,
          confirmButtonColor: "#FF7A92",
          background: "#CF95FD",
        });
        navigate("/dashboard/manage-items")
      }
    }

  }


  return (
    <div className='w-full xl:w-[870px] mx-auto'>
      <h2 className='text-3xl font-semibold my-4'>Update This  <span className='text-[#EB2424]'>Recipe</span></h2>

      {/* back  */}
      <div className='backgroundPrimary rounded-r-xl -mx-4'>
        {/* form */}
        <div className=''>
          <form className='mx-4 text-[#fff] py-10' onSubmit={handleSubmit(onSubmit)}>
            <div className='form-control '>
              <label className='label'>
                <span className='label-text text-[#0E3E4E]'>Recipe Name</span>
              </label>
              <input type='text' defaultValue={item.name}  {...register("name", { required: true })} className='input input-bordered w-full' placeholder='Recipe Name' />
            </div>

            {/*2nd*/}
            <div className='flex items-center gap-4'>
              {/*category*/}
              <div className='form-control w-full my-4'>
                <label className="label">
                  <span className="label-text text-[#0E3E4E]">Category</span>
                </label>
                <select defaultValue={item.category} {...register("category", { required: true })} className="select select-bordered label-text" >
                  <option disabled value="default" >Select a Category</option>
                  <option value="salad">Salad</option>
                  <option value="drinks">Drinks</option>
                  <option value="dessert">Dessert</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="offered">Offered</option>
                  <option value="populor">Popular</option>
                </select>

              </div>

              {/*price */}
              <div className='form-control w-full'>
                <label className='label '>
                  <span className='label-text text-[#0E3E4E]'>Price</span>
                </label>
                <input type='number' defaultValue={item.price} {...register("price", { required: true })} className='input input-bordered w-full' placeholder='Price' />
              </div>
            </div>

            {/*3rd*/}

            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[#0E3E4E]">Recipe Method</span>
              </label>
              <textarea defaultValue={item.recipe} {...register("recipe", { required: true })} className="textarea textarea-bordered h-24 " placeholder="Write about recipe..."></textarea>
            </div>

            {/*4th*/}
            <div className="form-control w-full py-4">
              <label className="label">
                <span className="label-text text-[#0E3E4E]">Recipe Picture</span>
              </label>
              <input  {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
            </div>

            {/*btn*/}
            <button className='button my-4'>Update Recipe<IoFastFood /></button>

          </form>
        </div>

      </div>

    </div>
  )
}

export default UpdateMenu

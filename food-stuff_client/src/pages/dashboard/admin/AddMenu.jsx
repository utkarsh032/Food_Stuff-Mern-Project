import React from 'react'
import { IoFastFood } from "react-icons/io5";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/useAxiosPublic"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'

const AddMenu = () => {
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
      const postMenuItem = axiosSecure.post('/menu', menuItem);
      if (postMenuItem) {
        reset()
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Recipe is inserted successfully!",
          showConfirmButton: false,
          timer: 500,
          confirmButtonColor: "#FF7A92",
          background: "#CF95FD",
        });
      }
    }
  }

  return (
    <div className='w-full xl:w-[870px] mx-auto'>
      <h2 className='text-3xl font-semibold my-4'>Upload A New Menu <span className='text-[#EB2424]'>Product</span></h2>

      {/* back  */}
      <div className='backgroundPrimary rounded-r-xl -mx-4'>
        {/* form */}
        <div className=''>
          <form className='mx-4 text-[#fff] py-10' onSubmit={handleSubmit(onSubmit)}>
            <div className='form-control '>
              <label className='label'>
                <span className='label-text text-[#0E3E4E]'>Recipe Name</span>
              </label>
              <input type='text'  {...register("name", { required: true })} className='input input-bordered w-full' placeholder='Recipe Name' />
            </div>

            {/*2nd*/}
            <div className='flex items-center gap-4'>
              {/*category*/}
              <div className='form-control w-full my-4'>
                <label className="label">
                  <span className="label-text text-[#0E3E4E]">Category</span>
                </label>
                <select  {...register("category", { required: true })} className="select select-bordered label-text" defaultValue="default">
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
                <input type='number' {...register("price", { required: true })} className='input input-bordered w-full' placeholder='Price' />
              </div>
            </div>

            {/*3rd*/}

            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[#0E3E4E]">Recipe</span>
              </label>
              <textarea  {...register("recipe", { required: true })} className="textarea textarea-bordered h-24 " placeholder="Write about recipe..."></textarea>
            </div>

            {/*4th*/}
            <div className="form-control w-full py-4">
              <label className="label">
                <span className="label-text text-[#0E3E4E]">Recipe Upload</span>
              </label>
              <input  {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
            </div>

            {/*btn*/}
            <button className='button my-4'>Add Recipe<IoFastFood /></button>

          </form>
        </div>



      </div>

    </div>
  )
}

export default AddMenu

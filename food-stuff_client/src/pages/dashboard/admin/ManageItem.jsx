import React from 'react'
import { Link } from "react-router-dom";
import { LuFolderEdit } from "react-icons/lu";
import { ImBin } from "react-icons/im";
import Swal from 'sweetalert2';

import useMenu from '../../../hooks/useMenu'
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItem = () => {
  const [menu, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete from menu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF7A92",
      background: "#CF95FD",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        // console.log(res);
        if (res) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "This Recipe has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="w-full xl:w-[870px] px- mx-auto">
      <h2 className="text-3xl font-semibold my-4">
        Manage All <span className="text-[#EB2424]">Recipes</span>
      </h2>
      {/* Recipe table */}
      <div className='-mx-4' >
        <div className="overflow-x-auto  rounded-r-xl">
          <table className="table">
            {/* head */}
            <thead className='bg-[#FF7A92] text-[#fff] rounded-r-xl'>
              <tr className=''>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className='backgroundPrimary'>
              {menu.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>


                  {/*edit */}
                  <td> <Link to={`/dashboard/update-menu/${item._id}`}> <button className='btn rounded-full text-[#fff] bg-[#FF7A92] border-none '><LuFolderEdit className='hover:scale-125' /></button></Link>
                  </td>
                  {/*delete */}
                  <td><button onClick={() => handleDeleteItem(item)} className='btn rounded-full text-[#fff] bg-[#FF7A92] border-none '><ImBin className='hover:scale-125' /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageItem
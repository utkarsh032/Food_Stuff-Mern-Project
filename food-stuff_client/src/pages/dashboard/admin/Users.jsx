import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { ImBin } from "react-icons/im";
import { RiAdminFill } from "react-icons/ri";
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // handleMakeAdmin
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      alert(`${user.name} is now admin`);
      refetch();
    });
  };

  // handleDeleteUser
  const handleDeleteUser = user => {
    axiosSecure.delete(`/users/${user._id}`).then(res => {
      alert(`${user.name} is removed from database`);
      refetch();
    })
  }

  return (
    <div>
      <div className='flex items-center justify-between m-4'>
        <h5>USERS</h5>
        <h5>Total Users :{users.length}</h5>
      </div>
      {/* Table */}
      <div className="overflow-x-auto backgroundPrimary rounded-r-xl -mx-4">
        <table className="table  xl:w-[870px]">
          {/* head */}
          <thead className='bg-[#FF7A92] text-[#fff] '>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>{user.role === "admin" ? "Admin" : (<button onClick={() => handleMakeAdmin(user)} className='btn rounded-full text-[#fff] bg-[#FF7A92] border-none'><RiAdminFill className='hover:scale-125' />
                </button>)}
                </td>

                <td><button onClick={() => handleDeleteUser(user)} className='btn rounded-full text-[#fff] bg-[#FF7A92] border-none '><ImBin className='hover:scale-125' /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Users

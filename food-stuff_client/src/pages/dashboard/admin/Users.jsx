import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { ImBin } from "react-icons/im";
import { FaRegUser } from "react-icons/fa";

const Users = () => {
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/users`)
      return res.json()
    },
  })
  console.log(users)
  return (
    <div>
      <div className='flex items-center justify-between m-4'>
        <h5>USERS</h5>
        <h5>Total Users :{users.length}</h5>
      </div>


      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table  md:w-[870px]">
          {/* head */}
          <thead className='bg-[#FF7A92] text-[#fff] rounded-lg'>
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

                <td>{user.role === "admin" ? (
                  "Admin"
                ) : (<button className='btn rounded-full text-[#fff] bg-[#FF7A92] border-none'><FaRegUser /></button>)}</td>

                <td><button className='btn rounded-full text-[#fff] bg-[#FF7A92] border-none '><ImBin /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users

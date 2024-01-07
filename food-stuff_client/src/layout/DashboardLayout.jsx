import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";

import { AiOutlineLogout } from "react-icons/ai";

import logo from '/f--d_stuff.png'

const sharedLinks = (
  <>
    <li><Link to='/'><AiOutlineHome />Home</Link></li>
    <li><Link to='/menu'><BiFoodMenu />Menu</Link></li>
    <li><Link to='/menu'><MdOutlineTrackChanges />Orders Tracking</Link></li>
    <li><Link to='menu/'><MdSupportAgent />Customer Support</Link></li>
  </>
)


const DashboardLayout = () => {
  return (
    <div>

      {/*drawer*/}
      <div className="drawer  sm:drawer-open bg-gradient-to-tr from-[#CFFDFB] to-[#AF85E4]  text-[#0E3E4E]">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className='flex items-center justify-between mx-4'>
            <label htmlFor="my-drawer-2" className="btn btn-primary bg-[#FF7A92]  rounded-full border-none text-[#fff] drawer-button lg:hidden"><MdOutlineDashboardCustomize />
            </label>
            <button className='btn bg-[#FF7A92] rounded-full border-none text-[#fff] lg:hidden flex items-center gap-2 px-6'><AiOutlineLogout />Logout</button>
          </div>
          <div className='mt-5 md:mt-2 mx-4'>
            <Outlet />
          </div>
        </div>
        <div className="drawer-side ">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-gradient-to-tr  from-[#CFFDFB] to-[#AF85E4]  text-[#0E3E4E] ">
            {/* Sidebar content here */}
            <li className='bg-[#1d232a] rounded-lg'><Link to='/dashboard' className='flex justify-start '> <img src={logo} alt='FoodStuff' className='w-48' /><span className="badge text-[#5d6] badge-outline">admin</span></Link></li>

            <li className='mt-3'><Link to='/dashboard'><MdOutlineSpaceDashboard />Dashboard</Link></li>
            <li><Link to='/'><TbBrandBooking />Manage Bookings</Link></li>
            <li><Link to='/'><MdAddCircleOutline />Add Menu</Link></li>
            <li><Link to='/'><FaRegEdit />Manage Items</Link></li>
            <li className='mb-3'><Link to='/dashboard/users' ><FaUsersViewfinder />Users</Link></li>
            <hr />

            {/*Links*/}
            {sharedLinks}
          </ul>

        </div>
      </div>
    </div>
  )
}
export default DashboardLayout

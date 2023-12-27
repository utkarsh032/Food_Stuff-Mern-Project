import React, { useState } from 'react'
import logo from '/f--d_stuff.png'
import { FaRegUser } from "react-icons/fa";
import Modal from './Modal';

const Navbar = () => {

  const [isSticky, setSticky] = useState(false)

  useState(() => {
    const handleScroll = () => {
      const offSet = window.scrollY
      if (offSet > 0) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }
    return () => {
      window.addEventListener('scroll', handleScroll)
    }
  }, [])

  const navItems = (
    <>
      <li><a className='hover:bg-[#FF7A92]' href='/'>Home</a></li>
      <li>
        <details>
          <summary className='hover:bg-[#FF7A92]'>Menu</summary>
          <ul className="p-2 ">
            <li><a className='hover:bg-[#FF7A92]' href='/menu'>All</a></li>
            <li><a className='hover:bg-[#FF7A92]'>Salad</a></li>
            <li><a className='hover:bg-[#FF7A92]'>Pizza</a></li>
          </ul>
        </details>
      </li>
      <li><details>
        <summary className='hover:bg-[#FF7A92]'>Services</summary>
        <ul className="p-2">
          <li><a className='hover:bg-[#FF7A92]'>Online Order</a></li>
          <li><a className='hover:bg-[#FF7A92]'>Taable Booking</a></li>
          <li><a className='hover:bg-[#FF7A92]'>Order Tracking</a></li>
        </ul>
      </details></li>
      <li><a className='hover:bg-[#FF7A92]'>Offers</a></li>
    </>
  )

  return (
    <header className={`max-w-screen-2xl container mx-auto fixed text-[#fff] top-0 left-0 right-0 transition-all duration-300 ease-in-out`}>
      <div className={`navbar backdrop-blur-3xl  xl:px-24 ${isSticky ? "shadow-md  transition-all duration-500 ease-in-out" : ""}`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2 ">
              {/*list-item */}
              {navItems}

            </ul>
          </div>
          <a className="">
            <img src={logo} alt='foodStuff' className='w-48' />
          </a>

        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 text-lg">
            {/*list-item */}
            {navItems}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {/*cart item*/}
          <button className="btn btn-ghost btn-circle hidden lg:flex hover:bg-[#FF7A92]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>

          {/*cart item*/}
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-3 lg:flex hidden items-center justify-center  hover:bg-[#FF7A92]">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="badge badge-sm indicator-item">0</span>
            </div>
          </div>
          <button className="button"
            onClick={() => document.getElementById('my_modal_3').showModal()}>
            <FaRegUser />Login
          </button>
          <Modal />

        </div>
      </div>
    </header >
  )
}

export default Navbar

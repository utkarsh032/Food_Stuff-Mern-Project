import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

import { AiOutlineLogout } from "react-icons/ai";
import { AiTwotoneSetting } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa6";


const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext)
  const handleLogout = () => {
    logOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div>
      <div className="drawer drawer-end z-50 ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {
                user.photoURL ? <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoURL}
                /> : <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              }
            </div>
          </label>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay "
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-gradient-to-tr from-[#CFFDFB] to-[#AF85E4]  text-[#0E3E4E]">
            {/* Sidebar content here */}
            <li className="hover:bg-[#FF7A92] rounded-lg"> {/* <Profile user={user} />*/}
              <a href="/update-profile">Profile
              </a>
            </li>
            <li className="hover:bg-[#FF7A92] rounded-lg">
              <a><FaOpencart />
                Order</a>
            </li>
            <li className="hover:bg-[#FF7A92] rounded-lg">
              <a><AiTwotoneSetting />
                Setting</a>
            </li>
            <li className="hover:bg-[#FF7A92] rounded-lg">
              <a onClick={handleLogout}><AiOutlineLogout />Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div >
  );
};

export default Profile;
import React from "react";
import logo from '/f--d_stuff.png'
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="max-w-screen-2xl mx-auto bg-gradient-to-br from-[#CFFDFB] to-[#AF85E4]  ">
      <hr />
      <footer className="footer xl:px-24 py-10 px-4 text-[#0E3E4E]">
        <aside>
          <img src={logo} alt='foodStuff' className='w-48' />
          <p className="my-3 md:w-40">
            Savor the artistry where every dish is a culinary masterpiece
          </p>
        </aside>
        <nav>
          <header className="footer-title text-black">Useful links</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Events</a>
          <a className="link link-hover">Blogs</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        <nav>
          <header className="footer-title">Main Menu</header>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Offers</a>
          <a className="link link-hover">Menus</a>
          <a className="link link-hover">Reservation</a>
        </nav>
        <nav>
          <header className="footer-title">Contact Us</header>
          <a className="link link-hover">example@email.com</a>
          <a className="link link-hover">+64 958 248 966</a>
          <a className="link link-hover">Social media</a>
        </nav>
      </footer>
      <hr />
      <footer className="footer items-center xl:px-24 px-4 py-4 mt-2">
        <aside className="items-center grid-flow-col text-[#0E3E4E]">
          <p>Copyright © 2024 - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-[#0E3E4E]">
          <a >
            <FiFacebook className="  " />
          </a>

          <a>
            <FaInstagram />
          </a>

          <a>
            <FiYoutube />

          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
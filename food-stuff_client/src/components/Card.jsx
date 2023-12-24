/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { FaHeart } from 'react-icons/fa'

const Card = ({ item }) => {

  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div to={`/menu/${item._id}`} className="backgroundPrimary text-[#0E3E4E] card w-96 relative mr-5 md:my-5 bg-base-100 shadow-xl cursor-pointer">

      <div className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-[#FC6D87] hover:bg-[#FF7A92] ${isHeartFilled ? "text-rose-500" : "text-white"
          }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>

      <Link to={`/menu/${item._id}`}>
        <figure>
          <img src={item.image} alt={item.name} className='hover:scale-105 transition-all duration-300 md:h-72' />
        </figure>
      </Link>

      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>{item.recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className='font-semibold'><span>$</span>{item.price}</h5>
          <button className="btn button">Buy Now</button>
        </div>
      </div>
      
    </div>
  )
}

export default Card

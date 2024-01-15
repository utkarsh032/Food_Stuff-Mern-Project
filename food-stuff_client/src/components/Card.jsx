/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from 'react-icons/fa'
import { AuthContext } from '../context/AuthProvider'
import Swal from 'sweetalert2'

import axios from 'axios';
import useCart from '../hooks/useCart';

const Card = ({ item }) => {
  const { name, image, price, recipe, _id } = item
  const { user } = useContext(AuthContext)
  const [cart, refetch] = useCart();


  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const navigate = useNavigate()
  const location = useLocation()


  const handleCartAdded = item => {
    // console.log(item);
    if (user && user.email) {
      const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email }

      axios.post('http://localhost:3000/carts', cartItem)
        .then((response) => {
          console.log(response);
          if (response) {
            refetch();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "Added Successfully",
              showConfirmButton: false,
              background: "#CF95FD",
              color: "#0E3E4E",
              iconColor: "#FF7A92",
              timer: 400
            })
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            background: "#CF95FD",
            color: "#0E3E4E",
            iconColor: "#FF7A92",
            timer: 400,
          })
        });
    }
    else {
      Swal.fire({
        title: 'Please login to add',
        icon: 'warning',
        showCancelButton: true,
        background: "#CF95FD",
        iconColor: "#FF7A92",
        color: "#0E3E4E",
        confirmButtonColor: "#FF7A92",
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } })
        }
      })
    }
  }


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
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>{item.recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className='font-semibold'><span>$</span>{item.price}</h5>
          <button className="btn button" onClick={() => handleCartAdded(item)}>Add To Cart</button>
        </div>
      </div>

    </div>
  )
}

export default Card
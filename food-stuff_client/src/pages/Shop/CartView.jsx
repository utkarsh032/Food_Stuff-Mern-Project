import React, { useContext, useState } from 'react'
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'
import { AuthContext } from '../../context/AuthProvider';
import useCart from '../../hooks/useCart';


const CartView = () => {
  const [cart, refetch] = useCart()
  const { user } = useContext(AuthContext)
  const [cartItems, setCartItems] = useState([])

  // calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity
  }

  // decrease items
  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:5000/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // decrease items
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          `http://localhost:5000/carts/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );

        if (response.ok) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          await refetch();
          setCartItems(updatedCart);
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };


  // total price
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item)
  }, 0)

  const orderTotal = cartSubTotal;


  // delete item
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: "#CF95FD",
      confirmButtonColor: "#FF7A92",
      cancelButtonColor: "",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${item._id}`, {
          method: 'DELETE'
        }).then(res => res.json()).then(data => {
          refetch()
          if (data.deletedCount > 0) {
            Swal.fire({
              background: "#CF95FD",
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        })
      }
    });
  }

  return (
    <div className='max-w-screen-2xl  mx-auto '>
      {/*cart  banner*/}
      <div className='xl:px-24 text-[#0E3E4E] bg-gradient-to-tr from-[#CFFDFB] to-[#AF85E4]'>
        <div className='py-48 flex flex-col justify-center items-center gap-8'>
          {/*Text */}
          <div className='text-center px-4 space-y-7'>
            <h2 className='md:text-5xl text-4xl font-bold  md:leading-snug leading-snug'>Items Added To The <span className='text-[#EB2424]'>Cart.</span></h2>
          </div>
        </div>
      </div>

      {/* Table*/}

      <div className='section-container bg-gradient-to-br from-[#CFFDFB] to-[#AF85E4]' >
        <div className="overflow-x-auto  text-[#0E3E4E]">
          <table className="table">
            {/* head */}
            <thead className='bg-[#FF7A92] text-[#fff]'>
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt={item.title} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-bold">{item.name}</td>
                  <td> <button className='btn btn-xs bg-[#FF7A92] text-[#fff] border-none' onClick={() => handleDecrease(item)}>-</button>
                    <input type='number' value={item.quantity} onChange={() => console.log(item.quantity)} className='w-10 mx-2 text-center overflow-hidden bg-transparent appearance-none' />
                    <button className='btn btn-xs  bg-[#FF7A92] text-[#fff] border-none' onClick={() => handleIncrease(item)}>+</button></td>
                  <td>{calculatePrice(item).toFixed(2)}</td>
                  <th><button className="btn rounded-full btn-md  bg-[#FF7A92] text-[#fff] border-none" onClick={() => handleDelete(item)}><MdDelete />
                  </button></th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>

      {/*Customer details */}
      <div className='my-12 section-container text-[#0E3E4E] flex  flex-col md:flex-row justify-between items-start'>
        <div className='md:w-1/2 space-y-3'>
          <h3 className='font-medium'>Customer Details</h3>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>UserId: {user.uid}</p>
        </div>
        <div className='md:w-1/2 space-y-3  flex justify-between'>
          <div></div>
          <div className='md:w-1/2 space-y-3'>
            <h3 className='font-medium'>Shopping Details</h3>
            <p>Total Item: {cart.length}</p>
            <p>Total Amount: $ {orderTotal.toFixed(2)}</p>
            <button className='btn rounded-full btn-md  bg-[#FF7A92] text-[#fff] border-none'>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartView

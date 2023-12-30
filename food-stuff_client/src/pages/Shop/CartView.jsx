import React from 'react'

const CartView = () => {
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
              <tr>
                <td>1</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>


            </tbody>
            {/* foot */}


          </table>
        </div>
      </div>
    </div>

  )
}

export default CartView

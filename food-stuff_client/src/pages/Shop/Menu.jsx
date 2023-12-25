import React from 'react'

const Menu = () => {
  return (
    <div>
      {/*menu banner*/}
      <div className='max-w-screen-2xl  mx-auto xl:px-24 text-[#0E3E4E] bg-gradient-to-tr from-[#CFFDFB] to-[#AF85E4]'>
        <div className='py-48 flex flex-col justify-center items-center gap-8'>
          {/*Text */}
          <div className='text-center px-4 space-y-7'>
            <h2 className='md:text-5xl text-4xl font-bold  md:leading-snug leading-snug'>For the Love of Delicious <span className='text-[#EB2424]'>Food</span></h2>
            <p className='text-xl text-[#0E3E4E] md:w-4/5 mx-auto'>Come with family & feel the joy of mouthwatering food such as Greek Salad, Lasagne, Butternut, Pumpkin, Tokusen Wagyu, Olivas Rellenas and more for a moderate cost</p>
            <button className='button'>Order Now</button>
          </div>

        </div>
      </div >

    </div>
  )
}

export default Menu

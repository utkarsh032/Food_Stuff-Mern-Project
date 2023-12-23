import React from 'react'

function Banner() {
  return (
    <div className='section-container text-[#0E3E4E]'>
      <div className='p-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
        {/*Banner */}
        <div className='md:w-1/2'>
          <img className='' src="/banner.png" alt='FoodStuff' />

          <div className='flex flex-col md:flex-row items-center justify-center -mt-14 gap-4'>
            <div className='flex gap-3 py-2 px-3 rounded-2xl items-center shadow-md  w-64 backgroundPrimary '>
              <img src='/images/home/b-food1.png' alt='spicy noodles' className='rounded-2xl' />
              <div className='space-y-1'>
                <h5 className='font-medium mb-1'>Spicy Noodles</h5>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#FC6D87]" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#FC6D87]" checked />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#FC6D87]" checked />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#FC6D87]" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#FC6D87]" />
                </div>
                <p className='text-[#0E3E4E] font-bold'>$12.00</p>
              </div>
            </div>
            <div className='sm:flex hidden gap-3 py-2 px-3 rounded-2xl items-center shadow-md  w-64 backgroundPrimary '>
              <img src='/images/home/b-food1.png' alt='spicy noodles' className='rounded-2xl ' />
              <div className='space-y-1'>
                <h5 className='font-medium mb-1'>Vegetarian sal</h5>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#FC6D87]" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#FC6D87]" checked />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#FC6D87]" checked />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#FC6D87]" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#FC6D87]" />
                </div>
                <p className='text-[#0E3E4E] font-bold'>$17.00</p>
              </div>
            </div>
          </div>

        </div>
        {/*Text */}
        <div className='md:w-1/2 space-y-7'>
          <h2 className='md:text-5xl text-4xl font-bold  md:leading-snug leading-snug'>it's not just <span className='text-[#EB2424]'>Food</span>, It's an <span className='text-[#FC6464]'>Experience</span>.</h2>
          <p className='text-xl text-[#0E3E4E]'>Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship.</p>
          <button className='button'>Order Now</button>

        </div>

      </div>
    </div >
  )
}

export default Banner

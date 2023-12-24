import React from 'react'

const categoryItems = [
  { id: 1, title: "Main Dish", des: "86(dishes)", image: "/images/home/category/img1.png" },
  { id: 1, title: "Main Dish", des: "86(dishes)", image: "/images/home/category/img1.png" },
  { id: 1, title: "Main Dish", des: "86(dishes)", image: "/images/home/category/img1.png" },
  { id: 1, title: "Main Dish", des: "86(dishes)", image: "/images/home/category/img1.png" }
]

const Categories = () => {
  return (
    <div className='section-container py-16  bg-gradient-to-br from-[#CFFDFB] to-[#AF85E4]'>
      <div className='text-center'>
        <p className='subTitle'>Delicious</p>
        <h2 className='title'>Food Categories</h2>
        {/* cards */}

        <div className='flex flex-col sm:flex-row flex-wrap gap-4 justify-between items-center mt-12'>
          {categoryItems.map((item, i) => (
            <div key={i} className='flex backgroundPrimary shadow-lg rounded-2xl bg-white py-2 px-3 w-64 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all'>
              <div className=' gap-3 py-2 px-3 w-full mx-auto items-center justify-center'>
                <img src={item.image} alt={item.name} className='bg-[#FC6464] p-3 rounded-2xl w-28 h-28' />
              </div>
              <div className='mt-5 space-y-1'>
                <h5 className='text-[#0E3E4E] font-bold'>{item.title}</h5>
                <p className='text-[#0E3E4E]'>{item.des}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Categories;

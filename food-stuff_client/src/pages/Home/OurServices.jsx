import React from 'react'

const serviceList = [
  { id: 1, title: "Catering", des: "Delight your guests with our flavors and  presentation", image: "/images/home/services/icon1.png" },
  { id: 2, title: "Fast delivery", des: "We deliver your order promptly to your door", image: "/images/home/services/icon2.png" },
  { id: 3, title: "Online Ordering", des: "Explore menu & order with ease using our Online Ordering ", image: "/images/home/services/icon3.png" },
  { id: 4, title: "Gift Cards", des: "Give the gift of exceptional dining with Foodi Gift Cards", image: "/images/home/services/icon4.png" },
]

const OurServices = () => {
  return (
    <div className='section-container  py-16 bg-gradient-to-tr from-[#CFFDFB] to-[#AF85E4] text-[#0E3E4E]'>
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/*text*/}
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title">Our Culinary Journey And Services</h2>
            <blockquote className="text-[#EB2424] my-5  leading-[30px]">
              “Rooted in passion, we curate unforgettable dining experiences and offer exceptional services, blending culinary artistry with warm hospitality.”
            </blockquote>
            <button className='button'>Explore</button>
          </div>
        </div>

        {/* avater */}
        <div className="md:w-1/2 text-[#FC6D87] ">
          <div className='grid sm:grid-cols-2 grid-cols-1 gap-8 items-center  '>{serviceList.map((service) => (
            <div key={service.id} className='shadow-xl rounded-lg py-5 px-4 text-center space-y-2 cursor-pointer backgroundPrimary hover:-translate-y-3 transition-all duration-300 '>
              <img src={service.image} alt={service.title} className='mx-auto' />
              <h5 className='pt-3 font-semibold'>{service.title}</h5>
              <p className='text-[#FF7A92]'>{service.des}</p>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  )
}

export default OurServices
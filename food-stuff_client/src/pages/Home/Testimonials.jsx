import React from 'react'
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="section-container py-16 bg-gradient-to-br from-[#CFFDFB] to-[#AF85E4] text-[#0E3E4E]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img src="/images/home/testimonials/testimonials.png" alt="testimonials" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Testimonials</p>
            <h2 className="title">What Our Customers Say About Us</h2>
            <blockquote className="text-[#EB2424] my-5  leading-[30px]">
              “I had the pleasure of dining at Foodi last night, and I'm still
              raving about the experience! The attention to detail in
              presentation and service was impeccable”
            </blockquote>

            {/* avater */}

            <div className="flex items-center gap-4 flex-wrap">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar border-4 border-[#FC6D87]">
                  <div className="w-12 cursor-pointer">
                    <img src="/images/home/testimonials/testimonial1.png" />
                  </div>
                </div>
                <div className="avatar border-4 border-[#FC6D87]">
                  <div className="w-12 cursor-pointer">
                    <img src="/images/home/testimonials/testimonial2.png" />
                  </div>
                </div>
                <div className="avatar border-4 border-[#FC6D87]">
                  <div className="w-12 cursor-pointer">
                    <img src="/images/home/testimonials/testimonial3.png" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <h5 className="text-lg font-semibold">Customer Feedback</h5>
                <div className="flex items-center gap-2"><FaStar className="text-[#FC6D87]" /> <span className="font-medium">4.9</span> <span className="text-[#0E3E4E]">(18.6k Reviews)</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
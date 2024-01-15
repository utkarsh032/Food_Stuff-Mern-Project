import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from '../../components/Card';
import { FaHeart } from "react-icons/fa"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#FC6D87" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#FC6D87" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};

const SpecialDishes = () => {

  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        // console.log(specials)
        setRecipes(specials);
      });
  }, []);

  {/* settings */ }
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  return (
    <div className='section-container bg-gradient-to-tr from-[#CFFDFB] to-[#AF85E4] max-w-screen-2xl mx-auto xl:px-24 px-4 relative' >
      <div className='text-left'>
        <p className='subTitle'>Catering</p>
        <h2 className='title md:w-1/3'>Standout Dishes From Our Menu</h2>
      </div>

      {/*arrow btn*/}

      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button onClick={() => slider?.current?.slickPrev()}
          className="bg-[#0E3E4E] hover:bg-[#FC6D87] text-[#fff] border-none btn p-2 rounded-full ml-5"
        >
          <FaAngleLeft className=" h-8 w-8 p-1" />
        </button>
        <button
          className="bg-[#FC6D87] hover:bg-[#FF7A92] text-[#fff] border-none btn p-2 rounded-full ml-5"
          onClick={() => slider?.current?.slickNext()}
        >
          <FaAngleRight className=" h-8 w-8 p-1" />
        </button>
      </div>
      {/* specialCards */}

      <Slider ref={slider} {...settings} className='overflow-hidden mt-10 space-x-5'>
        {recipes.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </Slider>
    </div >
  )
}

export default SpecialDishes
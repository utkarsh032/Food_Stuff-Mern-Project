import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { FaFilter } from 'react-icons/fa'

const Menu = () => {

  const [menu, setMenu] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOption, setSortOption] = useState("default ")
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/menu.json")
        const data = await response.json()
        setMenu(data)
        setFilteredItems(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])


  // data based on category

  const filterItems = (category) => {
    const filtered = category === "all" ? menu : menu.filter((item) => item.category === category)
    setFilteredItems(filtered)
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  // show all
  const showAll = () => {
    setFilteredItems(menu)
    setSelectedCategory("all")
    setCurrentPage(1)
  }

  const handleSortChange = (option) => {
    setSortOption(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // pagination 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className='max-w-screen-2xl  mx-auto '>
      {/*menu banner*/}
      <div className='xl:px-24 text-[#0E3E4E] bg-gradient-to-tr from-[#CFFDFB] to-[#AF85E4]'>
        <div className='py-48 flex flex-col justify-center items-center gap-8'>
          {/*Text */}
          <div className='text-center px-4 space-y-7'>
            <h2 className='md:text-5xl text-4xl font-bold  md:leading-snug leading-snug'>For the Love of Delicious <span className='text-[#EB2424]'>Food</span></h2>
            <p className='text-xl text-[#0E3E4E] md:w-4/5 mx-auto'>Come with family & feel the joy of mouthwatering food such as Greek Salad, Lasagne, Butternut, Pumpkin, Tokusen Wagyu, Olivas Rellenas and more for a moderate cost</p>
            <button className='button'>Order Now</button>
          </div>

        </div>
      </div >

      {/*menu shop*/}
      <div className='section-container bg-gradient-to-br from-[#CFFDFB] to-[#AF85E4] '>

        {/*filter and sort*/}
        <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>
          <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 text-[#0E3E4E]'>
            <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}> All </button>
            <button onClick={() => filterItems("salad")} className={selectedCategory === "salad" ? "active" : ""} >Salad</button>
            <button onClick={() => filterItems("pizza")} className={selectedCategory === "pizza" ? "active" : ""} >Pizza</button>
            <button onClick={() => filterItems("soup")} className={selectedCategory === "soup" ? "active" : ""} >Soups</button>
            <button onClick={() => filterItems("dessert")} className={selectedCategory === "dessert" ? "active" : ""} >Deserts</button>
            <button onClick={() => filterItems("drinks")} className={selectedCategory === "drinks" ? "active" : ""} >Drinks</button>
          </div>

          {/*sorting*/}
          <div className='flex justify-end  items-center gap-1 px-1 bg-[#FC6D87]'>
            <div>
              <FaFilter className='h-4 w-4 text-[#fff] ' />
            </div>

            <select name="sort" id='sort' onChange={(e) => handleSortChange(e.target.value)} value={sortOption} className='bg-[#FC6D87] text-[#fff] px-2 py-1 rounded-sm'>
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>

          </div>
        </div>

        {/* product card */}

        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-6'>
          {currentItems.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </div>


      {/*pagination */}
      <div className="flex justify-center bg-gradient-to-tr from-[#CFFDFB] to-[#AF85E4]  py-8 text-[#fff]">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-[#FC6D87] " : "bg-[#949292]"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

    </div>
  )
}

export default Menu

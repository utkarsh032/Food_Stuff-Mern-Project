import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'

const Menu = () => {

  const [menu, setMenu] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOption, setSortOption] = useState("default ")

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
  }

  // show all
  const showAll = () => {
    setFilteredItems(menu)
    setSelectedCategory("all")
  }

  const handleSortChange = (option) => {
    setSortOption(option)

    let sortedItems = [...filterItems]

    switch (option) {
      case 'A-Z':
        sortedItems.sort((a, b) => a.name.localCompare(b.name))
        break;

      case 'Z-A':
        sortedItems.sort((b, a) => b.name.localCompare(a.name))
        break;


      case 'low-to-high':
        sortedItems.sort((a, b) => a.price - b.price)
        break;

      case 'high-to-low':
        sortedItems.sort((a, b) => b.price - a.price)
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems)

  }


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

      {/*menu shop*/}
      <div className='section-container bg-gradient-to-br from-[#CFFDFB] to-[#AF85E4] '>

        {/*filter and sort*/}
        <div className='flex justify-between text-[#0E3E4E]'>
          <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 text-[#0E3E4E]'>
            <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}> All </button>
            <button onClick={() => filterItems("salad")} className={selectedCategory === "salad" ? "active" : ""} >Salad</button>
            <button onClick={() => filterItems("pizza")} className={selectedCategory === "pizza" ? "active" : ""} >Pizza</button>
            <button onClick={() => filterItems("soup")} className={selectedCategory === "soup" ? "active" : ""} >Soups</button>
            <button onClick={() => filterItems("dessert")} className={selectedCategory === "dessert" ? "active" : ""} >Deserts</button>
            <button onClick={() => filterItems("drinks")} className={selectedCategory === "drinks" ? "active" : ""} >Drinks</button>
          </div>

          <div>filter</div>
        </div>

        {/* product card */}
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-6'>
          {filteredItems.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>

      </div >

    </div >
  )
}

export default Menu

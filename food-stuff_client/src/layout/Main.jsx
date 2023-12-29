import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../App.css'
import Footer from '../components/Footer'
import LoadingAnimation from '../components/LoadingAnimation'
import { AuthContext } from '../context/AuthProvider'

const Main = () => {
  const { loading } = useContext(AuthContext)
  return (
    <div className="backgroundPrimary">
      {loading ? <LoadingAnimation /> :
        <div className=''>
          <Navbar />
          <Outlet />
          <Footer />
        </div>}
    </div>
  )
}

export default Main;
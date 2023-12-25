import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../App.css'
import Footer from '../components/Footer'

export default function Main() {
  return (
    <div className="backgroundPrimary">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

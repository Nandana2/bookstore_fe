import React from 'react'
import { IoHome } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaBook } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";





function AdminSidebar() {


    const location=useLocation()
    const [collapse,setCollapse]=useState(false)
  return (
    <>
    <div className='bg-blue-100 min-h-full flex flex-col items-center justify-center py-10'>
        <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt=""  className='w-[50%] h-[50%] rounded-5xl'/>
      <h1 className='my-3 font-semibold flex items-center gap-4'>Admin
        <button onClick={()=>{setCollapse(!collapse)}}>
            <GiHamburgerMenu />
        </button>
      </h1>
      {
        !collapse && 
                <div>
    <div className='flex gap-2 items-center my-3'>
      <input type="radio" name="sidebar" id="home"    checked={location.pathname==='/admin-dashboard'}/>{' '}
      <Link to={'/admin-dashboard'}>
      <label htmlFor="home" className='flex gap-2 items-center'>
        <IoHome/>
         Home
      </label>
      </Link>
    </div>


 <div className='flex gap-2 items-center my-3'>
    
      <input type="radio" name="sidebar" id="home" checked={location.pathname==='/admin-books'} />{' '}
      <Link to={'/admin-books'}>
      <label htmlFor="home" className='flex gap-2 items-center'>
        <FaBook/>
         Books
      </label>
      </Link>
    </div>




     <div className='flex gap-2 items-center my-3'>
      <input type="radio" name="sidebar" id="home" checked={location.pathname==='/admin-career'} />{' '}
      <Link to={'/admin-career'}>
      <label htmlFor="home" className='flex gap-2 items-center'>
        <FaBagShopping />
         Career
      </label>
      </Link>
    </div>





 <div className='flex gap-2 items-center my-3'>
      <input type="radio" name="sidebar" id="home"  checked={location.pathname==='/admin-settings'}/>{' '}
      <Link to={'/admin-settings'}>
      <label htmlFor="home" className='flex gap-2 items-center'>
        <IoIosSettings />
         Settings
      </label>
      </Link>
    </div>

    </div>
      }
  
       </div>
    </>
  )
}

export default AdminSidebar

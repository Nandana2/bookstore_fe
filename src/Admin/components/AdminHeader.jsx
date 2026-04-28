import React from 'react'
import { IoPower } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminHeader() {

  const navigate=useNavigate()

  const adminLogout=()=>{
    sessionStorage.clear()
    navigate('/')
    toast.success("Logout Successfully")
  }
  return (
    <>
    <div className='w-full p-5 flex justify-between'>
      <div className='flex items-center gap-1'>
        <img src="/headerlogo.png" alt=""  className='w-[50px]'/>
        <span className='text-xl'>Book Store</span>
      </div>
      <button onClick={adminLogout} className='flex items-center gap-2 border rouded-lg p-3 hover:bg-black hover:text-white'>
      <IoPower />
      Logout
      </button>
    </div>
    <div className='bg-black text-white p-2'>
    <marquee behavior="" direction="">
      Welcome, Admin! You're all set to manage and monitor the system. Let's get to work!
    </marquee>
    </div>
    </>
  )
}

export default AdminHeader
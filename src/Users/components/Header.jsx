import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { toast } from 'react-toastify';
import base_url from '../../services/base_url';

import { profileContext } from '../../contextApi/ContextApi';
import { useContext } from 'react';
import { authRoleContext } from '../../ContextApi/AuthContextApi';

function Header() {

  const [menuState,setMenuState] = useState(false)
  const [username,setUsername] = useState("")
  const [dropdownStatus,setDropdownStatus] = useState(false)
  const [profilePicture,setProfilePicture] =useState("")
  const {profileStatus,setProfileStatus} = useContext(profileContext)
  const navigate = useNavigate()

  const {setRole}= useContext(authRoleContext)

  useEffect(()=>{
     if(sessionStorage.getItem('uname')){
     setUsername(sessionStorage.getItem('uname'))
     setProfilePicture(sessionStorage.getItem('dp'))
     }
     else{
      setUsername("")
     }
  },[profileStatus])

  const signout=()=>{
    sessionStorage.clear()
    setProfilePicture("")
    toast.success("Logout successfull")
    navigate('/login')
    setRole("")
  }

  return (
    <>
       <div className='grid grid-cols-3 p-3'>
        {/* Logo */}
        <div className="flex item-center gap-2">
          <img src="/Books.png" alt="" className='w-[90px] h-[80px]'/>
          <h1 className='text-2xl font-bold md:hidden'>BOOKSTORE</h1>
        </div>
        {/* Title */}
        <div className="md:flex justify-center items-center hidden">
          <h1 className='text-3xl font-bold'>BOOK STORE</h1>
        </div>
        {/* Login link */}
        <div className='md:flex justify-end items-center gap-2 hidden'> 
          <FaInstagram style={{fontSize:'25px'}}/>
          <RiTwitterXLine style={{fontSize:'25px'}}/>
          <FaFacebookF style={{fontSize:'22px'}}/>
          {/* Login button */}
          {
              username ?
              <div className='flex-relative'>
                <button onClick={()=>(setDropdownStatus(!dropdownStatus))} className='px-2 py-1 border-3 rounded-lg flex gap-3 items-center'>
                  <img src={profilePicture?(profilePicture.startsWith("https://lh3.googleusercontent.com")?profilePicture:`${base_url}/uploadImg/${profilePicture}`):
                  "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"} alt="profilelogo"
                   width={'55px'}/>
                   {username}
                </button>
                {
                  dropdownStatus &&
                  <ul className='border text-sm absolute right-0 z-10 rounded-md bg-white-bottom-15'>
                  <li className='border-b px-2 py-1'><Link to={'/user-profile'}>profile</Link></li>
                  <li className='px-2 py-1'>
                  <button className='text-red-600 cursor-pointer' onClick={signout} >Sign Out</button></li>
                </ul>
                 }
              </div>
               
              :
              <>
                <Link to={'/login'}>
                  <button className='flex items-center border border-black rounded px-2 py-2 hover:bg-black hover:text-white'>
                    <FaUser />
                    Login
                  </button>
                </Link>
              </>
            }
        </div>
       </div>
       <nav className='w-full p-3 bg-gray-900 text-white md:flex justify-center items-center'>
        {/* Menubar & Login */}
        <div className="flex justify-between md:hidden">
          <button onClick={()=>setMenuState(!menuState)}> 
           <GiHamburgerMenu />
          </button>
          {/* Login Button */}
           {
              username ?
              <div className='flex-relative'>
                <button onClick={()=>(setDropdownStatus(!dropdownStatus))} className='px-2 py-1 border-3 rounded-lg flex gap-3 items-center'>
                  <img src={profilePicture?(profilePicture.startsWith("https://lh3.googleusercontent.com")?profilePicture:`${base_url}/uploadImg/${profilePicture}`):
                  "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"} alt="profilelogo"
                   width={'55px'}/>
                   {username}
                </button>
                {
                  dropdownStatus &&
                  <ul className='border text-sm absolute right-0 z-10 rounded-md bg-white-bottom-15'>
                  <li className='border-b px-2 py-1'><Link to={'/user-profile'}>profile</Link></li>
                  <li className='px-2 py-1'>
                  <button className='text-red-600 cursor-pointer' onClick={signout} >Sign Out</button></li>
                </ul>
                 }
              </div>
               
              :
          <Link to={'/login'}>
            <button  className='flex items-center border border-white  rounded px-2 py-2 hover:bg-black text-white'>
              <FaUser/>
              Login
            </button>
          </Link>}
        </div>
        <ul className={menuState?'flex flex-col md:flex-row md:gap-2':'md:flex justify-center items-center gap-2 hidden'}>
          <Link to={'/'}>Home</Link>
          <Link to={'/books'}>Books</Link>
          <Link to={'/career'}>Careers</Link>
          <Link to={'/contact'}>Contact</Link>
        </ul>
       </nav>
    </>
  )
}

export default Header
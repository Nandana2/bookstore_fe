import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";






function Footer() {
  return (
    <>
    <div className='md:grid grid-cols-3 bg-gray-900 text-white p-10 md:gap-9'>
        <div>
          <h4 className='font-bold'>ABOUT US</h4>
          <p className='text-justify mt-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vel sunt nostrum explicabo molestiae? Tempora eum voluptatum ipsum dolore, repellat iusto cumque esse inventore qui id beatae ipsa laboriosam libero?</p>
        </div>
        <div>
          <h4 className='font-bold'>NEWSLETTER</h4>
          <p className='my-5'>Stay updated with our latest trends </p>
          <div className='flex'>
          <input type="text" name="" id="" placeholder='Email ID'  className='p-1 placeholder-gray-500  bg-white'/>
          <button className='bg-yellow-400 py-2 px-2'>
            <FaArrowRight />

          </button>
          </div>
          </div>
        <div>
        <h4 className="font-bold">FOLLOW US</h4>
        <p className="my-5">Let us be social</p>
        <div className='flex gap-3'>
          <FaInstagram/>
          <FaFacebook/>
          <FaXTwitter/>
          <FaLinkedin/>
        </div>
       </div>

        
    </div>
    <div className='bg-black p-2 text-center text-white text-xs'>
 Copyright &copy; 2026 Allrights  Reserved | This website is made by <IoMdHeart className='inline  text-yellow-500'  /> Nandana
</div>
        
    </>
  )
}

export default Footer

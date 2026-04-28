import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../Components/Footer'
import { FaPen } from "react-icons/fa";

function Settings() {
  return (
    <>
    <AdminHeader/>
      <div className='min-h-[60vh] md:grid grid-cols-4'>
          <div className='col-span-1'>
             <AdminSidebar/>
          </div>
          <div className='col-span-3'>
            <h1 className='text-center text-3xl my-5'>
             Admin Settings
            </h1>
            <div className='md:grid grid-cols-2'>
              <div className='p-3'>
              <p className='text-justify'>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eveniet, soluta quibusdam, molestias distinctio aliquid, facilis animi in non obcaecati perspiciatis commodi itaque voluptates alias neque officiis esse error. Eveniet.
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit excepturi in laudantium temporibus voluptatem facilis veritatis libero expedita iste, cupiditate cum aspernatur! Id nostrum commodi unde maiores ea cupiditate atque?
         
              </p>
              <p className='text-justify mt-2'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, iure id, iste eligendi repellendus ea consequatur deserunt nesciunt perferendis illo doloremque, unde magni. Libero assumenda praesentium suscipit eos consectetur aliquam.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi architecto temporibus quas laudantium, nesciunt quia excepturi porro pariatur deserunt exercitationem, modi error debitis ex, sed ratione ab ipsam at consectetur.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit alias temporibus, ad adipisci dolores autem consequatur tempora doloremque molestiae unde laudantium ratione veniam aspernatur, inventore totam nemo illo rerum repellat!
              </p>
              </div>
              <div className='p-2'>
                <div className='w-full h-full bg-sky-100 py-4 px-5'>
              <div className='relative'>
                <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt=""  className='w-[60%] h-[60%] mx-auto'/>
               <label htmlFor="file">
                <input type="file" name="" id="file" className='hidden' />
                <span className='bg-yellow-400 p-3 text-white rounded-xl absolute bottom-2 right-45 '>
                  <FaPen/>
                </span>
               </label>
              </div>
               <input type="text" className='w-full bg-white border rounded-sm my-5 py-2' placeholder='Username' />
               <input type="text" className='w-full bg-white border rounded-sm mb-5 py-2 ' placeholder='Password' />
               <input type="text" className='w-full bg-white border rounded-sm mb-5 py-2' placeholder='Confirm password' />
               <div className='mb-4 grid grid-cols-2 gap-2'>
                <button className='bg-red-500 text-white  hover:bg-white hover:border-red-500  hover:text-red-500     p-3'>
                       Reset
                </button>
                 <button className='bg-green-500 text-white hover:bg-white hover:border-green-500  hover:text-green-500 p-3'>
                       Update
                </button>

               </div>

              
                </div>

              </div>
             




            </div>

          </div>
      </div>
       <Footer/>
       </>
  )
}

export default Settings

import React, { useEffect, useState } from 'react'

import Footer from '../../Components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { Link } from 'react-router-dom'
import base_url from '../../services/base_url'
import { getAdminAllBooksApi,getAdminAllUsersApi,adminApproveBookApi } from '../../services/allApis'
import { toast } from 'react-toastify'
function BookList() {


  const[bookStatus,setBookStatus]=useState(true)
  const[userStatus,setUserStatus]=useState(false)
  const[bookList,setBookList]=useState([])
  const[userList,setUserList]=useState([])


useEffect(()=>{
if(bookStatus){
  getBookList()
}
if(userStatus){
  getUserList()
}
},[userStatus])


const getBookList=async () =>{
  const response = await getAdminAllBooksApi()
  if(response.status ===200){
    console.log(response.data)
    setBookList(response.data)
  }
  else{
    console.log(response)
  }
}
const getUserList=async () =>{
  const response =await getAdminAllUsersApi()
  if(response.status===200){
    console.log(response.data)
    setUserList(response.data)
  }
  else{
    console.log(response)
  }
}

const getApprovedBooks=async(id)=>{
  const response=await adminApproveBookApi(id)
  if(response.status===200){
    console.log(response.data)
    toast.success("Book Approved")
    getBookList()
  }
  else{
    toast.error("Something went wrong")
  }
}


  return (
    <>
      <AdminHeader/>
        <div className='min-h-[60vh] grid grid-cols-1 md:grid-cols-4'>
          <div className='md:col-span-1'>
            <AdminSidebar/>
          </div>
          <div className='md:col-span-3 px-2 md:px-5'>
            <h2 className='text-center text-2xl my-5'>Resourse</h2>
            <div className='flex justify-center items-center text-sm md:text-base'>
              <div onClick={() =>{ setBookStatus(true); setUserStatus(false);}}
                className={bookStatus? "p-3 border-l border-r border-t rounded-t-sm  border-gray-600  text-blue-500":
                  "p-3 border-b border-gray-600 cursor-pointer"}>
                    All Books
              </div>
              <div onClick={() => {setBookStatus(false);setUserStatus(true);}}
                className={userStatus?"p-3 border-l border-r border-t rounded-t-sm  border-gray-600  text-blue-500":
                "p-3 border-b border-gray-600 cursor-pointer"}>
                Users
              </div>
            </div>
            {
              bookStatus &&
              <div className='px-10 py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center'>
                {/* Card */}
                {
                  bookList.length >0 ?
                  <>

                  {
                    bookList.map(item=>(

                  
                     <div className="p-2 w-full max-w-[16rem] shadow-xl text-center rounded-lg">
                      <Link to={'/books/1/view'}>
                  <img src={item?.image} alt="" 
                    style={{height:"300px" , width:'100%'}}/>
                    </Link>
                  <h2 className="text-2xl">{item?.title}</h2>
                  <p>{item?.abstract.slice(0,10)}...</p>
                  <h4 className='text-lg text-blue-500'>&#8377;{item?.price}</h4>
                  {
                    item?.status == "pending" ?
                 <button onClick={()=>{getApprovedBooks(item?._id)}} className='bg-green-500 text-white border border-green-600 w-full py-2 hover:bg-white hover:text-green-700'>Approve</button>
                   :
                   <h2 className='text-green-800'>Approved</h2>
                  }
                 </div>
                    ))
                  }
                  </>
                  :
                  <h2 className='text-red-800'>No Books Available</h2>
                }
               
                
              </div>
            }
            {
              userStatus &&
              <div className='px-10 py-5 flex flex-wrap justify-around gap-5'>
                {/* user cards */}

                {
                  userList.length > 0 ?
                  <>
                  {
                    userList.map(item=>(

                       <div className='max-w-[18rem] border bg-gray-100 py-2 px-4'>
                  <h1 className="text-center my-4 text-amber-900">ID :{item?._id}</h1>
                  <div className='grid grid-cols-3 gap-3'>
                    <div className='col-span-1'>
                    <img src={item?.profile?(item?.profile.startsWith("https://lh3.googleusercontent.com")?item?.profile:`${base_url}/uploadImg/${item?.profile}`):
                  "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"} width={'150px'}
          />
                    </div>
                    <div className='col-span-2 flex flex-col justify-center'>
                      <h2 className="text-blue-600 text-lg">{item?.username}</h2>
                      <p className='text-green-700'>{item?.email}</p>
                    </div>
                  </div>
                </div>
                    ))
                  }
                    

                



                  </>
                  :
                  <h1>NO Users</h1>
                }
               
                
                
                
              </div>
            }
          </div>
        </div>
      <Footer/>
    </>
  )
}

export default BookList
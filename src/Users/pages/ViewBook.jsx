import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../../Components/Footer";
import { FaEye } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getBookByIdApi, purchaseBookApi } from "../../services/allApis";
import {loadStripe} from '@stripe/stripe-js';
import { toast } from "react-toastify";


function ViewBook() {

const[modalStatus,setmodalStatus]=useState(false)
const [bookData,setBookData]=useState({})
const{id}=useParams()
console.log(id)


useEffect(()=>{
  if(sessionStorage.getItem('token')){
    getBookData()
  }
},[])

const getBookData=async()=>{
  const response=await getBookByIdApi(id)
  console.log(response.data)
  if(response.status===200)
  {
    setBookData(response?.data)
  }
}


const handlePayment=async()=>{
const stripe = await loadStripe('pk_test_51TPEITIfTjffm9TJXzeUlCpRTYkGKBZeGmP3fqLY3WZFaFV2rDG5heeVokzOcuPUwqioiXzZZcijjCEyl49QinUG00VMgZYZNb');
const response=await purchaseBookApi(bookData)
if(response.status===200){
if(response.data.checkoutPaymentUrl){
  window.location.href=response.data?.checkoutPaymentUrl
}
else{
  toast.warning("Payment Gateway Error")
}
}
else{
  toast.error("Something went wrong")
}
}

  return (
    <>
      <Header/>
      <div className="min-h-[60vh] p-5">
        <div className="border p-2 md:grid grid-cols-4">
          <div className="col-span-1">
            <img
              src={bookData?.image}
              alt="book"
            />
          </div>
          <div className="col-span-3">
            <h1 className="text-center font-bold">
          {bookData?.title}
            </h1>
            <p className="text-center text-violet-600">Author:{bookData?.author}</p>
             <div className='flex justify-end' >
              <button className="text-xl text-gray-500">
                <FaEye className="text-xl text-gray-500" onClick={()=>{setmodalStatus(true)}} />
              </button>

             </div>
            <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-3">

                <span className="font-semibold">Publisher:{bookData?.publisher}</span>
                <span className="font-semibold">Language:{bookData?.language}</span>
                <span className="font-semibold">noofPages:{bookData?.noOfPages}</span>
              
                <span className="font-semibold">
                  Seller Mail : {bookData?.userMail}
                </span>
                <span className="font-semibold">Price:{bookData?.price}</span>
                <span className="font-semibold">ISBN:{bookData?.isbn}</span>
              </div>
              <p className="my-5 text-justify">
               {bookData?.abstract}
              </p>



              <div className="gap-4 flex justify-end " >
            <button className="bg-blue-800 p-4 rounded-xl flex items-end">
             <MdKeyboardDoubleArrowLeft  className="text-xl "/>
             Back
            </button>
            <button className="bg-red-700 p-4 rounded-xl" onClick={handlePayment}>
              Buy <span className="text-yellow-400">${bookData?.discountPrice}</span>
            </button>
          </div>

            </div>


          
          </div>

{
   modalStatus && 
   <div className="relative z-10 " onClick={()=>{setmodalStatus(false)}}>
    <div className="bg-gray-500/75 fixed inset-0">
       <div className="flex justify-center items-center min-h-screen">
        <div style={{height:'500px',width:'900px'}} className='bg-white rounded-2xl'>
         <div className="bg-black text-white flex justify-between items-center p-3 rounded-t-2xl"> 
          <h1 className="text-xl">
           Book Images
          </h1>
          <button>
               <IoClose/>
          </button>
         </div>
         <h2 className="text-lg text-blue-600 flex gap-3 items-center m-3">
             <FaCamera/>
             Camera click of the book in the hand of seller
         </h2>

         {/* image */}

       {/* Image */}
                  
                    
                      <div className="flex overflow-x-auto justify-between items-center"> 
                    {
                      bookData?.uploadImg?.length>0 ?
                      <>
                      {
                        bookData?.uploadImg?.map(item=>(
                          <img src={`${base_Url}/uploadImg/${item}`} alt="" width={'300px'}/>
                        ))
                      }
                      </>
                      :
                      <h2 className="text-2xl text-red-600">No Book images !!!</h2>
                    }
                  
                  </div>


        </div>

       </div>
    </div>

    </div>

}




        </div>
    
      <Footer/>
    </>
  );
}

export default ViewBook;
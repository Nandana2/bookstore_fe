import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header'
import Footer from '../../Components/Footer'

import { FaLocationDot } from "react-icons/fa6";
import { RiShareForward2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { applyJobPostApi, ListJobPostApi } from '../../services/allApis';
import { useRef } from 'react';
import { toast } from 'react-toastify';

function Career() {

    const [modalStatus, setModalStatus] = useState(false);
    const [careerList,setCareerlist]=useState([])
    const [loginStatus,setLoginStatus]=useState("")
    const [searchKey,setSearchKey]=useState("")  
    const [careerData,setCareerData]=useState([])
    
    const fileInputRef=useRef()
    useEffect(()=>{
      if(sessionStorage.getItem('token')){
        getCareerList()
        setLoginStatus(sessionStorage.getItem('token'))
      }
      else{
        setLoginStatus("")
      }
    },[searchKey])


    const openModal=(id,title)=>{
      setModalStatus(true)
      setCareerData({...careerData,jobId:id,jobTitle:title})
    }

    const getCareerList=async()=>{
      const response =await ListJobPostApi(searchKey)
      if(response.status===200){
        console.log(response.data)
        setCareerlist(response.data)
      }
      else{
        console.log(response)
      }
    }

    const handleReset=()=>{
      setCareerData({
        fullname:"",qualification:"",email:"",phone:"",coverletter:"",resume:""

      })
      fileInputRef.current.value=""
    }
const handleApplyJob=async()=>{
  console.log(careerData)
  const {fullname,qualification,email,phone,coverletter,resume,jobId,jobTitle}=careerData
  if(!fullname || !qualification || !email || !phone || !resume || !jobId || !jobTitle){
    toast.warning("Enter Valid Inputs")
  }
  else{
    const formData=new FormData()
    for(let i in careerData){
       formData.append(i,careerData[i])
    }
    const response=await applyJobPostApi(formData)
    if(response.status===200){
      toast.success("Application send ")
      handleReset()
      setModalStatus(false)
    }
    else{
      toast.error("Something went wrong")
        console.log(response)
        if(response.data){
          toast.info(response.data)
        }
      
    }
  }


}

  return (
    <>
    <Header/>
      <div className='min-h-[60vh] px-5 py-10 md:px-40'>
        {/* imtro */}
        <h1 className="text-5xl text-center">Career</h1>
        <p className="text-justify my-5">
          Your career is more than just a job — it’s a journey of growth, learning, and self-discovery. Choosing the right career path allows
          you to explore your passions, develop valuable skills, and achieve both personal and professional goals. With the right 
          opportunities and continuous effort, you can build a future that reflects your ambitions and strengths. Every experience, 
          whether success or failure, contributes to shaping your career and guiding you toward long-term success and fulfillment.
        </p>
        {/* Current openings */}
        <div className="w-full mt-10">
          <h1 className="text-3xl">Current Openings</h1>
          
          {/* Job list */}
          {
            loginStatus ?
            <div className='w-full'>
              <div className='flex justify-center my-5'>
                <input onChange={(e)=>{setSearchKey(e.target.value)}} type="text" className='border py-2 px-2' placeholder='Job Title' />
              </div>
              {
                careerList.length>0 ?
                <>
                  {
                    careerList.map(career=>(
                      <div className=' shadow-lg py-3 px-2 md:grid grid-cols-7 mb-4'>
                <div className="col-span-6">
                  <h1 className="text-lg mb-2">{career?.title}</h1>
                  <hr/>
                  <p className="mt-5 flex gap-2 items-center"><FaLocationDot className='text-blue-800' />Location :{career?.location}</p>
                  <p className="mt-5">Job Type {career?.jobType}</p>
                  <p className="mt-5">Salary : {career?.salary}</p>
                  <p className="mt-5">Qualification :{career?.qualification}</p>
                  <p className="mt-5">Experience:{career?.experience}</p>
                  <p className="mt-5">Description :{career?.description}</p>
                </div>
                <div className='px-10'>
                  <button className='bg-blue-800 text-white px-3 py-3 rounded-sm flex items-center' onClick={() => openModal( career?._id,career?.title )}>
                    Apply 
                    <RiShareForward2Fill />
                  </button>
                </div>
              </div>
                    ))
                  }
                </>
                :
                <h2 className="text-center text-red-600 text-xl">NoJobs posted yet</h2>
              }
          </div>
          :
          <div className="min-h-[60vh] py-10 px-5 flex flex-col justify-center items-center">
            <img src="./logintry.jpg" alt="logn_req_img" className="w-[30%]"/>
            <p className="text-xl ">Please{" "}  
              <Link to={"/login"} className="text-blue-500 underline"> Login</Link>
              To View Career Openings
            </p>
          </div>
          }
          
          {modalStatus && (
            <div className="relative z-10" >
              <div className="bg-gray-500/75 fixed inset-0">
                <div className="flex justify-center items-center min-h-screen">
                  <div style={{width: "500px" }} className="bg-white rounded-2xl ">
                    <div className="bg-black text-white flex justify-between items-center p-3 rounded-t-2xl">
                      <h1 className="text-2xl font-bold">Application Form</h1>
                      <button onClick={()=>setModalStatus(false)}>
                        <IoClose />
                      </button>
                    </div>
                    <div className="p-5">
                      <div className='grid grid-cols-2 gap-4 mb-5'>
                        <input type="text" placeholder="Full Name" value={careerData.fullname} onChange={(e)=>{setCareerData({...careerData,fullname:e.target.value})}} className="p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2"/>
                        <input type="text" placeholder="Qualification" value={careerData.qualification} onChange={(e)=>{setCareerData({...careerData,qualification:e.target.value})}} className="p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2"/>
                        <input type="text" placeholder="Email Id" value={careerData.email} onChange={(e)=>{setCareerData({...careerData,email:e.target.value})}} className="p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2"/>
                        <input type="text" placeholder="Phone Number" value={careerData.phone} onChange={(e)=>{setCareerData({...careerData,phone:e.target.value})}} className="p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2"/>
                      </div>
                      <textarea name="" placeholder="Cover Letter" value={careerData.coverletter} onChange={(e)=>{setCareerData({...careerData,coverletter:e.target.value})}} className="p-2 border bg-white placeholder-gray-600 rounded-sm w-full " id=""></textarea>
                      <div className='my-3'>
                        <label htmlFor=""  className='text-lg justify-end text-gray-600'>Resume</label>
                        <input type="file" name='' ref={fileInputRef} id='' onChange={(e)=>{setCareerData({...careerData,resume:e.target.files[0]})}} className='border w-full border-gray-500 cursor-pointer file:bg-gray-400 file:p-1 cursor-pointer'/>
                      </div>
                    </div>
                    <div className="bg-gray p-3 flex justify-end gap-2 rounded-b-2xl">
                      <button className="p-2 border rounded-sm bg-red-500 text-white hover:bg-white hover:border-red-600 hover:text-red-500" onClick={handleReset}>Reset</button>
                      <button className="p-2 border rounded-sm bg-green-700 text-white hover:bg-white hover:border-green-600 hover:text-green-500" onClick={handleApplyJob}>Add</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default Career
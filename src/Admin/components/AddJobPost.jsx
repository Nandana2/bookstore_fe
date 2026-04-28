import { useState } from "react"
import React   from 'react'
import { IoClose } from "react-icons/io5"
import { FaPlus } from "react-icons/fa";
import { adminAddJobPostApi } from "../../services/allApis";
import { toast } from "react-toastify";


function AddJobPost() {

  const[modalStatus,setmodalStatus]=useState(false)
 const[jobData,setJobData]=useState({
    title:"",location:"",jobType:"",salary:"",experience:"",qualification:"",description:""
 })


 const handleReset=()=>{
    setJobData({
         title:"",location:"",jobType:"",salary:"",experience:"",qualification:"",description:""
    })
 }


 const handleSubmit=async()=>{
    console.log(jobData)
    const{title,location,jobType,salary,experience,qualification,description}=jobData
   if(!title || !location || !jobType || !salary || !experience || !qualification || !description){
    toast.warning("Enter Valid Inputs")
   }
   else{
    const response=await adminAddJobPostApi(jobData)
    if(response.status===200){
        toast.success("Job Post Added ")
        handleReset()
        setmodalStatus(false)
    }
    else{
        console.log(response)
        toast.error("Something Went Wrong")
        if(response?.data){
            toast.info(response?.data)

        }
    }
   }

 }

  return (
    <>
    <button className='bg-green-800 text-white p-2 flex flex-wrap items-center gap-1 border border-green-800 rounded-sm hover:bg-white hover:text-green-700' onClick={()=>{setmodalStatus(true)}}>Add Job  <FaPlus/> </button>
      {
            modalStatus && 
            <div className="relative z-10 " >
             <div className="bg-gray-500/75 fixed inset-0">
                <div className="flex justify-center items-center min-h-screen">
                 <div style={{minHeight:'500px',width:'500px'}} className='bg-white rounded-2xl'>
                  <div className="bg-black text-white flex justify-between items-center p-3 rounded-t-2xl"> 
                   <h1 className="text-xl">
                     Application Form
                   </h1>
                   <button onClick={()=>setmodalStatus(false)}>
                        <IoClose/>
                   </button>
                  </div>
                      <div className='p-6'>
                          <input type="text" className='p-2 border bg-white placeholder:text-gray-600 rounded-sm w-full mb-3' id="" placeholder='Job Title' value={jobData.title} onChange={(e)=>{setJobData({...jobData,title:e.target.value})}} />
                          <input type="text" className='p-2 border bg-white placeholder:text-gray-600 rounded-sm w-full mb-3' id="" placeholder='Location' value={jobData.location} onChange={(e)=>{setJobData({...jobData,location:e.target.value})}}/>
                          <input type="text" className='p-2 border bg-white placeholder:text-gray-600 rounded-sm w-full mb-3' id="" placeholder='Job Type'value={jobData.jobType} onChange={(e)=>{setJobData({...jobData,jobType:e.target.value})}} />
                          <input type="text" className='p-2 border bg-white placeholder:text-gray-600 rounded-sm w-full mb-3' id="" placeholder='Salary' value={jobData.salary} onChange={(e)=>{setJobData({...jobData,salary:e.target.value})}} />
                          <input type="text" className='p-2 border bg-white placeholder:text-gray-600 rounded-sm w-full mb-3' id="" placeholder='Qualification' value={jobData.qualification} onChange={(e)=>{setJobData({...jobData,qualification:e.target.value})}}/>
                          <input type="text" className='p-2 border bg-white placeholder:text-gray-600 rounded-sm w-full mb-3' id="" placeholder='Experience' value={jobData.experience} onChange={(e)=>{setJobData({...jobData,experience:e.target.value})}}/>
                          <textarea name="" id="" className='p-2 border bg-white placeholder:text-gray-600 rounded-sm w-full mb-3' placeholder='Description'value={jobData.description} onChange={(e)=>{setJobData({...jobData,description:e.target.value})}}></textarea>

                        </div>
                        <div className='bg-gray-200 p-3 flex justify-end gap-3 rounded-b-2xl'>
                          <button  onClick={handleReset}   className='p-2 border rounded-sm  bg-red-600 text-white hover:bg-white hover:border-red-600 hover:text-red-600 '>
                              Reset
                          </button >
                          <button onClick={handleSubmit} className='p-2 border rounded-sm  bg-green-600 text-white hover:bg-white hover:border-green-600 hover:text-green-600 '>
                              Add
                          </button>
                        </div>
         
         
                 </div>
         
                </div>
             </div>
         
             </div>
         
         }
    </>
  )
}

export default AddJobPost

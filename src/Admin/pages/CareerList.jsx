import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../../components/Footer";
import AddJobPost from "../components/AddJobPost"
import base_url from "../../services/base_url";

import { FaLocationDot } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

import { adminAddJobPostApi, adminDeleteJobPostApi, adminListJobPostApi ,getAdminApplicationApi} from "../../services/allApis";
import { toast } from "react-toastify";
import { careerContext } from "../../contextApi/ContextApi";



function CareerList() {
  const [jobStatus, setJobStatus] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState(false);
  const [jobList,setjoblist]=useState([])
  const [searchKey,setsearchKey]=useState("")
  const {addCareerStatus}=useContext(careerContext)
  const [applicationList,setApplicationList]=useState([])

  useEffect(()=>{
    if(jobStatus){
      getJobList()
    }
    if(applicationStatus){
      getApplications()
    }
  },[addCareerStatus,searchKey,applicationStatus])

  const getJobList=async()=>{
    const response = await adminListJobPostApi(searchKey)
    if(response.status===200){
      console.log(response.data)
      setjoblist(response.data)
    }
    else{
      console.log(response)
    }
  }
  
  const deleteJobPost=async(id)=>{
    const response=await adminDeleteJobPostApi(id)
    if(response.status===200){
      getJobList()
      toast.success("Deleted Success fUlly")
    }
    else{
      console.log(response)
      toast.warning("Somrhing went wrong !!")
    }
  }

  const getApplications=async()=>{
    const response=await getAdminApplicationApi()
    if(response.status===200){
      console.log(response.data)
      setApplicationList(response.data)
    }
    else{
      console.log(response)
    }
  }

  return (
    <>
      <AdminHeader />
      <div className="min-h-[60vh] grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-1">
          <AdminSidebar />
        </div>
        <div className="md:col-span-3">
          <h1 className="text-center text-2xl my-10">Careers</h1>
          {/* tabs */}
          <div className="flex justify-center items-center my-5">
            <div onClick={() =>{ setJobStatus(true); setApplicationStatus(false);}}
              className={jobStatus? "p-3 border-l border-r border-t rounded-t-sm  border-gray-600  text-blue-500":
                "p-3 border-b border-gray-600 cursor-pointer"}>
              Job Post
            </div>
            <div onClick={() => {setJobStatus(false);setApplicationStatus(true);}}
              className={applicationStatus?"p-3 border-l border-r border-t rounded-t-sm  border-gray-600  text-blue-500":
              "p-3 border-b border-gray-600 cursor-pointer"}>
              View Applicants
            </div>
          </div>
          {jobStatus && (
            <div className="px-10 flex justify-between">
              <div>
                <input type="text" className="py-2 border bg-white px-2 " placeholder="Search By Title" onChange={(e)=>{setsearchKey(e.target.value)}}/>
                {/* <button className="bg-blue-900 text-white p-2 border border-blue-900 hover:bg-white hover:text-blue-700" >
                  Search
                </button> */}
              </div>
              <AddJobPost/>
            </div>
          )}
          {jobStatus && (
            <div className="my-5 px-10 grid gap-5">
              {
                jobList.length > 0 ?
                <>
                {
                  jobList.map(job =>(
                    <div className=" border-1 border-gray-50 shadow-2xl py-3 px-2 md:grid grid-cols-7">
                      <div className="col-span-6">
                        <h1 className="text-lg mb-2">{job.title}</h1>
                        <hr />
                        <p className="mt-5 flex gap-2 items-center"><FaLocationDot className="text-blue-800" />{job.location}</p>
                        <p className="mt-5">Job Type:{job.jobType}</p>
                        <p className="mt-5"><strong>Salary:</strong> {job.salary}</p>
                        <p className="mt-5">Qualification:{job.qualification}</p>
                        <p className="mt-5">Experience:{job.experience}</p>
                        <p className="mt-5"><strong>Description:</strong> {job.description}</p>
                      </div>
                      <div className="px-4 col-span-1 flex justify-end md:flex-none  md:justify-start ">
                        <button onClick={()=>{deleteJobPost(job?._id)}} className="h-[50px] bg-red-800 text-light p-3 float-end md:p-4 text-white  md:float-start border  border-red-800 hover:bg-white hover:text-red-600  rounded-sm  flex  md:items-center gap-1 ">
                          Delete <FaTrash /> 
                        </button>
                      </div>
                    </div>
                  ))
                }
                </>
                :
                <h2 className='text-center text-danger'>No Job Post Available</h2>
              }
            </div>
          )}
          {applicationStatus && (
            <div className="my-5 px-10">
              {
                applicationList.length>0 ?
                <div className="w-full overflow-x-auto">
                <table className="min-w-[900px] w-full border border-gray-400">
                  <thead className="bg-blue-900 text-white">
                    <tr>
                      <th className="p-2 border border-gray-500">Sl</th>
                      <th className="p-2 border border-gray-500">Job Title</th>
                      <th className="p-2 border border-gray-500">Name</th>
                      <th className="p-2 border border-gray-500">Qualification</th>
                      <th className="p-2 border border-gray-500">Email</th>
                      <th className="p-2 border border-gray-500">Phone</th>
                      <th className="p-2 border border-gray-500">Cover Letter</th>
                      <th className="p-2 border border-gray-500">Resume</th>
                    </tr>
                  </thead>

                  <tbody className="text-sm">
                    {
                      applicationList.map((application,index)=>(
                        <tr className="text-center">
                      <td className="p-2 border border-gray-500">{index+1}</td>
                      <td className="p-2 border border-gray-500">{application?.jobTitle}</td>
                      <td className="p-2 border border-gray-500">{application?.fullname}</td>
                      <td className="p-2 border border-gray-500">{application?.qualification}</td>
                      <td className="p-2 border border-gray-500 break-word">{application?.email}</td>
                      <td className="p-2 border border-gray-500">{application?.phone}</td>
                      <td className="p-2 border border-gray-500 max-w-[200px]">{application?.coverletter}</td>
                      <td className="p-2 border border-gray-500">
                        <a href={`${base_url}/resumes/${application?.resume}`} className="underline text-blue-600">
                          Resume
                        </a>
                      </td>
                    </tr>
                      ))
                    }
                    
                  </tbody>
                </table>
              </div>
              :
              <h2 className="text-center text-xl text-red-700">No Applicants Available</h2>
              }
              
            </div>
          )}
          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CareerList;
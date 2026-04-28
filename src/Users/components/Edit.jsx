import React, { useEffect }  from 'react'
import { useState } from "react";

import { FaPen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { getProfileApi, profileUpdateApi } from '../../services/allApis';
import base_url from '../../services/base_url';
import { toast, ToastContainer } from 'react-toastify';

import { profileContext } from '../../contextApi/ContextApi';
import { useContext } from 'react';

function Edit() {

  const [modalStatus,setModalStatus]=useState(false)
  const [profileData,setProfileData] = useState({
    username:"", password:"",cpassword:"", profile:"",bio:"",role:""
  })

  const[preview,setPreview] = useState("")
  const {profileStatus,setProfileStatus} = useContext(profileContext)
  

  useEffect(()=>{
    if(sessionStorage.getItem('token') && modalStatus)
      getProfiledata()
  },[modalStatus])

  const getProfiledata = async()=>{
    const response = await getProfileApi()
    if(response.status===200){
       console.log(response.data)
       const user = response.data
       setProfileData({
        username:user?.username,password:user?.password,cpassword:user?.password,profile:user?.profile,bio:user?.bio,role:user?.role
       })
    }
  }

  const handleImageUpload = (e)=>{
     const imageFile = e.target.files[0]
     const previewUrl = URL.createObjectURL(imageFile)
    setPreview(previewUrl)
    setProfileData({...profileData,profile:imageFile})
  }

  const handleSubmit = async()=>{
    // console.log(profileData)
    const { username, password, cpassword, profile, bio} = profileData
    if(!username || !password || !cpassword || !bio){
       toast.warning("Enter valid inputs")
    }
    else{
      if(password != cpassword){
        toast.error("Passwords mismatches!")
      }
      else{
        const formData = new FormData()
        if(preview){
          for(let key in profileData) {                // "key" here represents each property name in the profileData object like username, password etc.
            formData.append(key, profileData[key])
          }

          const response = await profileUpdateApi(formData)
          console.log(response)
          if(response.status===200){
            toast.success("Profile updated successfully")
            getProfiledata()
            const userData = response.data
            sessionStorage.setItem('uname',userData?.username)
            sessionStorage.setItem('bio',userData?.bio)
            sessionStorage.setItem('dp',userData?.profile)
            setProfileStatus(userData)
            setModalStatus(false)
          }
          else{
            toast.error("Something went wrong!")
          }
        }
        else{
          const response = await profileUpdateApi(profileData)
          console.log(response)
          if(response.status===200){
             toast.success("Profile updated successfully")
             getProfiledata()
             const userData = response.data
             sessionStorage.setItem('uname',userData?.username)
             sessionStorage.setItem('bio',userData?.bio)
             sessionStorage.setItem('dp',userData?.profile)
             setProfileStatus(userData)
             setModalStatus(false)
          }
          else{
            toast.error("Something went wrong!")
          }
        }
      }
    }

  }

  return (
    <>
      <button className='text-blue-600 border border-r-blue-700 rounded-sm px-3 py-2 flex items-center gap-1 justify-center hover:bg-blue-700 hover:text-white'
        onClick={()=>setModalStatus(true)}>
        Edit
        <FaPen />
      </button>
      {modalStatus && (
          <div className="relative z-10" >
            <div className="bg-gray-500/75 fixed inset-0">
              <div className="flex justify-start items-center min-h-screen">
                <div style={{height:'100vh', width: "400px" }} className="bg-white rounded-2xl flex flex-col ">
                  <div className="bg-black text-white flex justify-between items-center p-3 rounded-t-2xl">
                    <h1 className="text-2xl font-bold">Edit Profile</h1>
                    <button onClick={()=>setModalStatus(false)}>
                      <IoClose />
                    </button>
                  </div>
                  <div className="p-5 flex-1 overflow-y-auto">
                    <label htmlFor="profilepic" className='flex justify-center relative cursor-pointer'>
                      <input type="file" name="" id="profilepic" className='hidden' onChange={(e)=>{handleImageUpload(e)}}/>
                      {
                        preview ?
                         <img src={preview} alt='no-img' width={'200px'}/>
                         :
                         <img src={profileData.profile?(profileData.profile.startsWith("https://lh3.googleusercontent.com")?profileData.profile:`${base_url}/uploadImg/${profileData.profile}`):
                       "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"} style={{height:'200px'}} alt="" />
                      }
                      
                      <button className='p-3 bg-amber-700 text-2xl text-white absolute rounded bottom-5 right-20'>
                        <FaPen />
                      </button>
                    </label>
                    <div className='py-5 flex flex-col gap-4 mb-4'>
                      <input type="text" defaultValue={profileData.username} onChange={(e)=>{setProfileData({...profileData,username:e.target.value})}} placeholder="Username" className="p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2"/>
                      <input type="text" defaultValue={profileData.password} onChange={(e)=>{setProfileData({...profileData,password:e.target.value})}} placeholder="Password" className="p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2"/>
                      <input type="text" defaultValue={profileData.cpassword}  onChange={(e)=>{setProfileData({...profileData,cpassword:e.target.value})}}  placeholder="Confirm Password" className="p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2"/>
                      <textarea name="" placeholder="Bio" className="p-2 border bg-white placeholder-gray-600 rounded-sm w-full " id=""  onChange={(e)=>{setProfileData({...profileData,bio:e.target.value})}}  >{profileData?.bio}</textarea>
                    </div>
                  </div>
                  <div className="bg-gray-200 p-3 flex justify-end gap-3 rounded-b-2xl sticky bottom-0">
                    <button className="p-2 border rounded-sm bg-red-500 text-white hover:bg-white hover:border-red-600 hover:text-red-500">Reset</button>
                    <button className="p-2 border rounded-sm bg-green-700 text-white hover:bg-white hover:border-green-600 hover:text-green-500" onClick={handleSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default Edit
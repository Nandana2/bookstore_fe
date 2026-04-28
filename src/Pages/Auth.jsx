import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { googleSigninApi, signinApi, signupApi } from '../services/allApis'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"
import { authRoleContext } from '../ContextApi/AuthContextApi'

  function Auth({register}) {

    const navigate=useNavigate()

    const {setRole}=useContext(authRoleContext)

    const [user,setUser]=useState({
      username:"",email:"",password:""
    })

    const handleRegister=async()=>{
      console.log(user)
      const {username,email,password}=user
      if(!username || !password || !email){
        toast.info("Enter Valid Data")
      }
      else{
        const response=await signupApi(user)
        console.log(response)
        if(response.status===200){
          toast.success("Signup Successfull")
          setUser({username:"",email:"",password:""})
          navigate('/login')
        }
        else{
          toast.error("Signup failed")
        }
      }
    }

    const handleLogin=async()=>{
      console.log(user)
      const {email,password}=user
      if(!email || !password){
        toast.info("Enter Valid Data")
      }
      else{
        const response=await signinApi(user)
        console.log(response)
        if(response.status===200){
          sessionStorage.setItem('token',response?.data?.token)
          sessionStorage.setItem('uname',response?.data?.username)
          sessionStorage.setItem('dp',response?.data?.profile)
          sessionStorage.setItem('bio',response?.data?.bio)
          sessionStorage.setItem('role',response?.data?.role)
          setRole(response?.data?.role)
          toast.success("Signin Successfull")
          setUser({username:"",email:"",password})
          if(response?.data?.role==="admin"){
            navigate('/admin-dashboard')
          }
          else{

          
          navigate('/')
          }
        }
        else{
          toast.error(response?.data)
        }
      }
    }
    
    const handleGoogleLogin=async(credential)=>{
      // console.log(credential)
      const decode_value=jwtDecode(credential?.credential)
      console.log(decode_value)
      const data ={username:decode_value?.given_name,email:decode_value?.email,profile:decode_value?.picture}
      console.log(data)
      const response =await googleSigninApi(data)
      console.log(response)
      if(response.status===200){
        toast.success("Signin Successfull")
        sessionStorage.setItem('token',response?.data?.token)
        sessionStorage.setItem('uname',response?.data?.username)
        sessionStorage.setItem('dp',response?.data?.profile)
        sessionStorage.setItem('bio',response?.data?.bio)
        sessionStorage.setItem('role',response?.data?.role)
        setRole(response?.data?.role)
        navigate('/')
      }
      else{
        toast.error("SignIn Failed !!")
      }
    }
  return (
    <>
      <div className='w-screen min-h-screen bg-[url(/Background.png)] bg-cover flex flex-col items-center px-5 py-5'>
        <h1 className='text-center text-5xl font-bold text-white'>BOOK STORE</h1>
        <div className='w-full max-w-md py-5 px-4 bg-gray-900 mt-10 flex flex-col text-white items-center rounded-lg shadow-lg'>
          <img src="./userlogo.png" style={{height:'150px'}} alt="" />
          <h1 className='text-4xl'>{register?<>Register</> : <>Login</>}</h1>
          <div className='w-full my-9 px-20'>
            <input type="text" onChange={(e)=>{setUser({...user,email:e.target.value})}} value={user.email} className='w-full p-3 text-black bg-white py-2 rounded-sm placeholder:text-black' placeholder='Email Id'/>
            {
              register &&
                <input type="text" onChange={(e)=>{setUser({...user,username:e.target.value})}} value={user.username} className='w-full p-3 text-black bg-white py-2 mt-4 rounded-sm placeholder:text-black' placeholder='Username'/>
            }
            <input type="text" onChange={(e)=>{setUser({...user,password:e.target.value})}} value={user.password} className='w-full p-3 text-black bg-white py-2 mt-4 rounded-sm placeholder:text-black' placeholder='Password'/>
            <div className='flex justify-between text-sm'>
              <span className='text-yellow-300 mt-2'>Never Share Your password With Others</span>
              {
                !register &&
                  <span className='text-white mt-2 underline'>Forgot Password</span>
              }
            </div>
            {
              register?
                <button onClick={handleRegister} className='w-full bg-green-600 py-2 rounded-sm font-semibold mt-4'>Register</button>
                :
                <>
                  <button onClick={handleLogin} className='w-full bg-green-600 py-2 rounded-sm font-semibold mt-4'>login</button>
                  <p className='my-5 border-b border-white'></p>
                    <GoogleLogin
                      onSuccess={credentialResponse => {
                        handleGoogleLogin(credentialResponse)
                        }}
                      onError={() => {
                      console.log('Login Failed');
                      }}
                    />
                </>
            }
          </div>
          {
            register?
              <p>Already a User? <Link to={'/login'} className=' text-blue-700 underline'>Login</Link></p>
              :
              <p>Are You a New User? <Link to={'/register'} className=' text-blue-700 underline'>Register</Link></p>
          }

        </div>
      </div>
    </>
  )
}

export default Auth
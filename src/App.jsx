import { useState,useEffect, useContext } from 'react'
import './App.css'
import Home from './Users/pages/Home'
import Career from './Users/pages/Career'
import ContactUs from './Users/pages/ContactUs'
import AllBooks from './Users/pages/AllBooks'
import UserPofile from './Users/pages/UserPofile'
import ViewBook from './Users/pages/ViewBook'
import PaymentError from './Users/pages/PaymentError'
import PaymentSuccess from './Users/pages/PaymentSuccess'
import Dashboard from './Admin/pages/Dashboard'
import Settings from './Admin/pages/Settings'
import BookList from './Admin/pages/BookList'
import CareerList from './Admin/pages/CareerList'

import PageNotFound from './Pages/PageNotFound'

import Preloader from './Components/Preloader'

import { Route,Routes } from 'react-router-dom'
import Auth from './Pages/Auth'
import { faL } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from 'react-toastify'
import { authRoleContext } from './ContextApi/AuthContextApi'
function App() {
   
const[loading,setloading]=useState(true)

const {role}=useContext(authRoleContext)
console.log(role,"role")
useEffect(()=>{
  setTimeout(()=>{
  setloading(false)
  },3000)
},[])
  return (
    <>
     <Routes>
      {/*User*/}
      <Route path='/' element={loading?<Preloader/>:<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      {
        role==="User" &&
        <>
           

        <Route path='/books' element={<AllBooks/>}/>
        <Route path='/books/:id/view' element={<ViewBook/>}/>
        <Route path='/career' element={<Career/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/user-profile' element={<UserPofile/>}/>
        <Route path='/payment-success' element={<PaymentSuccess/>}/>
          <Route path='/payment-error' element={<PaymentError/>}/>

        </>
      }
      
        {
          role==="admin" &&
          <>
       <Route path='/admin-dashboard' element={loading?<Preloader/>:<Dashboard/>}/>
      <Route path='/admin-career'element={<CareerList/>}/>
      <Route path='/admin-books'element={<BookList/>}/>
      <Route path='/admin-settings'element={<Settings/>}/>

          </>
        }
       {/*Admin*/}
    

   <Route path='/*'element={<PageNotFound/>}/>




     </Routes>
     <ToastContainer/>
    
    </>
  )
}

export default App

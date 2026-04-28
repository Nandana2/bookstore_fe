import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='min-h-screen  flex justify-center items-center bg-gray-700 text-white'>
      <div className='w-[50%] h-[50%] '>
        <img src="https://cdn.dribbble.com/userupload/25439422/file/original-af9c309401b13edcd50861b6196ac9ee.gif" alt="" className='w-[60%] h-[60%] mx-auto' />
        <h1 className='text-center my-2'>Oh no!</h1>
        <h2 className='text-center text-xl my-2'>Look Like You're Lost</h2>
        <h5 className='text-center my-2'>The page you are looking for is not available</h5>
        <div className='flex justify-center my-2'>

          <Link to={'/'} className='bg-blue-700 p-3 rounded-xl'>Go Back</Link>
        </div>
      </div>
      
    </div>
  )
}

export default PageNotFound

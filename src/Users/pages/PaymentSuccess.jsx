import React from 'react'
import Header from '../components/Header'

function PaymentSuccess() {
  return (
    <>
        <Header/>
        <div className='min-h-[60vh]'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div>
           <img src="https://miro.medium.com/1*Tt1d7z553M0-vKfo0N9Krw.gif" alt=""  width={'100%'}/>
        </div>
        <div className='flex flex-col justify-center itemx-center' >
          <h2 className='text-4xl text-green-700 text-center'>Payment Success</h2>
          <Link to={'/books'} className="px-3 py-1 my-2 bg-blue-500 text-white rounded "> Explore More Books...</Link>
</div>
        </div>
        </div>
    </>
  )
}

export default PaymentSuccess

import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../../Components/Footer'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { latestBooks } from '../../services/allApis';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { searchContext } from '../../ContextApi/ContextApi';

function Home() {
 
 const {globalSearchKey,setGlobalSearchKey}=useContext(searchContext)

  const[latestBook,setLatestBook]=useState([])
 const navigate=useNavigate()
useEffect(() => {
    getLatestBooks()
  }, [])

  const getLatestBooks = async () => {
    const result = await latestBooks()

    if (result.status === 200) {
      setLatestBook(result.data)
    } else {
      console.log(result)
    }
  }

  const gotoBooks=()=>{
    navigate('/books')
  }


  return (
    <>
      <Header/>
      <>
      {/* Hero */}
      <section className='w-full h-[70vh] bg-[url(/LandingImg.png)] bg-cover bg-center bg-fixed'>
       <div className='w-full h-[70vh] bg-[rgba(0,0,0,0.3)] flex justify-center items-center '>
            <div className='w-[35%] text-white  text-center  '>
               <h1 className='text-5xl'> Wonderful Gifts</h1>
               <h2 className='text-2xl'>Give your family and friends a book</h2>
               <div className="mt-5 flex items-center justify-center bg-white p-2 rounded-full  ">
                <input type="text" className="placeholder-gray-700 text-black w-full focus:outline-none" placeholder='Search Books' onChange={(e)=>{setGlobalSearchKey(e.target.value)}} />
                <FaMagnifyingGlass className='text-blue-950 me-3' onClick={gotoBooks} />

               </div>

            </div>
       </div>
      </section>



      {/* new arrivals */}
      <section className='my-3 px-5 md:px-40'>
        <h1 className='text-center text-2xl'>Next Arrivals</h1>
        <h1 className='text-center text-2xl'>Explore Our Latest Collection</h1>
        <div className='flex flex-wrap w-full mt-5 md:flex justify-center gap-4'> 
          {/* card */}
          {latestBook.length > 0 ? (
            latestBook.map((item, index) => (
              <div key={index} className='p-1 w-[70%] md:w-[16rem] shadow-xl text-center'>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ height: "300px", width: '100%' }}
                />
                <h2 className="text-lg">{item.title}</h2>
                <p>{item.description}</p>
                <h4 className='text-lg text-blue-600'>₹{item.price}</h4>
              </div>
            ))
          ) : (
            <p className='text-center w-full'>No books available</p>
          )}

        </div>

    <div className='text-center mt-4'>
      <button className='px-3 bg-blue-900 text-white py-2'>Explore More</button>
    </div>
      </section>

{/* featured authors */}

<section className='my-20 px-5 md:px-40 grid md:grid-cols-2 gap-10'>
  <div>
    <h1 className="text-xl text-center">FEATURED AUTHORS</h1>
    <h1 className="text-3xl text-center">Captures with every word </h1>
    <p className='text-justify mt-3'>
       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, unde? Aliquam, perferendis delectus magnam amet iure dicta qui quisquam asperiores doloribus nostrum harum id repellat voluptatum vitae ipsa nobis suscipit.
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur quos pariatur nesciunt nulla sit quod non autem id. Quisquam exercitationem sequi non quod facere placeat sit quaerat quis optio incidunt!
       Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur recusandae repellendus qui repellat asperiores omnis in, nemo vero necessitatibus vitae quaerat quos eius ab, maiores dolores harum deleniti quia a.

    </p>
     <p className='text-justify mt-5'>
   Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aliquid deserunt corrupti quas harum? Accusantium vel temporibus perferendis eos et vitae incidunt sit fugit quas! Beatae recusandae quaerat deleniti quasi.
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora sunt ipsum error natus a quisquam fuga at reiciendis accusantium eveniet dolores, ipsa dolore, temporibus omnis iure, similique eius ducimus molestias!

     </p>
  </div>
  <div className='flex items-center'>
    <img src="https://media.istockphoto.com/id/1371934584/photo/portrait-of-a-confident-mature-businesswoman-working-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=NF_IO6IEXY3HifRIhRqP0KDFJFdlFwaMwo3zfOOvKnQ=" alt="" style={{height:'350px'}} className='w-full'  />

  </div>
</section>

{/* testimony */}
<section className='text-center my-20 px-5 md:px-40'>
  <h1 className="text-lg">TESTIMONY</h1>
  <h1 className="text-3lg">See What Others Are Saying</h1>
  <div className='flex flex-col items-center my-5'>
    <img src="https://as1.ftcdn.net/jpg/06/16/55/08/1000_F_616550819_rnEcH9vVVcep0dZgvAd3k8nn840uAueP.jpg" alt="" className='rounded-full mt-5'  style={{width:'200px', height:'200px'}}/>
      <h2>John Doe</h2>
  </div>
  <p className='text-justify'>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea porro eum cum? Quaerat fugiat ipsa, impedit porro modi quibusdam reiciendis ex odit, beatae mollitia consequuntur ducimus nemo voluptas explicabo maiores!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet vero beatae omnis deserunt ad, aperiam explicabo. Consectetur commodi, tempore enim ut quisquam a nesciunt corrupti doloremque dolor adipisci aliquam laudantium!

  </p>
</section>


      </>
      <Footer/>
    </>
  )
}

export default Home
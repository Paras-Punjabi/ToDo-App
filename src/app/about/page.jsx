"use client"
import Navbar from '@/components/Navbar'
import React from 'react'

const About = () => {
  const array = ["ReactJS","NextJS-14","React-Hot-Toast","Firebase Authentication","Firebase Firestore","Tailwind CSS"]
  return (
   <>
   <Navbar/>
   <h2 className='text-white text-center text-4xl my-7'>Technologies Used</h2>
   <div class="flex flex-col lg:w-4/5 sm:mx-auto sm:mb-2 -mx-1">

    {array.map((item,idx)=>{

      return ( <div key={idx} class="p-2 my-2 mx-auto sm:w-1/2 w-full">
        <div class="bg-slate-300 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-800 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span class="title-font font-medium text-black">{item}</span>
        </div>
      </div>)
      })
    }
      
    </div>
   </>
  )
}

export default About
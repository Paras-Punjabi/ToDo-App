"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import toast, { Toaster }  from 'react-hot-toast';
import { signOut } from 'firebase/auth'
import { auth } from '@/app/firebase'
import { useRouter } from 'next/navigation'

const Navbar = ({showLogin=true,username=false,setWhat}) => {
  let router = useRouter()

  const logout = async()=>{
    localStorage.removeItem("user")
    toast.promise(signOut(auth),{
      loading:"Signing Out...",
      success:"Logged Out successfully"
    })
    router.push("/")
  }

  return (
    <>
    <Toaster position="top-center"/>
    <header className="text-gray-400 bg-gray-900 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
      <Image src={"/logo.png"} height={35} width={35} alt='Logo of Todo App'/>
      <span className="ml-3 cursor-pointer text-xl">ToDo-App</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      
      {username===false && <Link href={"/"} className="mr-5 text-xl hover:text-black hover:bg-slate-400 border border-gray-700 p-1.5 rounded-lg transition-colors">Home</Link>}

      {username === false &&  <Link href={"/about"} className="mr-5 text-xl hover:text-black hover:bg-slate-400 border border-gray-700 p-1.5 rounded-lg transition-colors">About</Link>}

      {username && <span onClick={()=>setWhat(1)} className='text-xl mx-2 inline-flex cursor-pointer hover:text-black hover:bg-slate-400 transition-colors border border-gray-700 p-1.5 rounded-lg items-center  mt-4 md:mt-0'>Create Note</span>}

      {username && <span onClick={()=>setWhat(2)} className='text-xl mx-2 inline-flex rounded-lg hover:text-black hover:bg-slate-400 transition-colors cursor-pointer items-center border border-gray-700 p-1.5   mt-4 md:mt-0'>All Notes</span>}

      {username && <span onClick={logout} className='text-xl mx-2 rounded-lg inline-flex hover:text-black hover:bg-slate-400 transition-colors items-center border border-gray-700 p-1.5 cursor-pointer mt-4 md:mt-0'>Logout</span>}

      {showLogin && <Link href={"/login"} className="mr-5 text-xl hover:text-white border border-gray-700 p-1.5 rounded-lg  hover:bg-slate-400 transition-colors">Login</Link>}

      {username && <button onClick={()=>setWhat(0)} className='text-xl inline-flex text-white items-center bg-gray-800 border-0 focus:outline-none hover:bg-gray-700 cursor-pointer p-1.5 rounded mt-4 mx-2 md:mt-0'>{username}</button>}
    </nav>
  </div>
</header>
</>

  )
}

export default Navbar
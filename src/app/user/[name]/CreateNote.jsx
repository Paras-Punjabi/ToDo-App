"use client"
import React,{useState} from 'react'
import { db } from '@/app/firebase'
import toast from 'react-hot-toast'
import { addDoc, collection } from 'firebase/firestore'

const CreateNote = ({email,setWhat}) => {
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")

    const handle = async ()=>{
        let data = await addDoc(collection(db,"notes"),{
            title:title,
            content:content,
            email:email,
            made:new Date().toDateString()
        })
        // console.log(data);
        setTitle("")
        setContent("")
        setWhat(2)
        toast.success("Note created successfully")
    }

  return (
    <>
    <h2 className='text-white text-center text-4xl my-7'>Create Note</h2>

    <div className="container px-5 py-5 mx-auto flex">
    <div className="w-3/5 bg-gray-900 shadow-md rounded-lg p-10 flex flex-col mt-3 mx-auto">
      <div className="relative mb-4">
        <label htmlFor="title" className="leading-7 text-sm text-gray-400">Title</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Todo Title" id="title" name="title" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="content" className="leading-7 text-sm text-gray-400">Content</label>
        <textarea onChange={(e)=>setContent(e.target.value)} value={content} placeholder='Description of Todo' id="content" name="content" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>
      <button onClick={handle} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add</button>
    </div>
  </div>
    </>
  )
}

export default CreateNote
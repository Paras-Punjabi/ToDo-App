"use client"
import React from 'react'
import { deleteDoc, doc} from 'firebase/firestore'
import toast from 'react-hot-toast'
import { db } from '@/app/firebase'

const AllNotes = ({data}) => {
  const handleDelete = async(item)=>{
      let dd = deleteDoc(doc(db,"notes",item.id));
      toast.promise(
        dd,
         {
           loading: 'Deleting...',
           success: "Note deleted successfully",
         }
       );
  }

  return (
    <>
    <h2 className='text-white text-center text-4xl my-7'>Your Notes</h2>
        
    <section className="text-gray-400 bg-gray-900 max-h-screen overflow-y-auto w-11/12
    border rounded-xl border-none mx-auto body-font">
    <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center -mx-4 -my-8">
            {data && data.length === 0 && <h2 className='text-white text-3xl'>Nothing to show😭....</h2>}
    {data && data.map((item,idx)=>{
            return (
        <div key={item.id} className="p-5 mx-3 my-3 lg:w-1/3 border border-gray-700 rounded-xl">
            <div className="h-full flex items-start">

            <div className="w-28 text-base flex-shrink-0 flex flex-col text-center leading-none">
                <span className="text-gray-400 pb-2 mb-2 border-b-2 border-gray-700">{item.made.split(" ")[0]}</span>
                <span className="font-medium leading-none text-gray-300 title-font">{item.made.split(" ").splice(1).join(" ")}</span>
          </div>
          <div className="flex-grow pl-6">
            <h1 className="title-font text-xl font-medium text-white mb-3">{item.title}</h1>
            <p className="leading-relaxed mb-5">{item.content}</p>
            <button onClick={(e)=>handleDelete(item)} style={{"backgroundColor":"#DC3444"}}className='mr-2 border border-none rounded-lg p-1.5 text-white'>Delete Note</button>
            {/* <button style={{"backgroundColor":"#188755"}} className='bg-green-600 border ml-2 border-none rounded-lg p-1.5 text-white'>Update</button> */}
          </div>
        </div>
      </div>
      )})}
      </div>
  </div>
</section>
    </>
  )
}

export default AllNotes
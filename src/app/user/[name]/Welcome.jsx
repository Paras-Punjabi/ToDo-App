"use client"
import React from 'react'
const Welcome = ({username,datejoined}) => {
  return (
    <>
    <h1 className='text-center font-bold text-white my-20 text-6xl'>Welcome {username}</h1>
    <h3 className='text-center text-white my-2 text-2xl'>Joined on {datejoined===null ? "Loading..." : datejoined}</h3>
    </>
  )
}

export default Welcome
"use client"
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/app/firebase'
import Welcome from './Welcome'
import CreateNote from './CreateNote'
import AllNotes from './AllNotes'

const HomePage = ({params}) => {
    const [username,setUsername]= useState(params.name)
    const [data,setData] = useState([]);
    const [email,setEmail] = useState("");
    const [datejoined,setDatejoined] = useState(null)
    const [what,setWhat] = useState(0)
    const router = useRouter();

    useEffect(()=>{
        if(localStorage.getItem("user") === null){
            router.push("/")
            return;
        }
        let e = JSON.parse(localStorage.getItem("user")).email
        setEmail(e)
        let q = query(collection(db,"users"),where("email","==",e))
        onSnapshot(q,(dd)=>{
            if(dd.docs.length > 0)
            setDatejoined(dd.docs[0].data().joined)
        })

        let notesQuery = query(collection(db,"notes"),where("email","==",e));
        onSnapshot(notesQuery,(dd)=>{
            let array = []

            for(let i=0;i<dd.docs.length;i++){
                array.push({...dd.docs[i].data(),id:dd.docs[i].id})
            }
            setData(array)
            // console.log(array);
        }) 
    },[])

    return (
        <>
        <Navbar username={username} setWhat={setWhat} showLogin={false}/>
        {what ===0 && <Welcome username={username} datejoined={datejoined}/>}
        {what ===1 && <CreateNote email={email} setWhat={setWhat}/>}
        {what ===2 && <AllNotes data={data}/>}
        </>
    )
}

export default HomePage
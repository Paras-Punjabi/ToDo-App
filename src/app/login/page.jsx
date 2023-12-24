"use client"
import Navbar from '@/components/Navbar'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React,{useState} from 'react'
import toast from 'react-hot-toast'
import {collection, query, where, onSnapshot} from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { db,auth } from '../firebase';


const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const router = useRouter()

  const handle = async()=>{
      try{
        let res = await signInWithEmailAndPassword(auth,email,password);
        // console.log(res);
        localStorage.setItem("user",JSON.stringify(res.user));
      }
      catch(err){
        toast.error("Please enter correct credentials")
        // alert("Please enter correct credentials")
        return;
      }

      try{
        let d = query(collection(db,"users"),where("email","==",email));
        onSnapshot(d,(data)=>{
          let name = data.docs[0].data().name
          router.push("/user/"+name)
          toast.success("Logged in successfully")
        })
      }
      catch(err){
        toast.error("Error occurs")
        alert("Error occures")
      }
  }

  const handleGoogle = async()=>{
    const provider = new GoogleAuthProvider()
    let res = await signInWithPopup(auth,provider)

    let q = query(collection(db,"users"),where("email","==",res.user.email))

    onSnapshot(q,async (dd)=>{
      if(dd.docs.length == 0){
        toast.error("Email not found!!")
        await auth.currentUser.delete()
        return;
      }
      else{
        localStorage.setItem("user",JSON.stringify(res.user));
        let n = dd.docs[0].data().name;
        router.push(`/user/${n}`)
        toast.success("Logged in successfully")

      }
    })
  }

  return (
    <>
    <Navbar showLogin={false}/>
    <section className="text-gray-400 bg-gray-900 body-font w-3/4 mx-auto border my-7 p-3 rounded-lg border-gray-700">
    <div className="container px-5 py-5 mx-auto">
      <div className="flex flex-col text-center w-full mb-4">
        <h1 className="sm:text-3xl text-2xl  font-medium title-font mb-4 text-white">
          Login
        </h1>
      </div>
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <div className="flex flex-wrap -m-2">
    
          <div className="p-2 w-full">
            <div className="relative">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-400"
              >
                Email
              </label>
              <input
                id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="johnwick@gmail.com"
                type="email"
                name="email"
                className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3"
              />
            </div>
          </div>
          <div className="p-2 w-full">
            <div className="relative">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-400"
              >
                Password
              </label>
              <input
                placeholder="*****"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                name="password"
                type="password"
                className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3"
              />
            </div>
          </div>

        
          <div className="p-2 w-full">
            <button onClick={handle} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Login
            </button>
          </div>
          <div className="p-2 w-full text-xl text-center">OR</div>
          <div className="p-2 w-full">
            <button
            onClick={handleGoogle}
              type="button"
              className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                style={{"marginTop":"6.5px"}}
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Login with Google<div></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>

  )
}

export default Login
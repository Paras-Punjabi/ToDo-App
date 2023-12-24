"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {db,app,auth} from '@/app/firebase'

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";


const Page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    if(db && localStorage.getItem("user") !== null){
      let useremail = JSON.parse(localStorage.getItem("user")).email
      let q = query(collection(db,"users"), where("email", "==", useremail));
      onSnapshot(q,(dd)=>{
        let data = dd.docs[0].data().name
        router.push("/user/" + data);
      })
    }
  }, []);

  const handle = async () => {
    if (password.length < 6) {
      toast.error("Password cannot be less than 6 characters")
      // alert("Password cannot be less than 6 characters");
      return;
    }
    if (username.split(" ").length >= 2) {
      toast.error("Username cannot have space between it")
      // alert("Username cannot have space between it");
      return;
    }

    let collectionRef = collection(db, "users");

    let d = query(collectionRef, where("name", "==", username));
    onSnapshot(d, async (dd) => {
      try {
        // console.log(dd.docs);
        if (dd.docs.length >= 2) {
          toast.error("This username is already taken")
          // alert("This username is already taken");
          return;
        }

        let res = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem("user",JSON.stringify(res.user));
        // console.log(res);

        let data = await addDoc(collectionRef, {
          email: email,
          name: username,
          joined: new Date().toDateString(),
        });

        // console.log(data);

        router.push(`/user/${username}`);
        toast.success("Logged in successfully")

      } catch (err) {
        toast.error("User already exists")
        console.log(err);
      }
    });
  };

  const handleGoogle= async()=>{
    let provider = new GoogleAuthProvider()
    let res = await signInWithPopup(auth,provider)
    let n = res.user.displayName.replace(/ /g,"_") +"_"+ crypto.randomUUID().split("-")[0]
    setEmail(res.user.email);

    let e = res.user.email

    let q = query(collection(db,"users"),where("email","==",e));
    onSnapshot(q, async(dd)=>{
      if(dd.docs.length === 0){
        let data = await addDoc(collection(db,"users"),{
          name:n,
          email:res.user.email,
          joined: new Date().toDateString(),
        })
      }
    })

    setUsername(n);
    // console.log(data);
    localStorage.setItem("user",JSON.stringify(res.user));
    router.push(`/user/${n}`);
    // console.log(res);
    toast.success("Logged in successfully")
  }

  return (
    <>
      <Navbar />
      <br />
      <section className="text-gray-400 bg-gray-900 body-font relative w-3/4 mx-auto border my-7 p-3 rounded-lg border-gray-700">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-2xl  font-medium title-font mb-4 text-white">
              Sign-Up
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Username
                  </label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="name"
                    placeholder="John Wick"
                    name="name"
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <button
                  onClick={handle}
                  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Create Account
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
                    style={{ marginTop: "6.5px" }}
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
                  Sign up with Google<div></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;

"use client"
import React from 'react'
import { Button} from "@/components/ui/button"
import InputWithLabel from "@/components/ui/input-with-label"
import {toast} from 'react-toastify';
import Link from 'next/link';


export default function Login(){

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    try {
      const response = await fetch('http://localhost:5239/api/User/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: payload.username, password: payload.password }),
      })
      const data = await response.json();
      if(data.success){
        console.log(data)
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-screen bg-tomato-50">
      <h2 className="text-3xl font-bold text-tomato-700">Login</h2>
      <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
        <InputWithLabel label="Username" type="text" id="username" placeholder='Username' name="username"/>
        <InputWithLabel label='Password' type="password" id="password" name="password" />
        <Button variant={'outline'} className='bg-tomato-200 hover:bg-tomato-600' type="submit">Login</Button>
      </form>
      <div className='flex flex-col items-center gap-5'>
        <h2>Dont have an account?</h2>
        <Link href='/register'><Button variant={'outline'} className='bg-tomato-200 hover:bg-tomato-600'>Register</Button></Link>
      </div>
    </div>
  )
}

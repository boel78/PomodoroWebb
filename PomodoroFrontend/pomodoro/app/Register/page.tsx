import React from 'react'
import { Button} from "@/components/ui/button"
import InputWithLabel from "@/components/ui/input-with-label"
import {toast} from 'react-toastify';
import Link from 'next/link';

export default function Register(){
  return (
    <div className="flex flex-col items-center justify-center gap-10 h-screen bg-tomato-50">
    <h2 className="text-3xl font-bold text-tomato-700">Register</h2>
    <form className="flex flex-col space-y-4" onSubmit={handleRegister}>
      <InputWithLabel label="Username" type="text" id="username" placeholder='Username' name="username"/>
      <InputWithLabel label='Password' type="password" id="password" name="password" />
      <InputWithLabel label='Confirm Password' type="password" id="password" name="cnf_password" />
      <Button variant={'outline'} className='bg-tomato-200 hover:bg-tomato-600' type="submit">Register</Button>
    </form>
    <div className='flex flex-col items-center gap-5'>
      <h2>Dont have an account?</h2>
      <Link href='/register'><Button variant={'outline'} className='bg-tomato-200 hover:bg-tomato-600'>Register</Button></Link>
    </div>
  </div>
  )
}

"use client"
import React from 'react'
import { Button} from "@/components/ui/button"
import InputWithLabel from "@/components/ui/input-with-label"
import {toast} from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function Register(){
    const router = useRouter();
    const {logout} = useUser()

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const payload = Object.fromEntries(formData);

        if(payload.cnf_password != payload.password){
            toast.error("Passwords doesn't match")
        }
        else{
            try{
                const response = await fetch('https://pomodoro-a7ehd9geebhtg9d0.centralus-01.azurewebsites.net/api/User/register',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ userName: payload.username, password: payload.password, email: payload.email }),
                })
                const data = await response.json();

                if(data.success){
                    logout();
                    toast.success(data.message)
                    router.push("/login")
                    
                }
                else{
                    toast.error(data.message, {
                        autoClose: 4000, 
                      });
                }
            }
            catch(error){
                if (error instanceof Error) {
                    console.log(error.message);
                } else {
                    console.log(String(error));
                }
            }
        }

    }

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-screen bg-tomato-50">
    <h2 className="text-3xl font-bold text-tomato-700">Register</h2>
    <form className="flex flex-col space-y-4" onSubmit={handleRegister}>
      <InputWithLabel label="Username" type="text" id="username" placeholder='Username' name="username" required={true}/>
      <InputWithLabel label="Email" type="email" id="email" placeholder='Email' name="email" required={true}/>
      <InputWithLabel label='Password' type="password" id="password" name="password" required={true}/>
      <InputWithLabel label='Confirm Password' type="password" id="password" name="cnf_password" required={true}/>
      <Button variant={'outline'} className='bg-tomato-200 hover:bg-tomato-600' type="submit">Register</Button>
    </form>
  </div>
  )
}

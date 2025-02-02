"use client"
import { FormEvent, useState } from "react"
import { UseMultiStepForm } from "./useMultiStepForm"
import { Button } from "../ui/button"
import  Welcome  from "./Welcome"
import  PrefferedTimeForm  from "./PreferredTimeForm"
import  AlgorithmForm  from "./AlgorithmForm"
import { useUser } from "@/context/UserContext"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function MultiStepForm(){

    const {user} = useUser()
    const router = useRouter()

    type FormData = {
        PreferredTime: string,
        PrefferedBreak: string,
        Algorithm: string,

    }

    const INITIAL_DATA: FormData = {
        PreferredTime: "00:00:00",
        PrefferedBreak: "00:00:00",
        Algorithm: "longer_break",

    }
    const [data, setData] = useState(INITIAL_DATA)

    function updateFields(fields: Partial<FormData>){
        setData(prev => {
            return {...prev, ...fields}
        })
    }

    const {steps, step, currentStepIndex, isFirstStep, back, next, isLastStep} = UseMultiStepForm([<Welcome key={0}/>, <AlgorithmForm {...data} key={1} updateFields={updateFields}/>, <PrefferedTimeForm {...data} key={2} updateFields={updateFields}/>])

    async function handleChangeForm(e: FormEvent){
        e.preventDefault()
        if(!isLastStep) return next(); 
               
        try{
            const response = await fetch('https://pomodoro-a7ehd9geebhtg9d0.centralus-01.azurewebsites.net/api/User/update', {
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({userName: user?.userName, newAlgorithm: data.Algorithm, preferredTime: data.PreferredTime+":00", preferredBreak: data.PrefferedBreak+":00", didInitialSetup: true }),
            })
            const responseData = await response.json();
            if(responseData.success){
                toast.success("Your account is successfully setup!")
                router.push("/pomodoro-session")
                
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
    
    


    return(
        <div className="relative bg-tomato-50 rounded-md shadow-md w-1/2 h-1/2 p-8">
            <form onSubmit={handleChangeForm}>
                <div className="absolute top-1 right-1">{currentStepIndex + 1} / {steps.length} </div>
                {step}
                <div className="absolute bottom-1 right-1">
                    {!isFirstStep && <Button variant={"outline"} className="bg-tomato-700 text-tomato-50" onClick={back} type="button">Back</Button>}
                    <Button variant={"outline"} className="bg-tomato-700 text-tomato-50" type="submit">{isLastStep ? "Finish" : "Next"}</Button>
                </div>
            </form>
        </div>
    )

}
"use client"
import { FormEvent, useState } from "react"
import { UseMultiStepForm } from "./useMultiStepForm"
import { Welcome } from "./Welcome"
import { PrefferedTimeForm } from "./PreferredTimeForm"
import { AlgorithmForm } from "./AlgorithmForm"

export default function MultiStepForm(){
    const {steps, currentStepIndex, isFirstStep, back, next, isLastStep} = UseMultiStepForm([<Welcome {...data} key={0}/>, <AlgorithmForm {...data} key={1}/>, <PrefferedTimeForm {...data} key={2}/>])

    function handleChangeForm(e: FormEvent){
        e.preventDefault()
        next()
    }
    type FormData = {
        PreferredTime: string,
        PrefferedBreak: string,
        Algorithm: boolean,

    }

    const INITIAL_DATA: FormData = {
        PreferredTime: "00:00:00",
        PrefferedBreak: "00:00:00",
        Algorithm: false,

    }
    const [data, setData] = useState(INITIAL_DATA)



    return(
        <div className="relative bg-white border-2 border-black">
            <form onSubmit={handleChangeForm}>
                <div className="absolute top-1 right-1">{currentStepIndex + 1} / {steps.length} </div>
                <div>
                    {!isFirstStep && <button onClick={back} type="button">Back</button>}
                    <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
                </div>
            </form>
        </div>
    )

}
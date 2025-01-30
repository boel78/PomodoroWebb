import { ReactNode } from "react"

type FormWrapperProps = {
    title: string,
    children: ReactNode
}

export function FormWrapper({ title, children }:FormWrapperProps){
    return(
        <>
        <h2 className="text-center text-2xl font-semibold text-tomato-700">{title}</h2>
        <div>
            {children}
        </div>
        </>
    )
}
import { Button } from "./ui/button";


export default function LoginNavMobile(){

    return(
        <div className="flex flex-col justify-start gap-3 w-full bg-tomato-50 absolute z-0 pb-8 shadow-md">
            <Button variant={'outline'} className="bg-tomato-500 text-tomato-50">Sessions</Button>
            <Button variant={'outline'} className="bg-tomato-500 text-tomato-50">Achievements</Button>
            <Button variant={'outline'} className="bg-tomato-500 text-tomato-50">Profile</Button>
            <Button className="bg-tomato-800 text-tomato-50 font-semibold">Logout</Button>
        </div>
    )
}
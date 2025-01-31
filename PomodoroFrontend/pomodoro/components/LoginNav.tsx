import { useState } from "react";
import { Button } from "./ui/button";
import LoginNavMobile from "./LoginNavMobile";
import { Menu } from "lucide-react";


export default function LoginNav(){

    const [showMobileMenu, setShowMobileMenu] = useState(false)
    
    const toggleMenu = () => setShowMobileMenu(!showMobileMenu);

    return(
        <nav className="w-full bg-tomato-50 h-14 fixed shadow-md flex flex-col md:flex-row md:items-center justify-center md:justify-end md:pr-2">
            
            <Menu className="w-6 h-6 text-black cursor-pointer md:hidden self-end" onClick={toggleMenu}/>
             <div className="hidden md:flex items-center justify-end gap-3">
                <Button variant={'outline'} className="bg-tomato-500 text-tomato-50">Sessions</Button>
                <Button variant={'outline'} className="bg-tomato-500 text-tomato-50">Achievements</Button>
                <Button variant={'outline'} className="bg-tomato-500 text-tomato-50">Profile</Button>
                <Button className="bg-tomato-800 text-tomato-50 font-semibold">Logout</Button>
            </div>
            <div className={`transition-transform duration-300 ease-in-out ${showMobileMenu ? "-translate-y-72" : "translate-y-4"}`}><LoginNavMobile /></div>
        </nav>
    )
}
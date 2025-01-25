"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import LandingPageMobileNav from "./LandingPageMobileNav";



export default function LandingPageNav() {

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const toggleMenu = () => setShowMobileMenu(!showMobileMenu);


  return (
    <header className="bg-white shadow-md">
      <nav className="flex justify-between items-center py-4 px-2 md:px-8 text-gray-700">
        <Link href="/">
          <h2 className="text-tomato-700 font-bold md:text-xl">Pomodoro-Buddy</h2>
        </Link>
        <div className="hidden md:flex md:space-x-4 text-lg items-center">
          <Link href="#features" className="hover:text-tomato-700">Features</Link>
          <Link href="#testimonials" className="hover:text-tomato-700">Testimonials</Link>
          <Button variant="outline" className="bg-tomato-600 text-lg hover:bg-tomato-700 text-white"><Link href="/login">Get Started</Link></Button>
        </div>
        <button onClick={() => toggleMenu()} className="md:hidden"><Menu className=" text-tomato-700"/></button>
      </nav>
      {showMobileMenu && <LandingPageMobileNav />}
    </header>
  );
}

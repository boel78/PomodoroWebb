import Link from 'next/link'

export default function LandingPageMobileNav(){
  return (
    <div className="bg-white shadow-md flex flex-col gap-2 border-t-tomato-400 border-t-2 -z-10 py-2">
        <div>
            <Link href="#features"><h2 className="text-tomato-700 font-bold">Features</h2></Link>
        </div>
        <div>
            <Link href="#testimonials"><h2 className="text-tomato-700 font-bold">Testimonials</h2></Link>
        </div>
    </div>
  )
}


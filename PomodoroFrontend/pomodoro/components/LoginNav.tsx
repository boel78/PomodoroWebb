import { useState } from "react";
import { Button } from "./ui/button";
import LoginNavMobile from "./LoginNavMobile";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function LoginNav() {
  const router = useRouter();

  const { logout } = useUser();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMenu = () => setShowMobileMenu(!showMobileMenu);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="w-full bg-tomato-50 h-14 fixed shadow-md flex flex-col md:flex-row justify-between md:items-center">
      <Link href="/dashboard">
        <Button
          variant={"outline"}
          className="bg-tomato-500 text-tomato-50 hidden md:block ml-2"
        >
          Home
        </Button>
      </Link>
      <div className="h-full flex flex-col md:flex-row md:items-center justify-center md:justify-end md:pr-2">
        <Menu
          className="w-6 h-6 text-black cursor-pointer md:hidden self-end"
          onClick={toggleMenu}
        />

        <div className="hidden md:flex items-center justify-end gap-3">
          <Link href="/pomodoro-session">
            <Button
              variant={"outline"}
              className="bg-tomato-500 text-tomato-50"
            >
              Sessions
            </Button>
          </Link>
          <Link href="/achievements">
            <Button
              variant={"outline"}
              className="bg-tomato-500 text-tomato-50"
            >
              Achievements
            </Button>
          </Link>
          <Link href="/profile">
            <Button
              variant={"outline"}
              className="bg-tomato-500 text-tomato-50"
            >
              Profile
            </Button>
          </Link>
          <Button
            className="bg-tomato-800 text-tomato-50 font-semibold"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        <div
          className={`transition-transform duration-300 ease-in-out absolute left-0 w-full ${
            showMobileMenu ? "-translate-y-80" : "translate-y-6"
          }`}
        >
          <LoginNavMobile />
        </div>
      </div>
    </nav>
  );
}

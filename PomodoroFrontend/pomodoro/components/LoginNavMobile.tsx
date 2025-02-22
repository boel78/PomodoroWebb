import { useUser } from "@/context/UserContext";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginNavMobile() {
  const router = useRouter();

  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-start gap-3 w-full bg-tomato-50 z-50 pb-8 shadow-md md:hidden absolute">
      <Button variant={"outline"} className="bg-tomato-500 text-tomato-50">
        <Link href="/dashboard" className="w-full">Home</Link>
      </Button>
      <Button variant={"outline"} className="bg-tomato-500 text-tomato-50">
        <Link href="/pomodoro-session" className="w-full">Sessions</Link>
      </Button>
      <Button variant={"outline"} className="bg-tomato-500 text-tomato-50">
        <Link href="/achievements" className="w-full">Achievements</Link>
      </Button>
      <Button variant={"outline"} className="bg-tomato-500 text-tomato-50">
        <Link href="/profile" className="w-full">Profile</Link>
      </Button>
      <Button
        className="bg-tomato-800 text-tomato-50 font-semibold"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}

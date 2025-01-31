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
    <div className="flex flex-col justify-start gap-3 w-full bg-tomato-50 absolute z-0 pb-8 shadow-md md:hidden">
      <Link href="/dashboard">
        <Button variant={"outline"} className="bg-tomato-500 text-tomato-50">
          Home
        </Button>
      </Link>
      <Link href="/pomodoro-session">
        {" "}
        <Button variant={"outline"} className="bg-tomato-500 text-tomato-50">
          Sessions
        </Button>
      </Link>
      <Link href="/achievements">
        <Button variant={"outline"} className="bg-tomato-500 text-tomato-50">
          Achievements
        </Button>
      </Link>
      <Link href="/profile">
        <Button variant={"outline"} className="bg-tomato-500 text-tomato-50">
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
  );
}

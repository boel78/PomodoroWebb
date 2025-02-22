"use client";
import LoginNav from "@/components/LoginNav";
import { Button } from "@/components/ui/button";
import InputWithLabel from "@/components/ui/input-with-label";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";

export default function Profile() {
    const {user, setUser} = useUser()

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        const payload = Object.fromEntries(formData);
        if (user) {
            payload.userName = user.userName;
        } else {
            toast.error("User is not logged in");
            return;
        }
        payload.preferredTime = payload.preferredTime + ":00"
        payload.preferredBreak = payload.preferredBreak + ":00"
        console.log(payload);
        try{
            const response = await fetch('http://localhost:5239/api/User/update', {
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ UserName: payload.userName, newPassword: payload.newPassword, currentPassword: payload.currentPassword, newEmail: payload.newEmail, newAlgorithm: payload.newAlgorithm, didInitialSetup: false }),
            })
            const data = await response.json()

            if(data.success){
                toast.success(data.message)
                setUser(data.data)
            }
            else{
                toast.error(data.message)
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

  return (
    <div className="bg-tomato-100 h-dvh md:h-auto flex flex-col items-center">
      <LoginNav />
      <form className="bg-tomato-50 shadow-md mt-24 p-4 flex flex-col items-center gap-4 md:w-1/2 md:mb-12" onSubmit={handleEdit}>
        <h2 className="font-semibold text-3xl text-tomato-700">
          Change profile
        </h2>
        <InputWithLabel
          label="New Email"
          id="newEmail"
          name="newEmail"
          placeholder="newemail@email.com"
        />
        <InputWithLabel
          label="Current Password"
          type="password"
          id="currentPassword"
          name="currentPassword"
        />
        <InputWithLabel
          label="New Password"
          type="password"
          id="newPassword"
          name="newPassword"
        />
        <div className="w-3/4 flex flex-col items-center gap-4">
            <InputWithLabel label="Preferred Pomodoro-Time(hr/mm)" type="time" id="preferredTime" name="preferredTime"/>
            <InputWithLabel label="Preferred Pomodoro-Break(hr/mm)" type="time" id="preferredBreak" name="preferredBreak"/>
            <div>
                <Label htmlFor="newAlgorithm">Algorithm setting</Label>
                <div></div>
                <select id="newAlgorithm" name="newAlgorithm" className="rounded-md p-4 w-full border border-input">
                  <option value={"longer_break"}>Longer breaks</option>
                  <option value={"shorter_break"}>Shorter breaks</option>
                </select>
            </div>
        </div>
        <Button variant={'outline'} className="self-center bg-tomato-800 text-tomato-50 font-semibold">Edit</Button>
      </form>
    </div>
  );
}

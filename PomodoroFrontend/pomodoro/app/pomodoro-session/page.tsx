import InputWithLabel from "@/components/ui/input-with-label";
import {Button} from "@/components/ui/button";

export default function Pomodoro() {
  return (
    <div className="bg-tomato-50 grid grid-cols-4 h-screen">
      <div className="col-span-1 bg-red-600 flex flex-col items-center">
        <h3>Previous sessions</h3>
      </div>
      <div className="col-span-3 bg-blue-500 flex flex-col items-center">
        <h2>00:00:00</h2>
        <h2>Create a new Session</h2>
        <form className="flex flex-col items-center gap-10">
            <InputWithLabel type="text" name="type" id="type" required={true} label="Type of session" placeholder="type" />
            <InputWithLabel type="time" name="time" id="time" required={true} label="Amount of time" placeholder="00:00:00"/>
            <Button variant={'outline'}>Start</Button>
        </form>
      </div>
    </div>
  );
}

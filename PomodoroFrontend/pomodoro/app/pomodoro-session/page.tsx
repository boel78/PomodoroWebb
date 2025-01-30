"use client";
import InputWithLabel from "@/components/ui/input-with-label";
import PreviousSession from "@/components/previous-session";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef} from "react";
import { useUser } from "@/context/UserContext";

export default function Pomodoro() {
  const totalTimeRef = useRef(0);
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [pomodoroLength, setPomodoroLength] = useState(0);
  const [breakLength, setBreakLength] = useState(0);
  const [workedTime, setWorkedTime] = useState(0)
  const [sessionType, setSessionType] = useState("")
  const {user, userSessions} = useUser();
  const [isSessionsVisible, setIsSessionsVisible] = useState(false)
  const preferedTime = "00:00:10";
  const preferedBreak = "00:00:05";
  const algoritmSetting = "longerBreak";

  useEffect(() => {
    if (!timerIsActive) return;
  
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          totalTimeRef.current -= isPomodoro ? pomodoroLength : breakLength;
          if(isPomodoro){setWorkedTime((prev) => prev + pomodoroLength)}
          setIsPomodoro((prevIsPomodoro) => !prevIsPomodoro);
  
          if (totalTimeRef.current <= 0) {
            setTimerIsActive(false);
            handleSuccesfullSession()
          }
          return isPomodoro ? breakLength : pomodoroLength;
        }
        return prevTime - 1;
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, [timerIsActive, pomodoroLength, breakLength, isPomodoro]);
  

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  const handleNewSession = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    const totalTime = payload.time + ":00";
    setSessionType(payload.type)

    const [totalhours, totalminutes, totalseconds] = totalTime
      .split(":")
      .map(Number);

    const totalTimeSeconds =
      totalhours * 3600 + totalminutes * 60 + totalseconds;
    totalTimeRef.current = totalTimeSeconds;

    const [preferedhours, preferedminutes, preferedseconds] = preferedTime
      .split(":")
      .map(Number);
    const [preferedBreakhours, preferedBreakminutes, preferedBreakseconds] =
      preferedBreak.split(":").map(Number);

    const preferedTimeSeconds =
      preferedhours * 3600 + preferedminutes * 60 + preferedseconds;

    const preferedBreakSeconds =
      preferedBreakhours * 3600 +
      preferedBreakminutes * 60 +
      preferedBreakseconds;

    const cycle_length = preferedBreakSeconds + preferedTimeSeconds;

    const amount_of_cycles = Math.floor(totalTimeSeconds / cycle_length);

    const rest_time = totalTimeSeconds - amount_of_cycles * cycle_length;

    const time_per_setting = rest_time / amount_of_cycles;

    if (algoritmSetting === "longerBreak") {
      setPomodoroLength(preferedTimeSeconds);
      setBreakLength(preferedBreakSeconds + time_per_setting);
    } else {
      setPomodoroLength(preferedTimeSeconds + time_per_setting);
      setBreakLength(preferedBreakSeconds);
    }
    setTimer(preferedTimeSeconds);
    setTimerIsActive(true);
  };

  const handleSuccesfullSession = () => {
    let date = new Date(Date.now()).toISOString()
    const dates = date.split("T")
    date = dates[0]
    
    const session = {
      type: sessionType,
      totalTime: formatTime(workedTime),
      dateCreated: date
    }
    console.log(session);
    
  }

  const handleSetSessionVisible = () => {
    setIsSessionsVisible(!isSessionsVisible)
  }

  return (
    <div className="bg-tomato-50 flex flex-col-reverse justify-end md:grid md:grid-cols-4 md:h-screen overflow-y-auto h-dvh">
      <div className="col-span-1 flex flex-col md:items-center shadow-lg bg-tomato-100 z-10 px-3 overflow-scroll">
        <h3 className="font-semibold text-3xl text-tomato-700 text-center py-6" onClick={handleSetSessionVisible}>Previous sessions</h3>
        <div className={`flex flex-col gap-4 transition-all duration-300 overflow-scroll ${
            isSessionsVisible ? "max-h-screen" : "max-h-0"
          }`}> 
        {
  userSessions && userSessions.length > 0 ? (
    userSessions.map((session, index) => (
      <PreviousSession key={index} data={session} />
    ))
  ) : (
    <h3>No Sessions found. Start your first session!</h3>
  )
}
        </div>
      </div>
      <div className="col-span-3 flex flex-col items-center pb-8">
        {timerIsActive ? (
          <div>
            <h2>{formatTime(workedTime)}</h2>
            <h2>{formatTime(totalTimeRef.current)}</h2>
            <h2>{formatTime(timer)}</h2>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="font-semibold text-tomato-700 text-3xl pt-6 pb-12">Welcome {user.userName}!</h2>
            <h3 className="text-tomato-500 text-xl">Create a new Session</h3>
            <form
              className="flex flex-col items-center gap-10 bg-tomato-100 rounded-md shadow-md p-4"
              onSubmit={handleNewSession}
            >
              <InputWithLabel
                type="text"
                name="type"
                id="type"
                required={true}
                label="Type of session"
                placeholder="type"
              />
              <InputWithLabel
                type="time"
                name="time"
                id="time"
                required={true}
                label="Amount of time"
                placeholder="00:00:00"
              />
              <Button variant={"outline"} className="bg-tomato-700 text-tomato-50">Start</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

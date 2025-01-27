"use client";
import InputWithLabel from "@/components/ui/input-with-label";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef} from "react";

export default function Pomodoro() {
  const totalTimeRef = useRef(0);
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [pomodoroLength, setPomodoroLength] = useState(0);
  const [breakLength, setBreakLength] = useState(0);
  const [workedTime, setWorkedTime] = useState(0)
  const [sessionType, setSessionType] = useState("")
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

  return (
    <div className="bg-tomato-50 grid grid-cols-4 h-screen">
      <div className="col-span-1 bg-red-600 flex flex-col items-center">
        <h3>Previous sessions</h3>
      </div>
      <div className="col-span-3 bg-blue-500 flex flex-col items-center">
        {timerIsActive ? (
          <div>
            <h2>{formatTime(workedTime)}</h2>
            <h2>{formatTime(totalTimeRef.current)}</h2>
            <h2>{formatTime(timer)}</h2>
          </div>
        ) : (
          <div>
            <h2>Create a new Session</h2>
            <form
              className="flex flex-col items-center gap-10"
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
              <Button variant={"outline"}>Start</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

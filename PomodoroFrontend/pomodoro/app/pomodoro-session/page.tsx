"use client";
import InputWithLabel from "@/components/ui/input-with-label";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

export default function Pomodoro() {
  const Ref = useRef(null);
  const isPomodoroRef = useRef(true);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [pomodoroLength, setPomodoroLength] = useState(0);
  const [breakLength, setBreakLength] = useState(0);
  const [totalTimeSeconds, setTotalTimeSeconds] = useState(0);
  const preferedTime = "00:00:10";
  const preferedBreak = "00:00:05";

  /*useEffect(() => {
    console.log("isPomodoro updated to: ", isPomodoro);
  }, [isPomodoro]);*/

  /*const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    if (totalTimeSeconds > 0) {
      let { total, hours, minutes, seconds } = getTimeRemaining(e);
      if (total >= 0) {
        setTimer(
          (hours > 9 ? hours : "0" + hours) +
            ":" +
            (minutes > 9 ? minutes : "0" + minutes) +
            ":" +
            (seconds > 9 ? seconds : "0" + seconds)
        );
      }
      //Timern tar slut
      else {
        console.log("Total time: " + totalTimeSeconds);

        const isPomodoro = isPomodoroRef.current;
        isPomodoroRef.current = !isPomodoro;
        
                
        if (isPomodoro) {
          console.log("AAAAAAA");
          
          
          onClickReset(pomodoroLength);
        } else {
          console.log("BBBBBBB");
          
          onClickReset(breakLength);
          
        }
        clearInterval(Ref.current)
        setTimerIsActive(false);
        setTimeout(() => {
          setTimerIsActive(true);
          onClickReset(isPomodoro ? pomodoroLength : breakLength);
        }, 1000);
      }
    } else {
      setTimerIsActive(false);
    }
  };

  

  const clearTimer = (e) => {
  if (Ref.current) clearInterval(Ref.current); // Clear previous interval
  const id = setInterval(() => {
    startTimer(e);
  }, 1000); // Create new interval
  Ref.current = id;
};

  const getDeadTime = (timeToSet) => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + timeToSet);
    return deadline;
  };

  const onClickReset = (timeToSet) => {
    clearTimer(getDeadTime(timeToSet));
  };*/

  useEffect(() => {
    if(timerIsActive){
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

    setPomodoroLength(preferedTimeSeconds);
    setBreakLength(preferedBreakSeconds + time_per_setting);
    setTimer(preferedTimeSeconds)
    }
  },[totalTimeSeconds])

  useEffect(() => {
    if (!timerIsActive) return; // If the timer isn't running, do nothing

    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 0) {
          // Switch to the other set of time
          const isPomodoro = isPomodoroRef.current;
          isPomodoroRef.current = !isPomodoro; // Toggle the session

          // Return the time for the next session (Pomodoro or Break)
          const newTimer = isPomodoro ? breakLength : pomodoroLength;
          return newTimer; // Switch time between 10 and 15 seconds
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerIsActive, pomodoroLength, breakLength]);

    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      return `${hours}:${minutes}:${secs}`;
    };

  const handleNewSession = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    const totalTime = payload.time + ":00";

    const [totalhours, totalminutes, totalseconds] = totalTime
      .split(":")
      .map(Number);      
      setTotalTimeSeconds(totalhours * 3600 + totalminutes * 60 + totalseconds);

    
      setTimerIsActive(true);

    
    
    //onClickReset(preferedTimeSeconds);
  };

  return (
    <div className="bg-tomato-50 grid grid-cols-4 h-screen">
      <div className="col-span-1 bg-red-600 flex flex-col items-center">
        <h3>Previous sessions</h3>
      </div>
      <div className="col-span-3 bg-blue-500 flex flex-col items-center">
        {timerIsActive ? (
          <h2>{formatTime(timer)}</h2>
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

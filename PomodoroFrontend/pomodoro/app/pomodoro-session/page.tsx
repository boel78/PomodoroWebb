"use client";
import InputWithLabel from "@/components/ui/input-with-label";
import PreviousSession from "@/components/previous-session";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useCallback} from "react";
import { useUser } from "@/context/UserContext";
import ConfirmCancel from "@/components/ConfirmCancel";
import { toast } from "react-toastify";
import LoginNav from "@/components/LoginNav";
import TaskList from "@/components/TaskList";
import { Ban, BanIcon } from "lucide-react";

export default function Pomodoro() {
  const totalTimeRef = useRef(0);
  const workedTimeRef = useRef(0);
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [pomodoroLength, setPomodoroLength] = useState(0);
  const [breakLength, setBreakLength] = useState(0);
  const [sessionType, setSessionType] = useState("")
  const [showCancelWindow, setShowCancelWindow] = useState(false)
  const {user, userSessions, setUserSessions} = useUser();
  const [isSessionsVisible, setIsSessionsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false);
  const [showRemainingTime, setShowRemainingTime] = useState(true);
  const [taskList, setTaskList] = useState<{id: number, text: string}[]>([]);
  const completedTasks = useRef(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCompleteTask = () => {

    if(timerIsActive){
      completedTasks.current += 1;
    } 
    
  }

  const handleSuccesfullSession = useCallback(async () => {
    if(timerIsActive){setTimerIsActive(false)}    
    if(workedTimeRef.current != 0){
    let date = new Date(Date.now()).toISOString()
    const dates = date.split("T")
    date = dates[0]
    const session = {
      type: sessionType,
      timeSpent: formatTime(workedTimeRef.current),
      dateCreated: date,
      tasksCompleted: completedTasks.current,
      totalExtraTime: formatTime(0)
    }
    if (user) {
      
      try {
        const response = await fetch('https://pomodoro-a7ehd9geebhtg9d0.centralus-01.azurewebsites.net/api/Session/addSession', {
          method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userName: user.userName, session: session }),
        })
        const sessionData = await response.json();
        
        if(sessionData.success){
          toast.success("Successfully added the new Session!")
          //Hämta sessions
          try{
            const userSessionResponse = await fetch(`https://pomodoro-a7ehd9geebhtg9d0.centralus-01.azurewebsites.net/api/Session/getSessionsByUsername/${user.userName}`, {
              method: 'GET',
            })
            const userSessionData = await userSessionResponse.json()
            setUserSessions(userSessionData)
          }
          catch(error){
            if (error instanceof Error) {
              console.log(error.message);
            } else {
              console.log(String(error));
            }
            
          }
        }
        else{
          toast.error(sessionData.message)
        }
      }
      catch(error){
        if (error instanceof Error) {
          console.log(error.message);
        }
        
      }
    } else {
      toast.error("User is not logged in.");
    }
  }
  }, [timerIsActive, sessionType, user, setUserSessions])


  useEffect(() => {
    if (!timerIsActive) return;
  
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if(isPomodoro){workedTimeRef.current += 1}

        if (prevTime <= 1) {
          totalTimeRef.current -= isPomodoro ? pomodoroLength : breakLength;
          
          
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
  }, [timerIsActive, pomodoroLength, breakLength, isPomodoro, handleSuccesfullSession]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  const handleNewSession = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    completedTasks.current = 0;
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData);
    const totalTime = payload.time + ":00" as string;
    workedTimeRef.current = 0
    totalTimeRef.current = 0
    setIsPomodoro(true)
    setSessionType(payload.type as string)
    
    const [totalhours, totalminutes, totalseconds] = totalTime
      .split(":")
      .map(Number);

    const totalTimeSeconds =
      totalhours * 3600 + totalminutes * 60 + totalseconds;
    totalTimeRef.current = totalTimeSeconds;

    setTimer(pomodoroLength);
    

    if (!user) {
      toast.error("User is not logged in.");
      return;
    }

    const [preferedhours, preferedminutes, preferedseconds] = user.preferredPomodoro
      .split(":")
      .map(Number);

      
    
    
    const [preferedBreakhours, preferedBreakminutes, preferedBreakseconds] =
      user.preferredBreak.split(":").map(Number);

    let preferedTimeSeconds =
      preferedhours * 3600 + preferedminutes * 60 + preferedseconds;    

      let preferedBreakSeconds =
      preferedBreakhours * 3600 +
      preferedBreakminutes * 60 +
      preferedBreakseconds;

      if(totalTimeSeconds < preferedTimeSeconds){        
        preferedTimeSeconds = totalTimeSeconds
        preferedBreakSeconds = 0
      }
    

    const cycle_length = preferedBreakSeconds + preferedTimeSeconds;
    
    
    

    const amount_of_cycles = Math.floor(totalTimeSeconds / cycle_length);
    
    
    
    const rest_time = totalTimeSeconds - amount_of_cycles * cycle_length;

    

    const time_per_setting = rest_time / amount_of_cycles;
    

    if (user.algoritmsetting === "longer_break") {
      setPomodoroLength(preferedTimeSeconds);
      setBreakLength(preferedBreakSeconds + time_per_setting);
      
    } else {
      setPomodoroLength(preferedTimeSeconds + time_per_setting);
      setBreakLength(preferedBreakSeconds);
    }

    
    setTimerIsActive(true);
  };

  useEffect(() => {    
    setTimer(pomodoroLength);
    //setTimerIsActive(true);
  },[pomodoroLength, breakLength])

  

  const handleSetSessionVisible = () => {
    if(window.innerWidth < 500 ){
      setIsSessionsVisible(!isSessionsVisible)
    }
  }

  //Säger åt användaren att deras sparningar kanske går förlorade
  useEffect(() => {
    const handleBeforeUnload = (event: { returnValue: string; }) => {
      if (timerIsActive) {
        const message = "You have an active session. Are you sure you want to leave?";
        event.returnValue = message; 
        return message; 
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
});

  if (!isMounted) {
    return <div className="flex flex-col items-center justify-center"><p>Loading...</p></div>; 
  }

  

  return (
    <div className="bg-tomato-50 flex flex-col-reverse justify-end md:grid md:grid-cols-4 md:h-dvh overflow-y-auto md:overflow-hidden h-dvh">
      <LoginNav/>
      <div className="col-span-1 flex flex-col md:items-center shadow-lg bg-tomato-100 px-3 overflow-scroll mt-auto md:pt-12 h-dvh">
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
      
      <div className="col-span-3 flex flex-col items-center md:pb-8 md:h-full mt-20 overflow-y-auto">
        {timerIsActive ? (
          <div>
          {showCancelWindow && <ConfirmCancel setShowCancelWindow={setShowCancelWindow} handleSuccesfullSession={handleSuccesfullSession}/>}
           <div className="flex flex-col items-center gap-10">
             <div className="flex items-center gap-3">{showRemainingTime ? (<><h2>Total Time: {formatTime(totalTimeRef.current)}</h2> <span onClick={() => setShowRemainingTime(false)}><Ban className="text-red-500 cursor-pointer"/></span></>) : <h2 onClick={() => setShowRemainingTime(true)} className="cursor-pointer">Show remaining time</h2>} </div>
            <div className="flex flex-col items-center gap-5">
              {isPomodoro ? <h2>Time to work!</h2>
              : <h2>Time for some rest!</h2>}
              
              <h2>Time left: {formatTime(timer)}</h2>
              <Button variant={'outline'} className="bg-tomato-700 text-tomato-50" onClick={() => setShowCancelWindow(!showCancelWindow)}>Cancel</Button>
              <TaskList taskList={taskList} setTaskList={setTaskList} handleCompleteTask={handleCompleteTask}/>
            </div>
           </div>
           </div>
        ) : (
          <div className="flex flex-col items-center gap-10 overflow-y-auto w-full">
            <h2 className="font-semibold text-tomato-700 text-3xl pt-6 pb-12">Welcome {user ? user.userName : "Guest"}!</h2>
            <h3 className="text-tomato-500 text-xl">Start a new Session</h3>
            <div className="flex flex-col md:flex-row gap-5 w-full px-10 pb-10">
              <form
                className="flex flex-col items-center gap-10 bg-tomato-100 rounded-md w-full shadow-md p-4"
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
              <TaskList taskList={taskList} setTaskList={setTaskList} handleCompleteTask={handleCompleteTask}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

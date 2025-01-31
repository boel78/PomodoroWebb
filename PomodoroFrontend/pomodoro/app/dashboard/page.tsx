"use client";
import { useUser } from "@/context/UserContext";
import { log } from "console";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user, userSessions } = useUser();
  const [totalTime, setTotalTime] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [totalExtraTime, setTotalExtraTime] = useState(0);
  const [mostCommonType, setMostCommonType] = useState("");

  useEffect(() => {
    if (userSessions) {
      const typeCount = {};

      //Går igenom varje session
      userSessions.map((sessions) => {
        if (isDateInCurrentWeek(sessions.dateCreated)) {
          //Formaterar totalTid till sekunder och sätter det
          const [totalhours, totalminutes, totalseconds] = sessions.timeSpent
            .split(":")
            .map(Number);

          const totalTimeSeconds =
            totalhours * 3600 + totalminutes * 60 + totalseconds;
          setTotalTime((prev) => prev + totalTimeSeconds);

          //Formaterar extratid och sätter det
          const [totalExtrahours, totalExtraminutes, totalExtraseconds] =
            sessions.totalExtraTime.split(":").map(Number);
          const totalExtraTimeSeconds =
            totalExtrahours * 3600 + totalExtraminutes * 60 + totalExtraseconds;
          setTotalExtraTime((prev) => prev + totalExtraTimeSeconds);

          //kollar totalTasks och vilken typ
          setTasksCompleted((prev) => prev + sessions.tasksCompleted);
          typeCount[sessions.type] = (typeCount[sessions.type] || 0) + 1;
        }
      });

      //Kollar mest använda typ
      const mostCommonType = Object.keys(typeCount).reduce((a, b) =>
        typeCount[a] > typeCount[b] ? a : b
      );

      setMostCommonType(mostCommonType);
    }
  }, []);

  //Hjälp funktion för formatering av tid
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
  //Hjälpfunktion för veckocheck
  function isDateInCurrentWeek(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    // Hitta måndag i denna vecka
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return date >= startOfWeek && date <= endOfWeek;
  }

  return (
    <div className="bg-tomato-100 flex flex-col items-center h-dvh pt-20">
      <h2 className="font-semibold text-tomato-700 text-3xl md:text-6xl">Your Dashboard</h2>
      <div className="bg-tomato-50 shadow-md rounded-md p-8 my-16 flex flex-col items-center gap-4 md:w-1/3 w-full">
        <h3 className="font-semibold text-tomato-700 text-xl md:text-3xl">
          Weekly statistics
        </h3>
        <p>Total Pomodorotime: {formatTime(totalTime)}</p>
        <p>Tasks completed: {tasksCompleted}</p>
        {totalExtraTime > 0 && <p>Extra time worked: {formatTime(totalExtraTime)}</p>}
        <p>Most popular type: {mostCommonType}</p>
      </div>
      <div className="bg-tomato-50 shadow-md rounded-md p-8 flex flex-col items-center gap-4 w-full h-full">
        <h3 className="font-semibold text-tomato-700 text-xl md:text-3xl">Achievements</h3>
        <p>To be announced</p>
      </div>
    </div>
  );
}

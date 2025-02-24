"use client";
import LoginNav from "@/components/LoginNav";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://pomodoro-a7ehd9geebhtg9d0.centralus-01.azurewebsites.net/api/Achievement/GetAchievements",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setAchievements(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(String(error));
        }
      }
    }
    fetchData();    
  }, []);

  useEffect(()=>{
    console.log(user);
    
  },[user])

  return (
    <div className="flex flex-col bg-tomato-50 h-dvh ">
      <LoginNav />
      <h2 className="text-tomato-700 text-2xl md:text-5xl pt-24 font-semibold text-center">
        Achievements
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-10 md:pt-10">
        {achievements &&
          achievements.map(
            (achievement: {
              aid: number;
              title: string;
              description: string;
              image: string;
            }) => (
              <div
              key={`achievement-${achievement.aid}`}
                className="flex items-start gap-4 shadow-md p-2 bg-tomato-200 rounded-md "
              >
                
                
              {user && (
                user.userAchievements && user.userAchievements.length < 1 ? (
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="h-24 grayscale"
                    key={`achievement-${achievement.aid}`}
                  />
                ) : (
                  user.userAchievements.map((userAchievement) => {
                    console.log('Achievement ID:', achievement);
                    console.log('User Achievement ID:', userAchievement.achievementId);

                    if (userAchievement.achievementId === achievement.aid) {
                      console.log("Achievement Unlocked");
                      
                      return (
                        <img
                          src={achievement.image}
                          alt={achievement.title}
                          className="h-24"
                          key={`achievement-${achievement.aid}`}
                        />
                      );
                    } else {
                      console.log("Achievement Locked");
                      
                      return (                        
                        <img
                          src={achievement.image}
                          alt={achievement.title}
                          className="h-24 grayscale"
                          key={`achievement-${achievement.aid}`}
                        />
                      );
                    }
                  })
                )
              )}
              
                <div>
                  <h3 className="font-semibold text-xl">{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
}

"use client"
import LoginNav from "@/components/LoginNav";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";


export default function Achievements(){

    const [achievements, setAchievements] = useState([])
    const {user} = useUser()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5239/api/Achievement/GetAchievements', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });                
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
    }, [])

    return(
        <div className="flex flex-col bg-tomato-50 h-dvh">
            <LoginNav />
            <h2 className="text-tomato-700 text-2xl md:text-5xl pt-24 font-semibold text-center">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-10">
                {achievements && achievements.map((achievement: { title: string; description: string; image: string }) => (
                    <div key={achievement.title} className="flex items-center gap-4">
                        <img src={achievement.image} alt={achievement.title} className="h-24"/>
                        <div>
                            <h3 className="font-semibold text-xl">{achievement.title}</h3>
                            <p>{achievement.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
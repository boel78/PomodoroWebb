import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';



interface UserAchievement {
    userId: string;
    achievementId: number;
    progress: number;
}

interface User {
    id: string;
    userName: string;
    userAchievements: UserAchievement[];
}

interface Achievement {
    id: number;
    title: string;
    description: string;
    image: string;
}

const useAchievements = () => {
    const { setUser, user } = useUser();
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    useEffect(() => {
        // Fetch achievements from an API or other source
        const fetchAchievements = async () => {
            const response = await fetch('/api/achievements');
            const data = await response.json();
            setAchievements(data);
        };

        fetchAchievements();
    }, []);

    const addAchievementToUser = async (achievementTitle: string) => {
        let aid = 0
        try{
            const response = await fetch(`http://localhost:5239/api/Achievement/GetByName/${achievementTitle}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            console.log(response);
            
        } catch (error){
            console.log(error);    
        }

        try{
            console.log(user?.userName, achievementTitle);
            
            await fetch(`http://localhost:5239/api/Achievement/AddAchievementToUser?userName=${user?.userName}&achievementTitle=${achievementTitle}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            
            /*if (user) {
                
                setUser({ ...user, userAchievements: [...user.userAchievements, { userId: user.id, achievementId: 2, progress: 100 }] });
            }*/
        }
        catch(error){
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log(String(error));
        }
    }
    };

    return { achievements, addAchievementToUser };
};

export default useAchievements;
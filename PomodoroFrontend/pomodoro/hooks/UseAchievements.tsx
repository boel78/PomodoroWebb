import { useState, useEffect } from 'react';

interface Achievement {
    id: number;
    title: string;
    description: string;
    image: string;
}

const useAchievements = () => {
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

    const addAchievementToUser = async (userName: string, achievementTitle: string) => {
        try{
            console.log(userName, achievementTitle);
            
            await fetch(`https://pomodoro-a7ehd9geebhtg9d0.centralus-01.azurewebsites.net
/api/Achievement/AddAchievementToUser?userName=${userName}&achievementTitle=${achievementTitle}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
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
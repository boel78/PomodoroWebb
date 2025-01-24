using PomodoroAPI.Models;

namespace PomodoroAPI.Interfaces;

public interface IAchievementRepository
{
    
    public Task<List<Achievement>> GetAchievements();
}
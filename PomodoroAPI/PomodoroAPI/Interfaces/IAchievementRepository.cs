using PomodoroAPI.Models;

namespace PomodoroAPI.Interfaces;

public interface IAchievementRepository
{
    
    public Task<List<Achievement>> GetAchievements();
    public Task<Achievement> GetByName(string name);
    public Task AddAchievementToUser(string userId, string achievementTitle);
}
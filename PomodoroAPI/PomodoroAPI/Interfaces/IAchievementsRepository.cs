using PomodoroAPI.Models;

namespace PomodoroAPI.Interfaces;

public interface IAchievementsRepository
{
    public Task<List<Achievement>> GetAchievements();
    public Task<Achievement> GetAchievementById(int id);
    public int AddAchievement(Achievement achievement);
    public int UpdateAchievement(Achievement achievement);
    public int DeleteAchievement(Achievement achievement);
}
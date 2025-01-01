using Microsoft.EntityFrameworkCore;
using PomodoroAPI.Interfaces;
using PomodoroAPI.Models;

namespace PomodoroAPI.Repositories;

public class AchievementRepository : IAchievementsRepository
{
    private readonly PomodoroContext _context;

    public AchievementRepository(PomodoroContext context)
    {
        _context = context;
    }
    
    
    public async Task<List<Achievement>> GetAchievements()
    {
        var achievements = await _context.Achievements.ToListAsync();
        return achievements;
    }

    public Task<Achievement> GetAchievementById(int id)
    {
        throw new NotImplementedException();
    }

    public int AddAchievement(Achievement achievement)
    {
        throw new NotImplementedException();
    }

    public int UpdateAchievement(Achievement achievement)
    {
        throw new NotImplementedException();
    }

    public int DeleteAchievement(Achievement achievement)
    {
        throw new NotImplementedException();
    }
}
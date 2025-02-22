using Microsoft.EntityFrameworkCore;
using PomodoroAPI.Interfaces;
using PomodoroAPI.Models;

namespace PomodoroAPI.Repositories;

public class AchievementRepository : IAchievementRepository
{
    private readonly PomodoroContext _context;

    public AchievementRepository(PomodoroContext context)
    {
        _context = context;
    }
    
    public async Task<List<Achievement>> GetAchievements()
    {
        var achievements = await _context.Achievements.Include(a => a.UserAchievements).ToListAsync();
        return achievements;
    }
}
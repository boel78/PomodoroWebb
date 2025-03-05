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

    public async Task<Achievement> GetByName(string name)
    {
        var achievement = await _context.Achievements.Include(a => a.UserAchievements).Where(a => a.Title == name)
            .FirstOrDefaultAsync();
        return achievement;
    }

    public async Task AddAchievementToUser(string userName, string achievementTitle)
    {
        var achievement = await _context.Achievements.Where(a => a.Title == achievementTitle).FirstOrDefaultAsync();
        var user = await _context.Users.Where(u => u.UserName == userName).FirstOrDefaultAsync();
        var userAchievement = new UserAchievements()
        {
            UserId = user.Id,
            AchievementId = achievement.Aid,
            Progress = 100
        };
        _context.UserAchievements.Add(userAchievement);
        await _context.SaveChangesAsync();
        
    }
}
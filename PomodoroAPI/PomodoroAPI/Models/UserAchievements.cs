namespace PomodoroAPI.Models;

public class UserAchievements
{
    public string UserId { get; set; }
    public User User { get; set; } = null!;
    public int AchievementId { get; set; }
    public Achievement Achievement { get; set; } = null!;
    public int Progress { get; set; }
}
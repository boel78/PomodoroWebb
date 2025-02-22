using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PomodoroAPI.Models;

public partial class Achievement
{
    public int Aid { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }
    
    public string? Image { get; set; }

    [JsonIgnore]
    public List<UserAchievements> UserAchievements { get; set; } = new List<UserAchievements>();
}

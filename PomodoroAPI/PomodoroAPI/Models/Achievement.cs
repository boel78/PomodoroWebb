using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;

namespace PomodoroAPI.Models;

[Collection("Achievements")]
public partial class Achievement
{
    public ObjectId Aid { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }
    
    public string? Image { get; set; }

    [JsonIgnore]
    public List<UserAchievements> UserAchievements { get; set; } = new List<UserAchievements>();
}

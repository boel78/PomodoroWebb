using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PomodoroAPI.Models;

public partial class Session
{
    public int id { get; set; }

    public string? Type { get; set; }

    public TimeOnly? TimeSpent { get; set; }

    public DateOnly? DateCreated { get; set; }
    public int TasksCompleted { get; set; }
    public TimeOnly TotalExtraTime { get; set; }

    [JsonIgnore]
    public virtual ICollection<User> Uids { get; set; } = new List<User>();
}

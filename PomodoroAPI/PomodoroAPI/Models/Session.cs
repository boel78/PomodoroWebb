using System;
using System.Collections.Generic;

namespace PomodoroAPI.Models;

public partial class Session
{
    public int Sid { get; set; }

    public string? Type { get; set; }

    public TimeOnly? TimeSpent { get; set; }

    public DateOnly? DateCreated { get; set; }

    public virtual ICollection<User> Uids { get; set; } = new List<User>();
}

using System;
using System.Collections.Generic;

namespace PomodoroAPI.Models;

public partial class Achievement
{
    public int Aid { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<User> Uids { get; set; } = new List<User>();
}

using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace PomodoroAPI.Models;

public partial class User : IdentityUser
{
    public int Streak { get; set; }
    public string Algoritmsetting { get; set; }

    

    public virtual ICollection<Achievement> Achievements { get; set; } = new List<Achievement>();
    
    public virtual ICollection<Session> Sessions { get; set; } = new List<Session>();
}

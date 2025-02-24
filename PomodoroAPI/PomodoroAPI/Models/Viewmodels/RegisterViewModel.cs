namespace PomodoroAPI.Models.Viewmodels;

public class RegisterViewModel
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string PreferredTime { get; set; }
    public string PreferredBreak { get; set; }
}
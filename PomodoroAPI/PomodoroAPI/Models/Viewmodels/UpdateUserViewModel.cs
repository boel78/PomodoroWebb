namespace PomodoroAPI.Models.Viewmodels;

public class UpdateUserViewModel
{
    public string UserName { get; set; }
    public string CurrentEmail { get; set; }
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
    public string NewEmail { get; set; }
    public string NewAlgorithm { get; set; }
    public string PreferredTime { get; set; }
    public string PreferredBreak { get; set; }
    public bool DidInitialSetup { get; set; }
}
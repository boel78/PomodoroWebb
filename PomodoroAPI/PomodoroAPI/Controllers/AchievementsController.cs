using Microsoft.AspNetCore.Mvc;
using PomodoroAPI.Interfaces;

namespace PomodoroAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AchievementsController : ControllerBase
{   
    private readonly IAchievementsRepository achievementsRepository;

    public AchievementsController(IAchievementsRepository achievementsRepository)
    {
        this.achievementsRepository = achievementsRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAchievements()
    {
        try
        {
            var achievements = await achievementsRepository.GetAchievements();
            return Ok(achievements);
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message, stackTrace = e.StackTrace });

        }
        
    }
    
}
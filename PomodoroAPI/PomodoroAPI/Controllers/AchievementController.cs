using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PomodoroAPI.Interfaces;
using PomodoroAPI.Models;

namespace PomodoroAPI.Controllers;

[Controller]
[Route("api/[controller]")]
public class AchievementController : ControllerBase
{ 
    private readonly IAchievementRepository _achievementRepository;

    public AchievementController(IAchievementRepository achievementRepository)
    {
        _achievementRepository = achievementRepository;
    }

    [HttpGet("GetAchievements")]
    public async Task<IActionResult> GetAchievements()
    {
        try
        {
            var achievements = await _achievementRepository.GetAchievements();
            return Ok(achievements);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
}
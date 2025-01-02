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
    private readonly ILogger<AchievementController> _logger;
    private readonly IAchievementRepository _achievementRepository;

    public AchievementController(ILogger<AchievementController> logger, IAchievementRepository achievementRepository)
    {
        _logger = logger;
        _achievementRepository = achievementRepository;
    }

    [HttpGet]
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
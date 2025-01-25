using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PomodoroAPI.Interfaces;
using PomodoroAPI.Models;
using PomodoroAPI.Models.Viewmodels;

namespace PomodoroAPI.Controllers;

[Controller]
[Route("api/[controller]")]
public class SessionController : ControllerBase
{
    private readonly ISessionRepository _sessionRepository;

    public SessionController(ISessionRepository sessionRepository)
    {
        _sessionRepository = sessionRepository;
    }

    [HttpPost("addSession")]
    public async Task<IActionResult> AddSession([FromBody] AddSessionViewModel vm)
    {
        ServiceResponse<Session> response = await _sessionRepository.AddSession(vm.UserName, vm.Session);
        if (response.Success)
        {
            return Ok(response);
        }
        return BadRequest(response);
    }

    [HttpGet("getSessionsByUserName/{username}")]
    public async Task<IActionResult> GetSessionsByUserId(string username)
    {
        List<Session> sessions = await _sessionRepository.GetSessionsByUserName(username);
        return Ok(sessions);
    }
}
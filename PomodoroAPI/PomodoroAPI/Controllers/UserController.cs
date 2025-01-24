using Microsoft.AspNetCore.Mvc;
using PomodoroAPI.Interfaces;
using PomodoroAPI.Models;

namespace PomodoroAPI.Controllers;

[Controller]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {

            ServiceResponse<User> response = await _userRepository.AddUser(user);
            if (response.Success)
            {
                return Ok(response);

            }
            else
            {
                return BadRequest(response);
            }
    }
    
}
using Microsoft.AspNetCore.Mvc;
using PomodoroAPI.Interfaces;
using PomodoroAPI.Models;
using PomodoroAPI.Models.Viewmodels;

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
    public async Task<IActionResult> Register([FromBody] RegisterViewModel vm)
    {
        User user = new User
        {
            UserName = vm.UserName,
            Email = vm.Email
        };
            ServiceResponse<User> response =  await _userRepository.AddUser(user, vm.Password);
            if (response.Success)
            {
                return Ok(response);

            }
            return BadRequest(response);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginViewModel vm)
    {
        ServiceResponse<User> response = await _userRepository.LoginUser(vm);
        if (response.Success)
        {
            return Ok(response);
        }
        return BadRequest(response);
    }
    
}
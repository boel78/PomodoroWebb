using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using PomodoroAPI.Interfaces;
using PomodoroAPI.Models;

namespace PomodoroAPI.Repositories;

public class UserRepository : IUserRepository
{
    private UserManager<User> userManager;
    private SignInManager<User> signInManager;
    private PomodoroContext context;

    public UserRepository(UserManager<User> _userManager, SignInManager<User> _signInManager, PomodoroContext _context)
    {
        userManager = _userManager;
        signInManager = _signInManager;
        context = _context;
    }
    public async Task<ServiceResponse<User>> AddUser(User user)
    {
        var response = new ServiceResponse<User>();

        if (await userManager.FindByEmailAsync(user.Email) != null)
        {
            response.Success = false;
            response.Message = "Email already exists";
            return response;
        }
        
        if (await userManager.FindByNameAsync(user.Email) != null)
        {
            response.Success = false;
            response.Message = "Username already exists";
            return response;
        }
        var result = await userManager.CreateAsync(user);

        if (result.Succeeded)
        {
            await signInManager.SignInAsync(user, false);
            
            response.Success = true;
            response.Message = "User created";
            response.Data = user;
        }
        else
        {
            response.Success = false;
            response.Message = "User creation failed";
        }

        return response;
    }
}
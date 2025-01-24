using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

        //Om email redan finns
        if (await userManager.FindByEmailAsync(user.Email) != null)
        {
            response.Success = false;
            response.Message = "Email already exists";
            return response;
        }
        
        //Om Username redan finns
        if (await userManager.FindByNameAsync(user.Email) != null)
        {
            response.Success = false;
            response.Message = "Username already exists";
            return response;
        }
        var result = await userManager.CreateAsync(user);

        if (result.Succeeded)
        {
            //Ifall fler än 5 finns
            var userCount = context.Users.Count();
            if (userCount > 5)
            {
                var oldestUser = await context.Users.OrderByDescending(x => x.Id).FirstOrDefaultAsync();

                if (oldestUser != null)
                {
                    context.Remove(oldestUser);
                    await context.SaveChangesAsync();
                }
            }
            
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
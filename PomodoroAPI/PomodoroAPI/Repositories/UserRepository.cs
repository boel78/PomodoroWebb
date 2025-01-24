using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PomodoroAPI.Interfaces;
using PomodoroAPI.Models;
using PomodoroAPI.Models.Viewmodels;

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
    public async Task<ServiceResponse<User>> AddUser(User user, string password)
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
        var result = await userManager.CreateAsync(user, password);

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
            response.Message = string.Join(", ", result.Errors.Select(e => e.Description));
        }

        return response;
    }

    public async Task<ServiceResponse<User>> LoginUser(LoginViewModel vm)
    {
        var response = new ServiceResponse<User>();
        
        var user = await userManager.FindByNameAsync(vm.Username);
        if (user == null)
        {
            response.Success = false;
            response.Message = "User does not exist";
            return response;
        }
        
        var isPasswordValid = await userManager.CheckPasswordAsync(user, vm.Password);
        if (!isPasswordValid)
        {
            response.Success = false;
            response.Message = "Invalid password";
            return response;
        }
        var result = await signInManager.PasswordSignInAsync(vm.Username, vm.Password, vm.RememberMe, false);

        if (result.Succeeded)
        {
            response.Data = await userManager.FindByNameAsync(vm.Username);
            response.Success = true;
            response.Message = "User logged in";
        }
        else
        {
            response.Success = false;
            response.Message = "Login failed";
        }

        return response;
    }
}
using PomodoroAPI.Models;
using PomodoroAPI.Models.Viewmodels;

namespace PomodoroAPI.Interfaces;

public interface IUserRepository
{
    public Task<ServiceResponse<User>> AddUser(User user, string password);
    public Task<ServiceResponse<User>> LoginUser(LoginViewModel vm);

    public Task<ServiceResponse<User>> UpdateUser(UpdateUserViewModel vm);
}
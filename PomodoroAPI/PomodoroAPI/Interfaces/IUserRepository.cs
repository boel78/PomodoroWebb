using PomodoroAPI.Models;
namespace PomodoroAPI.Interfaces;

public interface IUserRepository
{
    public Task<ServiceResponse<User>> AddUser(User user);
}
using Microsoft.AspNetCore.Identity;
using PomodoroAPI.Interfaces;
using PomodoroAPI.Models;

namespace PomodoroAPI.Repositories;

public class SessionRepository : ISessionRepository
{
    private UserManager<User> _userManager;
    private PomodoroContext _context;

    public SessionRepository(UserManager<User> userManager, PomodoroContext context)
    {
        _userManager = userManager;
        _context = context;
    }
    public async Task<ServiceResponse<Session>> AddSession(string username, Session session)
    {
        var response = new ServiceResponse<Session>();
        var user = await _userManager.FindByNameAsync(username);
        
        _context.Sessions.Add(session);
        user.Sessions.Add(session);
        await _context.SaveChangesAsync();
        response.Data = session;
        response.Message = "Session added";
        response.Success = true;
        return response;
    }
}
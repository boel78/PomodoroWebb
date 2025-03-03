using PomodoroAPI.Models;

namespace PomodoroAPI.Interfaces;

public interface ISessionRepository
{
    public Task<ServiceResponse<Session>> AddSession(string username, Session session);
    public Task<List<Session>> GetSessionsByUserName(string username);
}
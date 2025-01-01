using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PomodoroAPI.Interfaces;
using PomodoroAPI.Models;
using PomodoroAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddSwaggerGen();  // Detta är mer standard för att aktivera Swagger




builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<PomodoroContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IAchievementsRepository, AchievementRepository>();


builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<PomodoroContext>()
    .AddDefaultTokenProviders();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http:localhost:3001/").AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => 
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Pomodoro API v1");
        c.RoutePrefix = string.Empty; // Gör att Swagger UI laddas på http://localhost:<port>/
    });
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();


using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PomodoroAPI.Migrations
{
    /// <inheritdoc />
    public partial class AchievementImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Achievements",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Achievements");
        }
    }
}

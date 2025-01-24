using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace PomodoroAPI.Models;

public partial class PomodoroContext : IdentityDbContext<User>
{
    public PomodoroContext()
    {
    }

    public PomodoroContext(DbContextOptions<PomodoroContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Achievement> Achievements { get; set; }



    public virtual DbSet<User> Users { get; set; }


    public virtual DbSet<Session> Sessions { get; set; }

    /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("DefaultConnection");*/

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Achievement>(entity =>
        {
            entity.HasKey(e => e.Aid).HasName("PK__Achievme__DE508E2E6000B13C");

            entity.Property(e => e.Aid)
                .ValueGeneratedOnAdd()
                .HasColumnName("aid");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .HasColumnName("description");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");
        });

        
        

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

            entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedUserName] IS NOT NULL)");

            entity.Property(e => e.Algoritmsetting).HasMaxLength(200);
            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(256);
            entity.Property(e => e.UserName).HasMaxLength(256);

            entity.HasMany(d => d.Achievements).WithMany(p => p.Uids)
                .UsingEntity<Dictionary<string, object>>(
                    "UserAchievement",
                    r => r.HasOne<Achievement>().WithMany()
                        .HasForeignKey("AchievementId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("UserAchievements_Achievements_aid_fk"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("Uid")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("UserAchievements_AspNetUsers_Id_fk"),
                    j =>
                    {
                        j.HasKey("Uid", "AchievementId").HasName("UserAchievements_pk");
                        j.ToTable("UserAchievements");
                        j.IndexerProperty<string>("Uid").HasColumnName("UID");
                        j.IndexerProperty<int>("AchievementId").HasColumnName("AchievementID");
                    });

            

            entity.HasMany(d => d.Sessions).WithMany(p => p.Uids)
                .UsingEntity<Dictionary<string, object>>(
                    "UserSession",
                    r => r.HasOne<Session>().WithMany()
                        .HasForeignKey("SessionId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("UserSessions_Sessions_sid_fk"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("Uid")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("UserSessions_AspNetUsers_Id_fk"),
                    j =>
                    {
                        j.HasKey("Uid", "SessionId").HasName("UserSessions_pk");
                        j.ToTable("UserSessions");
                        j.IndexerProperty<string>("Uid").HasColumnName("UID");
                        j.IndexerProperty<int>("SessionId").HasColumnName("SessionID");
                    });
        });

        

        modelBuilder.Entity<Session>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Sessions__DDDFDD36EAD002F3");

            entity.Property(e => e.id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.DateCreated).HasColumnName("dateCreated");
            entity.Property(e => e.TimeSpent).HasColumnName("timeSpent");
            entity.Property(e => e.Type)
                .HasMaxLength(100)
                .HasColumnName("type");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

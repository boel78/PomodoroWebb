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

    public virtual DbSet<Achievment> Achievments { get; set; }

    public virtual DbSet<Session> Sessions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Achievment>(entity =>
        {
            entity.HasKey(e => e.Aid).HasName("PK__Achievme__DE508E2E6000B13C");

            entity.Property(e => e.Aid)
                .ValueGeneratedNever()
                .HasColumnName("aid");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .HasColumnName("description");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");
        });

        modelBuilder.Entity<Session>(entity =>
        {
            entity.HasKey(e => e.Sid).HasName("PK__Sessions__DDDFDD36EAD002F3");

            entity.Property(e => e.Sid)
                .ValueGeneratedNever()
                .HasColumnName("sid");
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

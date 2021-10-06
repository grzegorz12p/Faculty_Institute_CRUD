using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Service.Models;

namespace Service.Data
{
    public class UniversityContext : DbContext
    {
        private string _connectionString =
            "Server=(localdb)\\mssqllocaldb;Database=UniversityDb;Trusted_Connection=True;";
          //"Server=tcp:;Initial Catalog=Projekt;Persist Security Info=False;User ID=Password=;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<Institute> Institutes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Faculty>().Property(f => f.Name).IsRequired().HasMaxLength(25);
            modelBuilder.Entity<Faculty>().Property(f => f.Description).IsRequired().HasMaxLength(150);
            modelBuilder.Entity<Institute>().Property(i => i.Name).IsRequired();
            modelBuilder.Entity<Institute>().Property(i => i.Description).IsRequired().HasMaxLength(150);
          


        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}

using System.Reflection.Metadata;
using GeoCookerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }


    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<Instruction> Instructions { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Recipe>()
            .HasMany(e => e.Ingredients)
            .WithOne(e => e.Recipe)
            .HasForeignKey(e => e.RecipeId)
            .IsRequired();
        modelBuilder.Entity<Recipe>()
            .HasMany(e => e.Instructions)
            .WithOne(e => e.Recipe)
            .HasForeignKey(e => e.RecipeId)
            .IsRequired();
    }

}
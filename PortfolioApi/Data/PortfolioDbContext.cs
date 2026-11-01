using Microsoft.EntityFrameworkCore;
using PortfolioApi.Models;

namespace PortfolioApi.Data;

public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(
        DbContextOptions<PortfolioDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects => Set<Project>();

    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
}
using Microsoft.EntityFrameworkCore;
using html shenanigans.model;

namespace html shenanigans.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(
            DbContextOptions<PortfolioDbContext> options)
            : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }

        public DbSet<BlogPost> BlogPosts { get; set; }
    }
}
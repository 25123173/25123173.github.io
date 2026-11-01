using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.Services;
using PortfolioApi.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Controllers registreren
builder.Services.AddControllers();

// Swagger registreren
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SQL Server en DbContext registreren
builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// Services registreren via Dependency Injection
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IBlogPostService, BlogPostService>();

var app = builder.Build();

// Swagger inschakelen
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// Controllers beschikbaar maken
app.MapControllers();

app.Run();
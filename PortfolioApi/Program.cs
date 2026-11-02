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

// CORS instellen voor Live Server
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLiveServer", policy =>
    {
        policy.WithOrigins(
            "http://127.0.0.1:5500",
            "http://localhost:5500"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

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

// CORS moet vóór Authorization en de controllers staan
app.UseCors("AllowLiveServer");

app.UseAuthorization();

app.MapControllers();

app.Run();
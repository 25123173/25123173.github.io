using PortfolioApi.DTOs;

namespace PortfolioApi.Services.Interfaces;

public interface IBlogPostService
{
    Task<List<BlogPostDto>> GetAllAsync();

    Task<BlogPostDto?> GetByIdAsync(int id);

    Task<BlogPostDto> CreateAsync(CreateBlogPostDto dto);

    Task<bool> UpdateAsync(int id, UpdateBlogPostDto dto);

    Task<bool> DeleteAsync(int id);
}
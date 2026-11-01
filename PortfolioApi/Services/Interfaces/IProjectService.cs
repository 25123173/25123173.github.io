using PortfolioApi.DTOs;

namespace PortfolioApi.Services.Interfaces;

public interface IProjectService
{
    Task<List<ProjectDto>> GetAllAsync();

    Task<ProjectDto?> GetByIdAsync(int id);

    Task<ProjectDto> CreateAsync(CreateProjectDto dto);

    Task<bool> UpdateAsync(int id, UpdateProjectDto dto);

    Task<bool> DeleteAsync(int id);
}
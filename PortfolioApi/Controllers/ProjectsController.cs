using Microsoft.AspNetCore.Mvc;
using PortfolioApi.DTOs;
using PortfolioApi.Services.Interfaces;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    // GET: api/projects
    [HttpGet]
    public async Task<ActionResult<List<ProjectDto>>> GetAll()
    {
        var projects = await _projectService.GetAllAsync();

        return Ok(projects);
    }

    // GET: api/projects/1
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDto>> GetById(int id)
    {
        var project = await _projectService.GetByIdAsync(id);

        if (project == null)
            return NotFound();

        return Ok(project);
    }

    // POST: api/projects
    [HttpPost]
    public async Task<ActionResult<ProjectDto>> Create(
        CreateProjectDto dto)
    {
        var project = await _projectService.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = project.Id },
            project
        );
    }

    // PUT: api/projects/1
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateProjectDto dto)
    {
        var updated = await _projectService.UpdateAsync(id, dto);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    // DELETE: api/projects/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _projectService.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
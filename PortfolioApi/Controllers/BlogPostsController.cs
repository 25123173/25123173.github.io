using Microsoft.AspNetCore.Mvc;
using PortfolioApi.DTOs;
using PortfolioApi.Services.Interfaces;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogPostsController : ControllerBase
{
    private readonly IBlogPostService _blogPostService;

    public BlogPostsController(IBlogPostService blogPostService)
    {
        _blogPostService = blogPostService;
    }

    // GET: api/blogposts
    [HttpGet]
    public async Task<ActionResult<List<BlogPostDto>>> GetAll()
    {
        var posts = await _blogPostService.GetAllAsync();

        return Ok(posts);
    }

    // GET: api/blogposts/1
    [HttpGet("{id}")]
    public async Task<ActionResult<BlogPostDto>> GetById(int id)
    {
        var post = await _blogPostService.GetByIdAsync(id);

        if (post == null)
            return NotFound();

        return Ok(post);
    }

    // POST: api/blogposts
    [HttpPost]
    public async Task<ActionResult<BlogPostDto>> Create(
        CreateBlogPostDto dto)
    {
        var post = await _blogPostService.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = post.Id },
            post
        );
    }

    // PUT: api/blogposts/1
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateBlogPostDto dto)
    {
        var updated = await _blogPostService.UpdateAsync(id, dto);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    // DELETE: api/blogposts/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _blogPostService.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
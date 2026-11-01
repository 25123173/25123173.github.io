using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;
using PortfolioApi.Services.Interfaces;

namespace PortfolioApi.Services;

public class BlogPostService : IBlogPostService
{
    private readonly PortfolioDbContext _context;

    public BlogPostService(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<List<BlogPostDto>> GetAllAsync()
    {
        var posts = await _context.BlogPosts.ToListAsync();

        return posts.Select(p => new BlogPostDto
        {
            Id = p.Id,
            Titel = p.Titel,
            Inhoud = p.Inhoud,
            Publicatiedatum = p.Publicatiedatum
        }).ToList();
    }

    public async Task<BlogPostDto?> GetByIdAsync(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);

        if (post == null)
            return null;

        return new BlogPostDto
        {
            Id = post.Id,
            Titel = post.Titel,
            Inhoud = post.Inhoud,
            Publicatiedatum = post.Publicatiedatum
        };
    }

    public async Task<BlogPostDto> CreateAsync(CreateBlogPostDto dto)
    {
        var post = new BlogPost
        {
            Titel = dto.Titel,
            Inhoud = dto.Inhoud,
            Publicatiedatum = dto.Publicatiedatum
        };

        _context.BlogPosts.Add(post);

        await _context.SaveChangesAsync();

        return new BlogPostDto
        {
            Id = post.Id,
            Titel = post.Titel,
            Inhoud = post.Inhoud,
            Publicatiedatum = post.Publicatiedatum
        };
    }

    public async Task<bool> UpdateAsync(int id, UpdateBlogPostDto dto)
    {
        var post = await _context.BlogPosts.FindAsync(id);

        if (post == null)
            return false;

        post.Titel = dto.Titel;
        post.Inhoud = dto.Inhoud;
        post.Publicatiedatum = dto.Publicatiedatum;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);

        if (post == null)
            return false;

        _context.BlogPosts.Remove(post);

        await _context.SaveChangesAsync();

        return true;
    }
}
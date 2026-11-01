using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class BlogPost
{
    public int Id { get; set; }

    [Required]
    public string Titel { get; set; } = string.Empty;

    [Required]
    public string Inhoud { get; set; } = string.Empty;

    public DateTime Publicatiedatum { get; set; } = DateTime.UtcNow;
}
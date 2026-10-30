using System;
using System.ComponentModel.DataAnnotations;

namespace html shenanigans.model
{
    public class BlogPost
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime PublishedAt { get; set; }

        public bool IsPublished { get; set; }
    }
}
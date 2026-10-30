using System;
using System.ComponentModel.DataAnnotations;

namespace html shenanigans.model
{
    public class Project
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public string GithubUrl { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
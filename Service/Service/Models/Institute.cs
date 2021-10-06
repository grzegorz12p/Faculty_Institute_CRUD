using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Service.Models
{
    public class Institute
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [MaxLength(150)]
        public string Description { get; set; }
        public string Director { get; set; }
        public int FacultyId { get; set; }
        public virtual Faculty Faculty { get; set; }

    }
}

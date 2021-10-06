using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Service.Dtos
{
    public class InstituteUpdateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [MaxLength(150)]
        public string Description { get; set; }
        public string Director { get; set; }
       // public int FacultyId { get; set; }
    }
}

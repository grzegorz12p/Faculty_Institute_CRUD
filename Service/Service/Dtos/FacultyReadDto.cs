﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Service.Models;

namespace Service.Dtos
{
    public class FacultyReadDto
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [MaxLength(150)]
        public string Description { get; set; }
        public string Address { get; set; }
        public List<InstituteReadDto> Institutes { get; set; }
    }
}

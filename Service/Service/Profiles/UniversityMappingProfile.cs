using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Service.Dtos;
using Service.Models;

namespace Service.Profiles
{
    public class UniversityMappingProfile : Profile
    {
        public UniversityMappingProfile()
        {
            CreateMap<Faculty, FacultyReadDto>();
            CreateMap<FacultyCreateDto, Faculty>();
            CreateMap<FacultyUpdateDto, Faculty>();
            CreateMap<Faculty, FacultyUpdateDto>();
            CreateMap<Institute, InstituteReadDto>();
            CreateMap<InstituteCreateDto, Institute>();
            CreateMap<InstituteUpdateDto,Institute>();
            CreateMap<Institute, InstituteUpdateDto>();
        }
    }
}

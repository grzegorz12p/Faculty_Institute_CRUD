using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Service.Data;
using Service.Dtos;
using Service.Models;

namespace Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacultyController : ControllerBase
    {
        private readonly IFacultyApiRepo _repository;
        private readonly IInstituteApiRepo _instituteRepository;
        private readonly IMapper _mapper;

        public FacultyController(IFacultyApiRepo repository,IMapper mapper,IInstituteApiRepo instituteRepository)
        {
            _mapper = mapper;
            _repository = repository;
            _instituteRepository = instituteRepository;
        }
        [HttpGet]
        public ActionResult <IEnumerable<FacultyReadDto>> GetAllFaculties()
        {
            var faculties = _repository.GetAllFaculties();
            return Ok(_mapper.Map<IEnumerable<FacultyReadDto>>(faculties));
        }
        [HttpGet("{id}")]
        public ActionResult<Faculty> GetFacultyById([FromRoute]int id)
        {
            var faculty = _repository.GetFacultyById(id);
            if (faculty is null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<FacultyReadDto>(faculty));
        }
        [HttpPost]
        public ActionResult<FacultyCreateDto>AddFaculty([FromBody]FacultyCreateDto dto)
        {
            var faculty = _mapper.Map<Faculty>(dto);
            _repository.CreateFaculty(faculty);
            _repository.SaveChanges();
            var facultyReadDto = _mapper.Map<FacultyReadDto>(faculty);

            return Created($"/api/faculty/{facultyReadDto.Id}", null);
        }
        [HttpPut("{id}")]
        public ActionResult UpdateFaculty([FromRoute] int id, [FromBody] FacultyUpdateDto dto)
        {
            var faculty = _repository.GetFacultyById(id);
            if (faculty is null)
            {
                return NotFound();
            }
            _mapper.Map(dto, faculty);
            _repository.UpdateFaculty(faculty);
            _repository.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteFaculty([FromRoute]int id)
        {
            var faculty = _repository.GetFacultyById(id);
            if (faculty is null)
            {
                return NotFound();
            }
            _repository.DeleteFaculty(faculty);
            _instituteRepository.DeleteAllInstitutes(id);
            _repository.SaveChanges();
            return NoContent();
        }
    }
}

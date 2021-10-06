using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Service.Data;
using Service.Dtos;
using Service.Models;

namespace Service.Controllers
{
    [Route("api/Faculty/{facultyId}/[controller]")]
    [ApiController]
    public class InstituteController : ControllerBase
    {
        private readonly IInstituteApiRepo _repository;
        private readonly IMapper _mapper;


        public InstituteController(IInstituteApiRepo repository,IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;

        }
        [HttpGet]
        public ActionResult<IEnumerable<InstituteReadDto>> GetAllInstitutes([FromRoute] int facultyId)
        {
            var institutes = _repository.GetAllInstitutes(facultyId);
            if (institutes is null)
            {
                return NotFound();
            }

            var instituteDtos = _mapper.Map<IEnumerable<InstituteReadDto>>(institutes);
            return Ok(instituteDtos);
        }
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<InstituteReadDto>> GetInstituteById([FromRoute] int facultyId,int id)
        {
            var institutes = _repository.GetInstituteById(facultyId,id);
            if (institutes is null)
            {
                return NotFound();
            }

            var instituteDto = _mapper.Map<InstituteReadDto>(institutes);
            return Ok(instituteDto);
        }
        [HttpPost]
        public ActionResult<InstituteCreateDto> AddInstitute([FromRoute] int facultyId,[FromBody] InstituteCreateDto dto)
        {
            var institute = _mapper.Map<Institute>(dto);
            _repository.CreateInstitute(facultyId,institute);
            _repository.SaveChanges();
            var instituteReadDto = _mapper.Map<InstituteReadDto>(institute);

            return Created($"/api/faculty/{facultyId}/institute/{instituteReadDto.Id}", null);
        }
        [HttpPut("{id}")]
        public ActionResult UpdateInstitute([FromRoute] int facultyId,[FromRoute] int id, [FromBody] InstituteUpdateDto dto)
        {
            var institute = _repository.GetInstituteById(facultyId,id);
            if (institute is null)
            {
                return NotFound();
            }
            _mapper.Map(dto, institute);
            _repository.UpdateInstitute(facultyId, institute);
            _repository.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteInstitute([FromRoute]int facultyId,[FromRoute] int id)
        {
            var institute = _repository.GetInstituteById(facultyId,id);
            if (institute is null)
            {
                return NotFound();
            }
            _repository.DeleteInstitute(facultyId,institute);
            _repository.SaveChanges();
            return NoContent();
        }
    }
}

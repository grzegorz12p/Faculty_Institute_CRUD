using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Service.Models;

namespace Service.Data
{
    public class SqlInstituteApiRepo : IInstituteApiRepo
    {
        private readonly UniversityContext _universityContext;

        public SqlInstituteApiRepo(UniversityContext universityContext)
        {
            _universityContext = universityContext;
        }
        public bool SaveChanges()
        {
            return _universityContext.SaveChanges() >= 0;
        }

        public IEnumerable<Institute> GetAllInstitutes(int facultyId)
        {
            var faculty = _universityContext.Faculties.Include(r => r.Institutes).FirstOrDefault(r => r.Id == facultyId);
            if (faculty is null)
            {

                throw new Exception("Not found");

            }
            
            return faculty.Institutes;
        }

        public Institute GetInstituteById(int facultyId, int id)
        {
            var faculty = _universityContext.Faculties.Include(r => r.Institutes).FirstOrDefault(r => r.Id == facultyId);
            if (faculty is null)
            {
                throw new Exception("Not found");
            }

            return faculty.Institutes.FirstOrDefault(r => r.Id == id);
        }

        public void CreateInstitute(int facultyId, Institute institute)
        {
            var faculty = _universityContext.Faculties.Include(r => r.Institutes).FirstOrDefault(r => r.Id == facultyId);
            if (faculty is null)
            {
                throw new Exception("Not found");
            }
            
            var instituteEntity = institute;
            instituteEntity.FacultyId = facultyId;
            faculty.Institutes.Add(instituteEntity);
        }

        public void UpdateInstitute(int facultyId, Institute institute)
        {
            
        }

        public void DeleteInstitute(int facultyId, Institute institute)
        {
            if (institute is null)
            {
                throw new Exception("Not Found");
            }

            var faculty = _universityContext.Faculties.Include(r => r.Institutes).FirstOrDefault(r => r.Id == facultyId);
            _universityContext.Institutes.Remove(faculty.Institutes.FirstOrDefault(r => r.Id == institute.Id));
        }

        public void DeleteAllInstitutes(int facultyId)
        {
            var faculty = _universityContext.Faculties.Include(r => r.Institutes).FirstOrDefault(r => r.Id == facultyId);
            if (faculty is null)
            {
                throw new Exception("Not Found");
            }
            _universityContext.Institutes.RemoveRange(faculty.Institutes.FindAll(r => r.FacultyId == facultyId));
        }
    }
}

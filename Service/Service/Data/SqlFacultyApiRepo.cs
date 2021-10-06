using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Service.Models;

namespace Service.Data
{
    public class SqlFacultyApiRepo : IFacultyApiRepo
    {
        private readonly UniversityContext _universityContext;

        public SqlFacultyApiRepo(UniversityContext universityContext)
        {
            _universityContext = universityContext;
        }
        public bool SaveChanges()
        {
            return _universityContext.SaveChanges() >= 0;
        }

        public IEnumerable<Faculty> GetAllFaculties()
        {
            return _universityContext.Faculties.Include(r => r.Institutes).ToList();
        }
        

        public Faculty GetFacultyById(int id)
        {
            return _universityContext.Faculties.Include(r => r.Institutes).FirstOrDefault(r => r.Id == id);
        }

        public void CreateFaculty(Faculty faculty)
        {
            if (faculty is null)
            {
                throw new Exception("Not Found");
            }

            _universityContext.Faculties.Add(faculty);
        }

        public void UpdateFaculty(Faculty faculty)
        {
            
        }

        public void DeleteFaculty(Faculty faculty)
        {
            if (faculty is null)
            {
                throw new Exception("Not Found");
            }

            _universityContext.Faculties.Remove(faculty);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Service.Models;

namespace Service.Data
{
    public interface IFacultyApiRepo
    {
        bool SaveChanges();
        IEnumerable<Faculty> GetAllFaculties();
        Faculty GetFacultyById(int id);
        void CreateFaculty(Faculty faculty);
        void UpdateFaculty(Faculty faculty);
        void DeleteFaculty(Faculty faculty);

    }
}

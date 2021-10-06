using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Service.Models;

namespace Service.Data
{
    public interface IInstituteApiRepo
    {
        bool SaveChanges();
        IEnumerable<Institute> GetAllInstitutes(int facultyId);
        Institute GetInstituteById(int facultyId,int id);
        void CreateInstitute(int facultyId,Institute institute);
        void UpdateInstitute(int facultyId,Institute institute);
        void DeleteInstitute(int facultyId,Institute institute);
        void DeleteAllInstitutes(int facultyId);
    }
}

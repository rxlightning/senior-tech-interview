using Patient.Api.Interfaces;
using Patient.Api.Models;

namespace Patient.Api.Services
{
    public class PatientService : IPatientService
    {
        public Task<List<PatientDto>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<PatientDto> GetById(string id)
        {
            throw new NotImplementedException();
        }
    }
}

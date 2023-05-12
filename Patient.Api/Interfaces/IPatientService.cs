using Patient.Api.Models;

namespace Patient.Api.Interfaces
{
    public interface IPatientService
    {
        Task<List<PatientDto>> GetAll();
        Task<PatientDto> GetById(string id);
    }
}

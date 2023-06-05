using MedConnect.Models;

namespace MedConnect.Interfaces
{
    public interface IPatientServiceApiClient
    {
        Task<IEnumerable<Patient>> GetAll();
        Task<Patient> GetByEncodedId(string patientId);
    }
}

using Microsoft.Extensions.Options;
using Patient.Api.Interfaces;
using Patient.Api.Models;

namespace Patient.Api.Services
{
    public class PatientService : IPatientService
    {
        private readonly PatientDataRepoConfig _config;

        public PatientService(IOptions<PatientDataRepoConfig> config) 
        { 
            _config = config.Value;
        }
        public Task<List<PatientDto>> GetAll()
        {
            var getAllFullUrl = _config.BaseUrl;
            throw new NotImplementedException();
        }

        public Task<PatientDto> GetById(string id)
        {
            throw new NotImplementedException();
        }
    }
}

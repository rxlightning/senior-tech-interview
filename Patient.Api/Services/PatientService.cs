using Microsoft.Extensions.Options;
using Patient.Api.Interfaces;
using Patient.Api.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Patient.Api.Helpers;

namespace Patient.Api.Services
{
    public class PatientService : IPatientService
    {
        private readonly PatientDataRepoConfig _config;

        public PatientService(IOptions<PatientDataRepoConfig> config) 
        { 
            _config = config.Value;
        }
        public async Task<List<PatientDto>> GetAll()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_config.BaseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //GET Method
                HttpResponseMessage response = await client.GetAsync("patients");
                if (response.IsSuccessStatusCode)
                {
                    var stringContent = await response.Content.ReadAsStringAsync();
                    var patientList = JsonConvert.DeserializeObject<List<PatientDto>>(stringContent);
                    return patientList ?? new List<PatientDto>();
                }

                return new List<PatientDto>();
            }
        }

        public async Task<PatientDto> GetById(string id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_config.BaseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //GET Method
                HttpResponseMessage response = await client.GetAsync($"patients/{id.Decrypt()}");
                if (response.IsSuccessStatusCode)
                {
                    var stringContent = await response.Content.ReadAsStringAsync();
                    var patient = JsonConvert.DeserializeObject<PatientDto>(stringContent);
                    return patient ?? new PatientDto();
                }

                return new PatientDto();
            }
        }
    }
}

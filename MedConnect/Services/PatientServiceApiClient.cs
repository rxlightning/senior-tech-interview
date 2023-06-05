using MedConnect.Interfaces;
using MedConnect.Models;
using Newtonsoft.Json;
using System;

namespace MedConnect.Services
{
    public class PatientServiceApiClient : IPatientServiceApiClient
    {
        private readonly string _patientServiceUrl;
        private readonly IPatientEncodingService _patientEncodingService;

        public PatientServiceApiClient(IHttpClientFactory httpClientFactory, IConfiguration configuration, IPatientEncodingService patientEncodingService)
        {
            _patientServiceUrl = configuration.GetValue<string>("ExternalAPI:Url");
            _patientEncodingService = patientEncodingService;
        }

        public async Task<IEnumerable<Patient>> GetAll()
        {
            HttpClient client = new HttpClient();

            string response = await client.GetStringAsync(_patientServiceUrl);
            var patients = JsonConvert.DeserializeObject<List<Patient>>(response);


            for (int i = 0; i < patients.Count; i++)
            {
                patients[i].PatientId = _patientEncodingService.EncodePatientId(patients[i].PatientId);
            }

            return patients;
        }

        public async Task<Patient> GetByEncodedId(string encodedId)
        {
            HttpClient client = new HttpClient();

            string response = await client.GetStringAsync(_patientServiceUrl);
            var data = JsonConvert.DeserializeObject<List<Patient>>(response);
            string decodedPatientId = _patientEncodingService.DecodePatientId(encodedId);

            Patient? patient = data?.FirstOrDefault(p => p.PatientId == decodedPatientId);
            patient.PatientId = encodedId;

            return patient;
        }
    }
}

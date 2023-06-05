using MedConnect.Interfaces;
using System.Text;

namespace MedConnect.Services
{
    public class PatientEncodingService : IPatientEncodingService
    {
        public string EncodePatientId(string patientId)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(patientId);
            var encodedPatientId = Convert.ToBase64String(plainTextBytes);

            return encodedPatientId;
        }

        public string DecodePatientId(string encodedPatientId)
        {
            var base64EncodedBytes = Convert.FromBase64String(encodedPatientId);
            var patientId = Encoding.UTF8.GetString(base64EncodedBytes);

            return patientId;
        }
    }
}

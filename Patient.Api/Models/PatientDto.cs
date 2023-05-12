using Patient.Api.Helpers;

namespace Patient.Api.Models
{
    public class PatientDto
    {
        internal string PatientId { get; set; }
        public string EncryptedId => PatientId.Encrypt();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int PostalCode { get; set; }
    }
}

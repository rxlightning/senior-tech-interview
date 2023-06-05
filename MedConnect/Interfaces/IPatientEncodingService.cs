namespace MedConnect.Interfaces
{
    public interface IPatientEncodingService
    {
        string EncodePatientId(string patientId);
        string DecodePatientId(string encodedPatientId);
    }
}

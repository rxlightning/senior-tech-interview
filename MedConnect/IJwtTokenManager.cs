namespace MedConnect
{
    public interface IJwtTokenManager
    {
        string Authenticate(string email, string password);
    }
}

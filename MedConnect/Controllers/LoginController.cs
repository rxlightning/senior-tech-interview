using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MedConnect.Models;

namespace MedConnect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IJwtTokenManager _tokenManager;
        public LoginController(ILogger<LoginController> logger, IJwtTokenManager jwtTokenManager)
        {
            _logger = logger;
            _tokenManager = jwtTokenManager;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate([FromBody] UserCredentials credential)
        {
            var token = _tokenManager.Authenticate(credential.Email, credential.Password);
            if(string.IsNullOrEmpty(token))
                return Unauthorized();
            return Ok(token);
        }
    }
}

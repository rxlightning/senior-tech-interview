using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Patient.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Patient.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        // POST api/<LoginController>
        [HttpPost]
        public IActionResult Post([FromBody] LoginDto loginDto)
        {
            if(loginDto.Username != null &&  loginDto.Password != null)
            {
                return Ok(GenerateJwtToken());
            }

            return Unauthorized();
        }

        private string GenerateJwtToken()
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ThisishardcodedbecauseIwantittobe"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, "subject"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var token = new JwtSecurityToken(
                "me",
                "you",
                claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }

}

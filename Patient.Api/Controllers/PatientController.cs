using Microsoft.AspNetCore.Mvc;
using Patient.Api.Interfaces;
using Patient.Api.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace Patient.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PatientController : ControllerBase
    {
        private IPatientService _patientService;

        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            return Ok(await _patientService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await _patientService.GetById(id.Decrypt()));
        }

    }
}

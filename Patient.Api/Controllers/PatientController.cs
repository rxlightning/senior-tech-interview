using Microsoft.AspNetCore.Mvc;
using Patient.Api.Interfaces;
using Patient.Api.Helpers;

namespace Patient.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private IPatientService _patientService;

        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        // GET: api/<PatientController>
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            return Ok(await _patientService.GetAll());
        }

        // GET api/<PatientController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await _patientService.GetById(id.Decrypt()));
        }

    }
}

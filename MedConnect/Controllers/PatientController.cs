using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MedConnect.Models;
using MedConnect.Interfaces;

namespace MedConnect.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientServiceApiClient _patientServiceApiClient;
    
        public PatientsController(IPatientServiceApiClient patientServiceApiClient)
        {
            _patientServiceApiClient = patientServiceApiClient;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var patients = await _patientServiceApiClient.GetAll();

                return Ok(patients);
            }
            catch (Exception)
            {
                // Handle any exceptions that occur during the API call
                return StatusCode(500, "An error occurred while retrieving patients.");
            }
           
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                var patient = await _patientServiceApiClient.GetByEncodedId(id);

                return Ok(patient);
            }
            catch (Exception)
            {
                // Handle any exceptions that occur during the API call
                return StatusCode(500, "An error occurred while retrieving the patient.");
            }
        }
    }
}

using Microsoft.AspNetCore.Http;
using ReactApp1.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Context;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContacController : ControllerBase
    {
        private MyDbContext _dbContext;

        public ContacController(MyDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet]
        [Route("List")]
        public async Task<IActionResult> List()
        {
            List<Contac> list = await _dbContext.Contacs.OrderByDescending(c => c.Id)
                .ToListAsync();

            return StatusCode(StatusCodes.Status200OK, list);
        }

        [HttpPost]
        [Route("Save")]
        public async Task<IActionResult> Save([FromBody] Contac request)
        {
            await _dbContext.Contacs.AddAsync(request);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "Ok");
        }

        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> Edit([FromBody] Contac request)
        {
            _dbContext.Contacs.Update(request);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "Ok");
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            Contac? contacToDelete = await _dbContext.Contacs.FindAsync(id);

            _dbContext.Contacs.Remove(contacToDelete);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }
    }
}
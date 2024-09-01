using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public class UserDto
{
    public int? Id                      { get; set; }
    [Required] public string? Email     { get; set; }
    [Required] public string? Username  { get; set; } 
    [Required] public string? Password  { get; set; }
    [Required] public int? AccountLvl   { get; set; }
    [Required] public int? ExpToNextLvl { get; set; }
    [Required] public int? Elo          { get; set; }
}

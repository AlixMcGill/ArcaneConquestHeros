using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public class Items
{
    public int Id                          { get; set; }
    [Required] public string? Name         { get; set; }
    [Required] public string? Description  { get; set; }
    [Required] public int? RequiredLvl     { get; set; }
    [Required] public int? StrengthMod     { get; set; }
    [Required] public int? IntellegenceMod { get; set; }
    [Required] public int? DexterityMod    { get; set; }
    [Required] public int? WisdomMod       { get; set; }
}
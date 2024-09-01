using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public class HeroInventory
{
    public int? Id                          { get; set; }
    [Required] public int? UserId           { get; set; }
    [Required] public int? Lvl              { get; set; }
    [Required] public int? CurrentExp       { get; set; }
    [Required] public int? NextLvlExp       { get; set; }
    [Required] public string? Name          { get; set; }
    [Required] public string? Class         { get; set; }
    [Required] public int? StrengthStat     { get; set; }
    [Required] public int? IntellegenceStat { get; set; }
    [Required] public int? DexterityStat    { get; set; }
    [Required] public int? WisdomStat       { get; set; }
    [Required] public int? StatPoints       { get; set; }
    [Required] public int? ItemHeldId       { get; set; }
    [Required] public int? Actions          { get; set; }
}

using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public class DeckInventoryDto
{
    public int? id                        { get; set; }
    [Required] public int? UserId         { get; set; }
    [Required] public string? Name        { get; set; }
    [Required] public string? Description { get; set; }
    [Required] public int? HeroIdOne      { get; set; }
    [Required] public int? HeroIdTwo      { get; set; }
    [Required] public int? HeroIdThree    { get; set; }
    [Required] public int? HeroIdFour     { get; set; }
    [Required] public int? HeroIdFive     { get; set; }
    [Required] public int? HeroIdSix      { get; set; }
    [Required] public int? HeroIdSeven    { get; set; }
    [Required] public int? HeroIdEight    { get; set; }
    [Required] public int? HeroIdNine     { get; set; }
    [Required] public int? HeroIdTen      { get; set; }
}

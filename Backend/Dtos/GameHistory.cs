using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public class GameHistory
{
    public int? Id                          { get; set; }
    [Required] public string? GameStartTime { get; set; } 
    [Required] public string? GameEndTime   { get; set; }
    [Required] public int? PlayerAId        { get; set; }
    [Required] public int? PlayerBId        { get; set; }
    [Required] public int? PlayerAElo       { get; set; }
    [Required] public int? PlayerBElo       { get; set; }
    [Required] public bool? GameWinner      { get; set; }
}

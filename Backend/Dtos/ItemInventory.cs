using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public class ItemInventory
{
    public int? Id                {get; set;}
    [Required] public int? UserId {get; set;}
    [Required] public int? ItemId {get; set;}
}

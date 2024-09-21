using System.Text;
using Backend.Dtos;
using Dapper;
using Npgsql;
using Backend.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;

namespace Backend.endpoints
{
    public static class UserData
    {
        public static RouteGroupBuilder UserDataRoute(this WebApplication app)
        {
            var group = app.MapGroup("UserData");

            group.MapGet("/ItemCardInventory/{userId}", 
                    //[Authorize] 
                    async (int userId, [FromServices] NpgsqlConnection connection) => 
            {
                var userItems = await connection.QueryAsync<ItemsDto>(@"
                        SELECT items.*
                        FROM items
                        JOIN iteminventory ON items.id = iteminventory.itemid
                        WHERE iteminventory.userid = UserId;", new {UserId = userId});

                return Results.Ok(userItems);
            });
            
            group.MapGet("/HeroCardsInventory/{userId}", 
                    //[Authorize] 
                    async ([FromServices] NpgsqlConnection connection) => 
            {
                
            });
            
            group.MapGet("/UserInformation/{userId}", 
                    //[Authorize] 
                    async ([FromServices] NpgsqlConnection connection) => 
            {
                
            });
            
            group.MapGet("/UserDecks/Inventory{userId}", 
                    //[Authorize] 
                    async ([FromServices] NpgsqlConnection connection) => 
            {
                
            });

            return group;
        }
    }
}

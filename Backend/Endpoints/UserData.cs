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
                        SELECT items.id, name, description, encode(imgdata, 'base64') AS imgdata, requiredlvl, strengthmod, intellegencemod, dexteritymod, wisdommod
                        FROM items
                        JOIN iteminventory ON items.id = iteminventory.itemid
                        WHERE iteminventory.userid = UserId;", new {UserId = userId});

                return Results.Ok(userItems);
            });

            group.MapPost("/ItemCardInventory", 
                    async (ItemsDto newItem, [FromServices] NpgsqlConnection connection) =>
            {
                var item = await connection.ExecuteAsync(@"
                        INSERT INTO items (name, description, imgdata, requiredlvl, strengthmod, intellegencemod, dexteritymod, wisdommod)
                        VALUES (
                            @Name,
                            @Description,
                            decode(@ImgData, 'base64'),
                            @RequiredLvl,
                            @StrengthMod,
                            @IntellegenceMod,
                            @DexterityMod,
                            @WisdomMod)", newItem);

                return Results.Ok(item);
            });

            
            group.MapGet("/AllUserAccountData/{userId}", 
                    //[Authorize] 
                    async (int userId, [FromServices] NpgsqlConnection connection) => 
            {

                var sql = @"
                    SELECT * FROM deckinventory WHERE deckinventory.userid = @UserId;
                    SELECT * FROM heroinventory WHERE heroinventory.userid = @UserId;
                    SELECT items.id, name, description, encode(imgdata, 'base64') AS imgdata, requiredlvl, strengthmod, intellegencemod, dexteritymod, wisdommod
                        FROM items
                        JOIN iteminventory ON items.id = iteminventory.itemid
                        WHERE iteminventory.userid = @UserId;
                ";

                using (var multi = await connection.QueryMultipleAsync(sql, new {UserId = userId}))
                {   
                    var deckInv = await multi.ReadAsync<DeckInventoryDto>();
                    var heroInv = await multi.ReadAsync<HeroInventoryDto>();
                    var itemInv = await multi.ReadAsync<ItemsDto>();

                    return Results.Ok(new {deckInv, heroInv, itemInv});
                }
            });
            
            return group;
        }
    }
}

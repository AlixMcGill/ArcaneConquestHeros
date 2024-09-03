using Backend.Dtos;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using BCrypt.Net;

namespace Backend.endpoints;

public static class Login
{
    public static RouteGroupBuilder loginRoute(this WebApplication app)
    {
        var group = app.MapGroup("Login");

        group.MapGet("/", async ([FromServices] NpgsqlConnection connection) =>
            {
                var users = await connection.QueryAsync<UserDto>("SELECT * FROM users");

                return Results.Ok(users);
            });

        group.MapPost("/", async (UserDto newUser, [FromServices] NpgsqlConnection connection) => 
            {
                var checkExsitingEmail = connection.QuerySingleOrDefault<UserDto>(
                        "SELECT email FROM users WHERE email=@email LIMIT 1;",
                        new {email = newUser.Email});

                if (checkExsitingEmail != null) 
                {
                    return Results.NoContent();
                }

                var checkExsitingUsername = connection.QuerySingleOrDefault<UserDto>(
                        "SELECT username FROM users WHERE username=@username LIMIT 1;",
                        new {username = newUser.Username});

                if (checkExsitingUsername != null)
                {
                    return Results.NoContent();
                }

                var passwordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(newUser.Password);
                
                await connection.ExecuteAsync(
                        @"INSERT INTO users 
                            (email, username, password, accountLvl, currentExp, ExpToNextLvl, Elo)
                        VALUES (@email, @username, @password, @accountLvl, @currentExp, @expToNextLvl, @elo)",
                        new 
                        {
                            email = newUser.Email,
                            username = newUser.Username,
                            password = passwordHash,
                            accountLvl = 0,
                            currentExp = 0,
                            expToNextLvl = 500,
                            elo = 500
                        });

                return Results.Ok();

            });
        return group;
    }
}

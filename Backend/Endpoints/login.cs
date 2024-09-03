using Backend.Dtos;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using BCrypt.Net;
using Backend.Tools;

namespace Backend.endpoints;

public static class Login
{
    public static RouteGroupBuilder loginRoute(this WebApplication app)
    {
        var group = app.MapGroup("Login");

        group.MapPost("/UserLogin", async (UserDto currentUser, [FromServices] NpgsqlConnection connection) =>
            {
                var sanitizer = new Sanitizer();

                if(!sanitizer.CheckForInvalidCharacters(currentUser.Email) ||
                    !sanitizer.CheckForInvalidCharacters(currentUser.Password) ||
                    !sanitizer.IsPasswordValid(currentUser.Password)) return Results.BadRequest();

                var users = await connection.QuerySingleOrDefaultAsync<UserDto>(
                        "SELECT * FROM users WHERE email=@email",
                        new {email = currentUser.Email});

                if (users == null) return Results.BadRequest();

                var validatePassword = BCrypt.Net.BCrypt.EnhancedVerify(currentUser.Password, users.Password);

                if (validatePassword)
                {
                    users.Password = "";
                    return Results.Ok(users);
                }

                return Results.BadRequest();
            });

        group.MapPost("/", async (UserDto newUser, [FromServices] NpgsqlConnection connection) => 
            {
                var sanitizer = new Sanitizer();

                if (!sanitizer.IsPasswordValid(newUser.Password.ToString()) || 
                    !sanitizer.CheckForInvalidCharacters(newUser.Password.ToString()) ||
                    !sanitizer.CheckForInvalidCharacters(newUser.Email.ToString()) || 
                    !sanitizer.CheckForInvalidCharacters(newUser.Username.ToString())
                    ) return Results.BadRequest();
                
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

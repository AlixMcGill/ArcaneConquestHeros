using System.Text;
using Backend.Dtos;
using Dapper;
using Npgsql;
using Backend.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;

namespace Backend.endpoints;

public static class Login
{
    public static RouteGroupBuilder loginRoute(this WebApplication app)
    {
        var group = app.MapGroup("Login");

        group.MapPost("/UserLogin",
                [AllowAnonymous] 
                async (UserDto currentUser, HttpContext ctx, [FromServices] NpgsqlConnection connection) =>
            {
                int userLoginTimeInDays = 1;
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

                    var issuer = app.Configuration["Jwt:Issuer"];
                    var audience = app.Configuration["Jwt:Audience"];
                    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(app.Configuration["Jwt:key"]));
                    var cred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                            issuer: issuer,
                            audience: audience,
                            signingCredentials: cred
                            );

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var stringToken = tokenHandler.WriteToken(token);

                    var jwtCookieOptions = new CookieOptions
                    {
                        HttpOnly = false,
                        Secure = false,
                        SameSite = SameSiteMode.Strict,
                        Expires = DateTimeOffset.UtcNow.AddDays(userLoginTimeInDays)
                    };

                    ctx.Response.Cookies.Append("AuthToken", stringToken, jwtCookieOptions);

                    var userCookieOptions = new CookieOptions
                    {
                        HttpOnly = false,
                        Secure = false,
                        SameSite = SameSiteMode.Strict,
                        Expires = DateTimeOffset.UtcNow.AddDays(userLoginTimeInDays)
                    };

                    ctx.Response.Cookies.Append("UserId", users.Id.ToString(), userCookieOptions);
                    ctx.Response.Cookies.Append("Username", users.Username, userCookieOptions);
                    ctx.Response.Cookies.Append("AcccountLvl", users.AccountLvl.ToString(), userCookieOptions);
                    ctx.Response.Cookies.Append("ExpToNextLvl", users.ExpToNextLvl.ToString(), userCookieOptions);
                    ctx.Response.Cookies.Append("Elo", users.Elo.ToString(), userCookieOptions);
                    ctx.Response.Cookies.Append("CurrentExp", users.CurrentExp.ToString(), userCookieOptions);

                    return Results.Ok();
                }

                return Results.BadRequest();
            });

        group.MapPost("/", [AllowAnonymous] async (UserDto newUser, [FromServices] NpgsqlConnection connection) => 
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

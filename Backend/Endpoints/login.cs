using Backend.Dtos;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

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

        return group;
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Service.Middlewares
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (Exception e)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync("Not Found");
            }
        }


    }
}

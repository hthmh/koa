const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {
    let url = ctx.url;
    let request = ctx.request;
    let request_query = request.query;
    let request_query_string = request.querystring;

    let ctx_query = ctx.query;
    let ctx_query_string = ctx.querystring;

    ctx.body = {
        url,
        request: {
            request_query,
            request_query_string
        },
        ctx: {
            ctx_query,
            ctx_query_string
        }
    }

})

app.listen(3000)

console.log('port http://127.0.0.1:3000')
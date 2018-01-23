const Koa = require('koa');
const app = new Koa();
app.use(async(ctx) => {
    ctx.body = {
        url: ctx.url,
        query: ctx.query
    }
})

let serverPort = process.env.PORT || 3000;
app.listen(serverPort, () => {
    console.log(`port http://127.0.0.1:${serverPort}`);
})
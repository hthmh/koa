const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());

const cors = require('koa-cors');
app.use(cors());

app.use(async(ctx) => {
    if (ctx.method === 'GET') {
        ctx.body = ctx.query;
    } else if (ctx.method === 'POST') {
        ctx.body = ctx.request.body;
    }
})

app.listen(3000, () => {
    console.log('port http://127.0.0.1:3000');
})
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

app.use(bodyParser());

const cors = require('koa-cors');
app.use(cors());

const Page1 = new Router();
Page1.get('/p1', (ctx, next) => {
    ctx.body = "p1"
}).get('/p2', (ctx, next) => {
    ctx.body = "p2"
})

const Page2 = new Router();
Page2.get('/a1', (ctx, next) => {
    ctx.body = "a1"
}).get('/a2', (ctx, next) => {
    ctx.body = "a2"
})

const router = new Router();
router.use('/page1', Page1.routes(), Page1.allowedMethods());
router.use('/page2', Page2.routes(), Page2.allowedMethods());

app
    .use(router.routes())
    .use(router.allowedMethods());

let serverPort = process.env.PORT || 3000;
app.listen(serverPort, () => {
    console.log(`port http://127.0.0.1:${serverPort}`);
})
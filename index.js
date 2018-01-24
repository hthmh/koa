const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const myRouter = require('./router/index');

app.use(bodyParser());

//设置跨域
/* const cors = require('koa-cors');
app.use(cors()); */

app.use(async function (ctx, next) {
  ctx
    .res
    .setHeader("Access-Control-Allow-Origin", "*")
  // ctx.res.setHeader("Access-Control-Allow-Origin", "http://localhost:33")
  await next()
})

app
  .use(myRouter.routes())
  .use(myRouter.allowedMethods());

let serverPort = process.env.PORT || 3000;
app.listen(serverPort, () => {
  console.log(`port http://127.0.0.1:${serverPort}`);
})

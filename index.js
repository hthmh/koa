const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const utils = require('./utils/index')
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

const getQuery = new Router(); //直接返回get参数
getQuery.get('/query', (ctx, next) => {
  ctx.body = ctx.query;
});

const getFile = new Router();
getFile.get('/json', async function (ctx, next) {
  let name = ctx.query.name;
  res = ctx.body = await utils.readFile(name);
})
  .get('/write', async function (ctx, next) {
    let params = ctx.query;
    if (params.name && params.password) {
      ctx.body = await utils.writeFile('user', {
        name: params.name,
        password: params.password
      });
    } else {
      ctx.body = {
        status: 0,
        msg: "缺少参数"
      }
    }

  })

const NotFound = new Router();
NotFound.get('/', (ctx, next) => {
  ctx.body = {
    status: 0,
    msg: null
  };
})
const router = new Router();
router.use(getQuery.routes(), getQuery.allowedMethods());
router.use(getFile.routes(), getFile.allowedMethods());
router.use(NotFound.routes(), NotFound.allowedMethods());

app
  .use(router.routes())
  .use(router.allowedMethods());

let serverPort = process.env.PORT || 3000;
app.listen(serverPort, () => {
  console.log(`port http://127.0.0.1:${serverPort}`);
})

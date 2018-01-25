const Router = require('koa-router');
const utils = require('../utils/index');

const File = new Router();
File.get('/json', async function (ctx, next) {
  let name = ctx.query.name;
  res = ctx.body = await utils.readFile(name);
})
  .post('/write', async function (ctx, next) {
    let params = ctx.request.body;
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

const Test = new Router();
Test.get('/get', (ctx, next) => {
  ctx.body = ctx.query;
}).post('/post', (ctx, next) => {
  ctx.body = ctx.request.body;
}).get('/', (ctx, next) => {
  if (ctx.url == '/') {
    ctx.body = 'koa server';
  } else {
    ctx.body = '404'
  }
})

const router = new Router();
router.use('/file',File.routes(), File.allowedMethods());
router.use(Test.routes(), Test.allowedMethods());

module.exports = router;

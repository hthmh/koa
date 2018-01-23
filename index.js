const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
var fs = require('co-fs');

app.use(bodyParser());

const cors = require('koa-cors');
app.use(cors());

const getQuery = new Router(); //直接返回get参数
getQuery.get('/getquery', (ctx, next) => {
    ctx.body = ctx.query;
});

const readFile = new Router();
readFile.get('/area', function * (ctx, next) {
    let data = yield fs.readFile('./json/area.json', 'utf8');
    this.body = data;
})

const NotFound = new Router();
NotFound.get('/', (ctx, next) => {
    ctx.body = '地址错误';
})
const router = new Router();
router.use(getQuery.routes(), getQuery.allowedMethods());
router.use('/file', readFile.routes(), readFile.allowedMethods());
router.use(NotFound.routes(), NotFound.allowedMethods());

function readFile(name) {
    fs
        .readFile(`./json/${name}.json`, 'utf8', function (err, data) {
            if (err) {
                console.log(err)
                rData = 123;
            } else {
                rData = JSON.parse(data);
                console.log(111)
            }

        });
    console.log(rData);
}

app
    .use(router.routes())
    .use(router.allowedMethods());

let serverPort = process.env.PORT || 3000;
app.listen(serverPort, () => {
    console.log(`port http://127.0.0.1:${serverPort}`);
})
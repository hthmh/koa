const Koa = require('koa');
const app = new Koa();
var fs = require('fs');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const PATH = '../data/';
app.use(bodyParser());
const cors = require('koa-cors');
app.use(cors());


const Read = new Router();
async function aa(type) {
    let aaa = await read(type);
}
Read.get('/read', (ctx, next) => {
    let ctx_query = ctx.query;
    let type = ctx_query.type;
    let res = {};
    fs.readFile(PATH + type + '.json', function (err, data) {
        if (err) {
            ctx.body = {
                status: 0,
                msg: "读取异常"
            }
        } else {
            try {
                data = JSON.parse(data.toString());
            } catch (e) {
                data = null
            }
            ctx.body = {
                status: 1,
                result: data
            }
        }
    })

})

async function read(path) {
    fs.readFile(PATH + type + '.json', function (err, data) {
        if (err) {
            return {
                status: 0,
                msg: "读取异常"
            }
        } else {
            try {
                data = JSON.parse(data.toString());
            } catch (e) {
                data = null
            }
            return {
                status: 1,
                result: data
            }
        }
    })
}

const Page2 = new Router();
Page2.get('/a1', (ctx, next) => {
    ctx.body = "a1"
}).get('/a2', (ctx, next) => {
    ctx.body = "a2"
})

const router = new Router();
router.use(Read.routes(), Read.allowedMethods());
router.use('/page2', Page2.routes(), Page2.allowedMethods());


app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('port http://127.0.0.1:3000');
})
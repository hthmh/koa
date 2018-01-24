var koa = require('koa')
var app = new koa()
var fs = require('co-fs')
app.use(function * () {
  let data = yield fs.readFile('./json/area.json', 'utf8')
  this.body = data;
})
app.listen(3000)

console.log(123)

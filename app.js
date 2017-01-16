var koa = require('koa')
var controller = require('koa-route')
var views = require('co-views')

var app = koa()
var render = views('./view', {
    // 使用EJS模板引擎
    map: { html: 'ejs' }
})
// 静态文件中间件
var koa_static = require('koa-static-server')

// 访问静态资源文件
app.use(koa_static({
    // 文件系统中当前文件夹下我们需要带.号，URL里面无.
    rootDir: './static',
    rootPath: '/static',
    // 缓存时间
    maxage: 0
}))

// 实现路由
app.use(controller.get('/route_test', function* () {
    this.set('cache-control', 'no-cache')
    this.body = 'Hello koa!'
}))

// 模板渲染
app.use(controller.get('/ejs_test', function* () {
    this.set('cache-control', 'no-cache')
    this.body = yield render('test', { title: 'title_test' })
}))

app.listen(3000)
console.log('http://localhost:3000')
console.log('http://127.0.0.1:3000')
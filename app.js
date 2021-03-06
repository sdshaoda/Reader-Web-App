var koa = require('koa')
var controller = require('koa-route')
var views = require('co-views')
// 静态文件中间件
var koa_static = require('koa-static-server')

var service = require('./service/webAppService.js')

var app = koa()
var render = views('./view', {
    // 使用EJS模板引擎
    map: { html: 'ejs' }
})


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
    // 不缓存
    this.set('cache-control', 'no-cache')
    this.body = 'Hello koa!'
}))

// 模板渲染
app.use(controller.get('/ejs_test', function* () {
    this.set('cache-control', 'no-cache')
    this.body = yield render('test', { title: 'title_test' })
}))

// 获取mock数据
app.use(controller.get('/api_test', function* () {
    this.set('cache-control', 'no-cache')
    this.body = service.get_test_data()
}))

// 首页
app.use(controller.get('/', function* () {
    this.set('cache-control', 'no-cache')
    this.body = yield render('index', { title: '书城首页' })
}))

// 书籍
app.use(controller.get('/book', function* () {
    this.set('cache-control', 'no-cache')
    var querystring = require('querystring')
    var params = querystring.parse(this.req._parsedUrl.query)
    var bookId = params.id
    this.body = yield render('book', { bookId })
}))

// 搜索
app.use(controller.get('/search', function* () {
    this.set('cache-control', 'no-cache')
    this.body = yield render('search', { title: '书城首页' })
}))

// Ajax书籍
app.use(controller.get('/ajax/book', function* () {
    this.set('cache-control', 'no-cache')
    var querystring = require('querystring')
    var params = querystring.parse(this.req._parsedUrl.query)
    var id = params.id
    if (!id) {
        id = '18218'
    }
    this.body = service.get_book_data(id)
}))

// Ajax首页
app.use(controller.get('/ajax/index', function* () {
    this.set('cache-control', 'no-cache')
    this.body = service.get_index_data()
}))

// Ajax排行
app.use(controller.get('/ajax/rank', function* () {
    this.set('cache-control', 'no-cache')
    this.body = service.get_rank_data()
}))

// Ajax书架
app.use(controller.get('/ajax/bookbacket', function* () {
    this.set('cache-control', 'no-cache')
    this.body = service.get_bookbacket_data()
}))

// Ajax分类
app.use(controller.get('/ajax/category', function* () {
    this.set('cache-control', 'no-cache')
    this.body = service.get_category_data()
}))

// 获取线上HTTP接口数据
app.use(controller.get('/ajax/search', function* () {
    this.set('cache-control', 'no-cache')
    var querystring = require('querystring')
    // 解析查询字符串
    var params = querystring.parse(this.req._parsedUrl.query)
    var start = params.start
    var end = params.end
    var keyword = params.keyword
    this.body = yield service.get_search_data(start, end, keyword)
}))

app.listen(3000)
console.log('http://localhost:3000')
console.log('http://127.0.0.1:3000')
// 连通前后端数据
var fs = require('fs')

// mock数据接口
exports.get_test_data = function () {
    // 读取mock文件中的信息
    var content = fs.readFileSync('./mock/test.json', 'utf-8')
    return content
}

// mock书籍
exports.get_book_data = function (id) {
    if (!id) {
        id = '18218'
    }
    var content = fs.readFileSync('./mock/book/' + id + '.json', 'utf-8')
    return content
}

// mock首页
exports.get_index_data = function () {
    var content = fs.readFileSync('./mock/home.json', 'utf-8')
    return content
}

// mock排行
exports.get_rank_data = function () {
    var content = fs.readFileSync('./mock/rank.json', 'utf-8')
    return content
}

// mock书架
exports.get_bookbacket_data = function () {
    var content = fs.readFileSync('./mock/bookbacket.json', 'utf-8')
    return content
}

// mock分类
exports.get_category_data = function () {
    var content = fs.readFileSync('./mock/category.json', 'utf-8')
    return content
}


// 线上HTTP接口
exports.get_search_data = function (start, end, keyword) {
    return function (cb) {
        var http = require('http')
        var qs = require('querystring')
        var data = {
            k: keyword,
            start: start,
            end: end
        }
        // 将对象序列化为字符串
        var content = qs.stringify(data)
        var http_request = {
            hostname: 'dushu.xiaomi.com',
            port: 80,
            path: '/store/v0/lib/query/onebox?' + content
        }
        // 发送HTTP请求，将HTTP返回的数据进行处理
        req_obj = http.request(http_request, function (_res) {
            var content = ''
            _res.setEncoding('utf8')
            _res.on('data', function (chunk) {
                content += chunk
            })
            _res.on('end', function () {
                cb(null, content)
            })
        })

        req_obj.on('error', function () {

        })

        req_obj.end()
    }
}
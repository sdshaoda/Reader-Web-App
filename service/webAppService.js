// 连通前后端数据
var fs = require('fs')

exports.get_test_data = function () {
    var content = fs.readFileSync('./mock/test.json', 'utf-8')
    return content
}
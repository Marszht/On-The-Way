const http = require('http')

const url = require('url')

const PORT = 3000

// 创建一个http 服务
const server = http.createServer((request, responce) => {
  console.log('request', request.url)
  const queryObj = url.parse(request.url, true).query
  responce.end(`${queryObj.callback}({name: 'mars', girlfriend: 'cmz'})`)
})

// 启动服务， 监听端口
server.listen(PORT, () => {
  console.log('server start at port', PORT)
})

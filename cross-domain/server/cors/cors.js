

const http = require('http')

const PORT = 1314

const allowOrigin = ['https://marsmz.top', 'http://localhost:8080', 'http://127.0.0.1:8080']
const server = http.createServer((request, response) => {
  const { method, headers: {origin, cookie}} = request
  // console.log('request.cookie', request.headers.cookie)
  // console.log('method', request.method)
  // 判断如果在允许跨域的域名里就添加
  if (allowOrigin.includes(origin)) {
  response.setHeader('Access-Control-Allow-Origin', origin)    
  }
  response.setHeader('Access-Control-Allow-Methods', 'PUT')
  // 把时间设置长一些，当再次请求的时候就不需要预1请求处理了
  response.setHeader('Access-Control-Max-Age', 5000)
  // cookie的
  response.setHeader('Access-Control-Allow-Credentials', true)
  // token的
  response.setHeader('Access-Control-Allow-Headers', 'token')
  response.setHeader('Access-Control-Expose-Headers', 'token')
  response.setHeader('token', 'mars');
  if (method === 'OPTIONS') {
    // 当方法为OPTIONS的时候不返回数据
    // status 设置成204， 不用也行
    response.writeHead(204);
    response.end('');
    console.log('预请求处理')
  } else if (!cookie) {
    // 应该是没有设置成功？
    console.log('cookie', cookie)            // 也执行le
    response.setHeader('Set-Cookie', ['type=mars', 'language=javascript']);
  }
  response.end("{name: 'mars', girfriend: 'cmz'}")
})

server.listen(PORT, () => {
  console.log('server successful at port:', PORT)
})
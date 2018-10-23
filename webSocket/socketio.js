const Koa = require ('koa');

const app = new Koa();
//  通过 node 的http 模块来创建一个 server服务
const server = require('http').createServer(app);

// WebSocket是依赖HTTP协议进行握手的
const io = require('socket.io')(server);

// 监听客户端与服务端的连接
io.on('connection', function( socket) {
  // send 方法来给客户端发信息
  socket.send('东西');
  // 监听客户端的消息是否接收成功
  socket.on('message', function(msg) {
    console.log(msg);
    socket.send('不负如来不负卿')
  })
})

server.listen(1314, () => {
  console.log('server start at port 1314');
})
// // const Koa = require ()
// //  先 express 再试一下koa

// const Express = require('express');

// const app = Express();

// // 设置静态文件夹
// app.use(Express.static(__dirname));
// //  步骤 1. 创建 webSocket 服务 
// //       2. 再 设置端口号 保证其连接
// //       3 . 监听连接情况
// //       4. 监听信息
// //       5. 发送信息 
// // 创建 webSocket 服务
// const Server = require('ws').Server;
// // 再设置服务器的端口号
// const ws = new Server({
//   port: 520
// });

// // 监听服务端和客户端连接的情况
// ws.on('connection', function (socket) {
//   //监听客户端发来的消息
//   socket.on('message', (msg) => {
//     console.log('msg', msg) // 客户端发来的消息
//     // 服务端也可以发消息给客户端 
//     socket.send(`这里是服务端对你说的话： ${msg}`);
//   })

// })

// // 监听 1314端口

// app.listen(1314, () => {
//   console.log('server start at port 1314');
// })



//  用koa
const Koa = require('koa');

const app = new Koa();
const Server = require('ws').Server;
const ws = new Server({
  port: 520
})

ws.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log('msg',msg);
    socket.send(`我想对你说：${msg}`)
  })
})

app.use(async (ctx) => {
 let require = ctx.request;
 let url = ctx.url;
 ctx.body = {
   require,
   url
 }
})

app.listen( 1314, () =>{
  console.log('server start at port 1314');
})


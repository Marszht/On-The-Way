## Tv prooject
> [项目源地址](https://github.com/lishuaixingNewBee/gordanTv)

由于音乐模块接口不能用了， 所以只写了视频模块与电影模块  
代码里面包含了许多自己的一些注释以及理解，然后还有自己的一些修改。😁

目录结构 👌   
|--- utils & Public Function           通用函数  
|--- components & components Public View         components和template模板  
|--- images & Img Resources               图片资源  
|--- pages                     页面  
 
 ## 1. util.js 中封装一些通用方法
### promise 封装 wx.request 方法
```
const $get = ( url, data ) => {
  return new Promise( (resolve, reject) => {
    wx.request({
      url,
      data,
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
  })
}
```
### 时间处理
```
const formatTime = (date, fmt) => { 
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (var k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

const padLeftZero = (str) => {
  return ('00' + str).substr(str.length);
}
```
### 处理星星评分
```
const convertToStarsArray = (average) => {
  const LENGTH = 5;
  const CLS_ON = 'on'; // 全星
  const CLS_HALF = 'half'; // 半星
  const CLS_OFF = 'off'; // 无星
  let result = [];
  let score = Math.round(average)/2;
  let hasDecimal = score %1 !== 0;
  let integer = Math.floor(score) ;
  for ( let i= 0; i<integer; i++) {
    result.push(CLS_ON);
  } 
  if ( hasDecimal) {
    result.push( CLS_HALF);
  } 
  while (result.length < LENGTH) {
    result.push (CLS_OFF );
  }
  return result;
}
```
## 2. 自己在写的过程中遇到的问题
### 在超出给定区域滑动时会出现粗粗的滚动条很不美观如图
![当没有消除的时候](./images/examples/hasBar.png)
在全局 app.wxss中加入
```
::-webkit-scrollbar{  
  height: 0;
  width: 0;
  color: transparent;
}
```
之后
![没有底部的滚动条啦](./images/examples/hideBar.png)

### 登陆接口不再调起窗口
> 之后再改吧 有点问题


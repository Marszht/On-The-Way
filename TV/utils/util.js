const wxPrase = require("./wxPrase/wxPrase.js").wxPrase  // 解决HTML 以及 markdown 的解析

// 获取数据方法
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

module.exports = {
  wxPrase,
  $get
}

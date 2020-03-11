import drawQrcode from '../../thirdparty/components/weapp.qrcode.esm.js'
var app = getApp();
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.drawQ();
  },
  drawQ: function (url = null) {
    if(!url){
      // url = app.globalParams.host + '/mobile/index/records?openid=' + wx.getStorageSync('openid');
      url = app.globalParams.host +'/records?openid='+wx.getStorageSync('openid')+'&limit=2';
    }
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      // ctx: wx.createCanvasContext('myQrcode'),
      text: url,
      // v1.0.0+版本支持在二维码上绘制图片
      image: {
        imageResource: '../../images/icon.png',
        dx: 70,
        dy: 70,
        dWidth: 60,
        dHeight: 60
      }
    })
  }
})
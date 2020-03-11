// pages/index/info.js
var app = getApp();
Page({
  data:{
    openid:wx.getStorageSync('openid')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bindInfo(options.current_day);
  },
  saveHandle: function (e) {
    var handleUrl = app.globalParams.host+'/mobile/index/saveInfo';
    console.log(e.detail.value);
    wx.request({
      url: handleUrl,
      method: 'post',
      data: e.detail.value,
      success: function (res) {
        if (res.statusCode === 200) {
          if(res.data.code){

          }else{
            wx.showToast({
              title: '保存成功',
              duration: 2000
            });
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        }
      }
    })
  }, 
  bindDateChange: function (e) {
    this.setData({
      create_day: e.detail.value
    })
  },
  bindInfo: function (current_day=null){
    var that = this;
    wx.request({
      url: app.globalParams.host + '/mobile/index/getCurrentDayInfo',
      method: "POST",
      data: { openid: wx.getStorageSync('openid'), current_day: current_day },
      success: function (res) {
        // console.log(res);
        // console.log(res.data.data.user_info);
        that.setData({
          info: res.data.data.user_info,
          create_day: res.data.data.user_info.create_day
        });
        console.log(res.data.data.user_info);
      }
    })
  },
  gotoAgreement: function () {
    console.log('gotoAgreement');
    wx.navigateTo({
      url: '/pages/index/protocol/agreement',
    })
  },
  gotoPrivatePolicy: function () {
    console.log('gotoPrivatePolicy');
    wx.navigateTo({
      url: '/pages/index/protocol/privacyPolicy',
    })
  }
})
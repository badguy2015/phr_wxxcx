Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getuserinfoHandle: function (res) {
    // console.log(res.detail.userInfo);
    if (res.detail.userInfo) {
      wx.setStorageSync('wx_userInfo', res.detail.userInfo);
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  },
  gotoAgreement: function(){
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
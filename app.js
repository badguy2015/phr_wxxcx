App({
  // 全局变量
  globalParams: {
    host: "https://phr.xsphp.com"
  },
  doLogin: function () {
    if (!wx.getStorageSync('openid')) {
      wx.login({
        success(res) {
          console.log('code:',res.code);
          if (res.code) {
            var loginUrl = "https://phr.xsphp.com/mobile/index/login";
            wx.request({
              url: loginUrl,
              method: "POST",
              data: {
                code: res.code
              },
              success: function (res) {
                if (res.data.code) {
                  wx.showToast({
                    title: res.data.msg,
                  })
                } else {
                  wx.setStorageSync('openid', res.data.data.openid);
                  wx.setStorageSync('user_info', res.data.data.user_info);
                  console.log('login success! appid:' + res.data.data.openid);
                  return true;
                }
              }
            })
          } else {
            wx.showToast({
              title: '获取code失败！',
            })
          }
        }
      });
    } else {
      console.log('aready login! appid:' + wx.getStorageSync('openid'));
      return true;
    }
    return false;
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})


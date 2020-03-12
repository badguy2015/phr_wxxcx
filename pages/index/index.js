// pages/index/index.js
var app = getApp();
Page({
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.freshStorage();
    app.doLogin();
    this.setData({
      host: app.globalParams.host
    });
    if (this.leadToLogin()) {
      this.fillUserInfo();
    }
  },
  gotoPerson: function () {
    if (this.leadToLogin()) {
      wx.navigateTo({
        url: '/pages/index/person'
      })
    }
  },
  gotoInfo: function () {
    if (this.leadToLogin()) {
      wx.navigateTo({
        url: '/pages/index/info'
      })
    }
  }, 
  gotoRecord: function () {
    if (this.leadToLogin()) {
      wx.navigateTo({
        url: '/pages/index/list'
      })
    }
  },
  gotoMyQrcode: function () {
    if (this.leadToLogin()){
    wx.navigateTo({
      url: '/pages/index/myQrcode'
    })
    }
  },
  setUserInfo: function(){
    var wx_userInfo = wx.getStorageSync('wx_userInfo');
    if (wx_userInfo){
      this.setData({
        wx_userInfo: wx_userInfo
      });
      return;
    }
  },
  fillUserInfo(){
    var u = wx.getStorageSync('user_info');
    if(!(u.name&&u.mobile&&u.idcard_no&&u.household)){
      wx.showModal({
        title: '温馨提示',
        content: '您还未完善您的个人信息，现在去填写吗？',
        confirmText: '现在填写',
        cancelText: '暂时不去',
        cancelColor: '#808080',
        confirmColor: '#FF0000',
        success(res){
          if (res.confirm) {
            console.log('用户点击确定');
            wx.redirectTo({
              url: '/pages/index/setting',
            })
          }
        }
      })
    } else {
      this.leadToInfo();
    }
  },
  leadToInfo: function(){
    if (!wx.getStorageSync('wx_userInfo')) return;
    var that = this;
    wx.request({
      url: app.globalParams.host + '/mobile/index/getCurrentDayInfo',
      method: "POST",
      data: { openid: wx.getStorageSync('openid') },
      success: function (res) {
        // console.log('a', res);
        // console.log('b', res.data.data.user_info);
        // console.log('c', res.data.data.user_info.id);
        if (!res.data.data.user_info.id){
          console.log('redirect to fill table!');
          wx.showModal({
            title: '温馨提示',
            content: '您今天还未填写自查登记，现在去填写吗？',
            confirmText: '现在填写',
            cancelText: '暂时不去',
            cancelColor: '#808080',
            confirmColor: '#FF0000',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                wx.redirectTo({
                  url: '/pages/index/info',
                })
              }
            }
          })
        }
      }
    })
  },
  leadToLogin: function(){
    if (wx.getStorageSync('wx_userInfo')){
      this.setUserInfo();
      return true;
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '体验小程序完整功能，需要获取您的昵称和头像',
        confirmText: '去授权',
        cancelText: '拒绝',
        cancelColor: '#808080',
        confirmColor: '#FF0000',
        success(res) {
          if (res.confirm) {
            // console.log('用户点击确定');
            wx.redirectTo({
              url: '/pages/index/login',
            })
          }
        }
      })
    } 
  },
  getPhoneNumberHandle(e) {
    console.log(e)
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  freshStorage: function(){
    var url = app.globalParams.host +'/mobile/index/freshStorage';
    var that = this;
    wx.request({
      url: url,
      method: 'post',
      success: function (rst) {
        console.log('freshStorageRst:', rst);
        if (rst.statusCode === 200) {
          var is_refresh = rst.data.data.is_refresh;
          var refresh_id = rst.data.data.refresh_id;
          // 刷新时间，单位：秒
          var refresh_interval = rst.data.data.refresh_interval;
          var refresh_info = wx.getStorageSync('refresh_info');
          if (is_refresh==="on"){
            if (!refresh_info.id || refresh_info.id !== refresh_id) {
              wx.clearStorageSync();
              var refresh_info = {
                id: refresh_id,
                next_timestap: that.getTimestamp() + refresh_interval * 1000
              }
              wx.setStorageSync('refresh_info', refresh_info);
            } else if (!refresh_info.next_timestap || refresh_info.next_timestap < that.getTimestamp()) {
              var refresh_info = {
                id: refresh_id,
                next_timestap: that.getTimestamp() + refresh_interval * 1000
              }
              wx.setStorageSync('refresh_info', refresh_info);
            }
          }
          
        }
      }
    })
  },
  getTimestamp:function(){
    var date = new Date();
    return date.getTime();
  }

})
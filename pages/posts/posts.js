// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    var post_content = [
      {
        date: "Sep 18 2020",
        title: '正是虾肥蟹壮时',
        img: {
          post_img: "/images/post/crab.png",
          author_img: '/images/avatar/5.png'
        },
        content: '菊黄当不要自动换行行不行不要自动换行行不行不要自动换行行不行不要自动换行行不行不要自动换行行不行不要自动换行行不行嫰玉双双满',
        view_num: '112',
        collect_num: '96'
      },
      {
        date: "Sep 18 2020",
        title: '正是虾肥蟹壮时',
        img: {
          post_img: "/images/post/crab.png",
          author_img: '/images/avatar/5.png'
        },
        content: '菊黄当不要自动换行行不行不要自动换行行不行不要自动换行行不行不要自动换行行不行不要自动换行行不行不要自动换行行不行嫰玉双双满',
        view_num: '112',
        collect_num: '96'
      },
      {
        date: "Sep 18 2020",
        title: '正是虾肥蟹壮时',
        img: {
          post_img: "/images/post/crab.png",
          author_img: '/images/avatar/5.png'
        },
        content: '菊黄当不要自动换行行不行不要自动换行行不行不要自动换行行不行不要自动换行行不行不要自动换行行不行不要自动换行行不行嫰玉双双满',
        view_num: '112',
        collect_num: '96'
      },
    ]
    this.setData({
      post_key:post_content
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onLoadonUnload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom');

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('onShareAppMessage');

  }
})
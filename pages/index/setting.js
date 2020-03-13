// pages/index/setting.js
var app = getApp();
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.doLogin();
    var user_info = wx.getStorageSync('user_info');
    this.setData({
      info: user_info
      // ,
      // school: ["中山大学", "深圳大学", "汕头大学"],
      // schoolIndex: 0,
    });
    // 绑定学校
    this.bindSchoolData(),
    // 绑定班级
    this.bindGradeData()
  },
  formSubmit:function(e){
    if (!this.vailidForm(e.detail.value)) return false;
    var postData;
    postData = e.detail.value;
    postData['nick_name'] = wx.getStorageSync('wx_userInfo').nickName;
    postData['avatar_url'] = wx.getStorageSync('wx_userInfo').avatarUrl;
    var handleUrl = app.globalParams.host +'/mobile/index/updateUserInfo';
    wx.request({
      dataType:"json",
      data: postData,
      url: handleUrl,
      method:'POST',
      success:function(rst){
        if (rst.statusCode===200){
          // console.log("rst.statusCode===200");
          if (rst.data.code !== 0) {
            wx.showToast({
              title: rst.data.msg
            })
          }else{
            wx.showToast({
              title: '保存成功',
              duration: 2000
            });
            wx.setStorageSync('user_info', rst.data.data.user_info);
            wx.redirectTo({
              url: '/pages/index/index',
            });
          }
        }else{
          wx.showToast({
            title: '保存失败！'
          })
        }
      }
    })

    // this.setData({
    //   info: info
    // });
    // console.log(e.detail.value);
  },
  bindSchoolData: function () {
    var _that = this;
    var schooolListUrl = app.globalParams.host + '/admin/school/schoolList';
    wx.request({
      url: schooolListUrl,
      method: 'post',
      success: function (res) {
        console.log(res);
        if (res.data.code) {
          //错误处理
        } else {
          var keys = res.data.data.school_list_key;
          var values = res.data.data.school_list_value;
          _that.setData({
            school: values,
            schoolIndexListTure: keys,
            other_school_index: res.data.data.other_school_index,
            other_grade_index: res.data.data.other_grade_index
          });
          // 初始化 是否显示其他
          var showSchoolNote, showGradeNote;
          if (_that.data.info.school_id == _that.data.other_school_index){
            _that.setData({
              showSchoolNote: true,
              showGradeNote: true
            });
          }
          
          console.log(_that.data.info.school_id);
          // 初始化学校id
          if (_that.data.info.school_id) {
            for (var i = 0; i < keys.length; i++) {
              if (keys[i] === _that.data.info.school_id) {
                  _that.setData({
                    schoolIndex: i
                  });
                  console.log('ini i:', i);
                  break;
              }
            }
          }
        }
      }
    })
  },
  bindSchoolChange: function (e) {
    var school_id = this.data.schoolIndexListTure[e.detail.value];
    console.log('school_id_index:', e.detail.value);
    console.log('school_id:',school_id);
    console.log('this',this);
    var info = this.data.info;
    info.school_id = school_id;
    this.bindGradeData(school_id)
    var showSchoolNote, showGradeNote;
    if (school_id == this.data.other_school_index){
      showSchoolNote = true;
      showGradeNote = true;
    }else{
      showSchoolNote = false;
      showGradeNote = false;
    }
    this.setData({
      schoolIndex: e.detail.value,
      info: info,
      showSchoolNote: showSchoolNote,
      showGradeNote: showGradeNote
    });
  },
  bindGradeData: function (school_id=null) {
    // 清空gradeDate
    this.setData({
      grade: null,
      gradeIndexListTure: null,
      gradeIndex:null
    });
    // todo:判断学校是否为空，为空，则不请求班级
    // console.log('this.data.schoolIndex');
    // console.log(this.data);
    // console.log(this.data.schoolIndex);

    // if (!this.data.schoolIndex){
    //   this.setData({
    //     gradeIndex: null
    //   });
    //   return;
    // };
    var _that = this;
    var gradeListUrl = app.globalParams.host + '/admin/grade/gradeList';
    if (!school_id) school_id = this.data.info.school_id;
    if (!school_id) {return};
    wx.request({
      url: gradeListUrl,
      method: 'post',
      data: {school_id: school_id},
      success: function (res) {
        console.log(res);
        if (res.data.code) {
          //错误处理
        } else {
          var keys = res.data.data.grade_list_key;
          var values = res.data.data.grade_list_value;
          _that.setData({
            grade: values,
            gradeIndexListTure: keys
          });
          console.log('a', _that.data.info.grade_id);
          console.log('b1', keys);
          console.log('b2', values);
          // 初始化班级id
          if (_that.data.info.grade_id) {
            for (var i = 0; i < keys.length; i++) {
              if (keys[i] === _that.data.info.grade_id) {
                _that.setData({
                  gradeIndex: i
                });
                break;
              }
            }
          }
        }
        if (_that.data.grade[_that.data.gradeIndex] === "其他") {
            _that.setData({
              showGradeNote: true
            });
        } else {
          _that.setData({
            showGradeNote: false
          });
        }
      }
    })

    // this.setData({
    //   gradeIndex: e.detail.value
    // })
  },
  bindGradeChange: function (e) {
    var grade_id = this.data.gradeIndexListTure[e.detail.value];
    // console.log('c', grade_id);
    // console.log('d', this.data.gradeIndexListTure);
    // console.log('3', e.detail.value);
    var info = this.data.info;
    info.grade_id = grade_id;
    this.setData({
      gradeIndex: e.detail.value,
      info: info
    });
    // console.log('a', this.data.grade);
    // console.log('b', e.detail.value);
    // console.log('c', this.data.grade[e.detail.value] === "其他");
    if (this.data.grade[e.detail.value] === "其他") {
      this.setData({
        showGradeNote: true
      });
    } else {
      this.setData({
        showGradeNote: false
      });
    }
  },
  blurHandleName: function (res) {
    this.blurHandle('name',res.detail.value);
  },
  blurHandleMobile: function(res){
    this.blurHandle('mobile',res.detail.value);
  },
  blurHandleIdcardNo: function(res){
    this.blurHandle('idcard_no',res.detail.value);
  },
  blurHandleHousehold: function(res){
    this.blurHandle('household',res.detail.value);
  },
  blurHandle: function (name,value) {
    var info = this.data.info;
    info[name] = value;
    this.setData({
      info: info
    });
  },
  vailidForm:function(data){
    console.log('data', data);
    var warnningMsg, warnningName;
    // 姓名 电话 身份证 户籍 学校 班别
    if (!data.name){
      warnningName = '姓名';
    } else if (!data.mobile) {
      warnningName = '电话';
    } else if (!data.idcard_no) {
      warnningName = '身份证';
    } else if (!data.household) {
      warnningName = '户籍';
    }else{
      return true;
    }
    warnningMsg = warnningName+'不可以为空';
    wx.showModal({
      title: '温馨提示',
      content: warnningMsg,
    });
    return false;
  }

})
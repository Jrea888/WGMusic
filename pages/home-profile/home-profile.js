import {serviceLogin} from '../../service/index'

Page({
  data: {
    userInfo: {}
  },
  getUserInfoHandle: async function(event) {
    const result = await serviceLogin.getUserInfo()
    console.log(result.userInfo)
    this.setData({userInfo: result.userInfo})
  },
  getUserPhoneHandle: function(event) {
    console.log(event)
  }
})
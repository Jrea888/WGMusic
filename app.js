import {serviceLogin} from './service/index'
import {TOKEN_KEY} from './constants/token-const'

// app.js
App({
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    navBarHeight: 44
  },
  async onLaunch() {
    // 1. 获取设备信息
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight

    this.loginHandle()
  },
  async loginHandle() {
    // 2. 让用户默认进行登陆
    const token = wx.getStorageSync(TOKEN_KEY)
    // a.token是否过期
    const checkResult = await serviceLogin.checkToken()
    // b.session是否过期
    const isSessionExpire = await serviceLogin.checkSession()

    // 用户是否需要进行登录操作，需要判断 token是否过期、session是否过期、检测token是否获取正确
    if (!token || !isSessionExpire || checkResult.errorCode) {
      this.userLoginAction()
    }
  },
  async userLoginAction() {
    // 1.获取 code
    const code = await serviceLogin.getLoginCode()
    console.log(code, 'user code')

    // 2.将code给开发服务器 服务后会把 code + appid + appsecret 这三个作为参数 向微信服务器请求 session_key和openid, 后端再根据session_key和openid加密一个token
    const res = await serviceLogin.getTokenByCode(code)
    // 将换取的 token 保存到本地，TOKEN_KEY
    wx.setStorageSync(TOKEN_KEY, res.token)
  }
})

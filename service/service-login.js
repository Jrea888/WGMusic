import {
  serviceLoginRequest
}
from './service-base'
import {
  TIME_OUT
} from './config'

function getLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: TIME_OUT,
      success: (res) => {
        const code = res.code
        resolve(code)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

function getTokenByCode(code) {
  return serviceLoginRequest.post({
    url: "/login",
    data: {
      code
    },
    isAuth: false
  })
}

function checkToken() {
  return serviceLoginRequest.post({
    url: "/auth",
    data: {},
    header: {},
    isAuth: true
  })
}

function checkSession() {
  return new Promise(resolve => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '你好！ 张伟刚',
      success: (res) => {
        resolve(res)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}


export {
  checkToken,
  checkSession,
  getLoginCode,
  getTokenByCode,
  getUserInfo
}
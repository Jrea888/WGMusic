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
      fail: (error) =>{
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
    }
  })
}

function checkToken(token) {
  return serviceLoginRequest.post({
    url: "/auth",
    header: {},
    data: {
      token
    }
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


export {
  checkToken,
  checkSession,
  getLoginCode,
  getTokenByCode
}
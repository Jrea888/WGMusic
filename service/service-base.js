import {
  BASE_URL,
  BASE_URL_LOGIN,
  TIME_OUT
} from './config'
import {TOKEN_KEY} from '../constants/token-const'

const token = wx.getStorageSync(TOKEN_KEY)

class ServiceRequest {
  constructor(baseUrl, authHeader = {}) {
    this.baseUrl = baseUrl
    this.authHeader = authHeader
  }

  baseUrl = ''

  request(options) {
    const {
      url,
      data,
      isAuth,
      header
    } = options
    wx.showLoading({
      title: '加载中...',
    })
    return new Promise((resolve, reject) => {
      const finialHeader = isAuth ? {...this.authHeader, ...header} : header
      wx.request({
        data,
        header: finialHeader,
        timeout: TIME_OUT,
        url: this.baseUrl + url,
        success: (res) => {
          resolve(res.data)
        },
        fail: (error) => {
          reject(error)
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    })
  }

  get(options) {
    return this.request({
      ...options,
      method: 'GET'
    })
  }

  post(options) {
    return this.request({
      ...options,
      method: 'POST'
    })
  }
}

const serviceRequest = new ServiceRequest(BASE_URL)

const serviceLoginRequest = new ServiceRequest(BASE_URL_LOGIN, {token})

export {serviceRequest, serviceLoginRequest}
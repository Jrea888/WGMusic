import {
  BASE_URL,
  BASE_URL_LOGIN,
  TIME_OUT
} from './config'

class ServiceRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  baseUrl = ''

  request(options) {
    const {
      url,
      data,
      header
    } = options
    wx.showLoading({
      title: '加载中...',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        data,
        header,
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

const serviceLoginRequest = new ServiceRequest(BASE_URL_LOGIN)

export {serviceRequest, serviceLoginRequest}
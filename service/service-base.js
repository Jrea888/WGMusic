import {
  BASE_URL,
  TIMR_OUT
} from './config'

class SeriveRequest {
  baseUrl = ''

  constructor() {
    this.baseUrl = BASE_URL
  }

  request(options) {
    const {
      url,
      data
    } = options
    wx.showLoading({
      title: '加载中...',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        data,
        timeout: TIMR_OUT,
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
const serviceRequest = new SeriveRequest(BASE_URL)
export {serviceRequest} 
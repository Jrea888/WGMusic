import {
  serviceVideo
} from '../../../service/index'

Page({
  data: {
    mvURLInfo: {},
    mvDetail: {},
    relatedVideos: [],
    danmuList: [{
      text: '好听的歌曲，净化心灵',
      color: '#ff0000',
      time: 6
    }, {
      text: '音乐有你而璀璨，厉害',
      color: '#ff00ff',
      time: 8
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.getPageData(id)
  },
  getPageData(id) {
    // 1.请求视频地址
    serviceVideo.getMVUrl(id).then(res => {
      this.setData({
        mvURLInfo: res.data
      })
    })
    // 2.请求视频详情内容
    serviceVideo.getMVDetail(id).then(res => {
      this.setData({
        mvDetail: res.data
      })
      console.log(this.data.mvDetail, this.data.artistImaage)
    })
    // 3.请求推荐视频
    serviceVideo.getMVRelated(id).then(res => {
      this.setData({
        relatedVideos: res.data
      })
      console.log(this.data.relatedVideos)
    })
  }
})
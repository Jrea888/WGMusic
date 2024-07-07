// components/search-item/search-item.js
Component({
  properties: {
    item: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    searchSongItemClickHandle() {
      const id = this.properties.item.id
      wx.navigateTo({
        url: `/pages/music-player/music-player?id=${id}`,
      })
    }
  }
})
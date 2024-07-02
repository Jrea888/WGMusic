Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    songMenuList: {
      type: Array,
      value: []
    }
  },
  data: {},
  methods: {
    menuItemClickHandle(e) {
      const item = e.currentTarget.dataset.item
      wx.navigateTo({
        url: `/pages/songs-detail/songs-dedtail?id=${item.id}&type=menu`,
      })
    }
  }
})
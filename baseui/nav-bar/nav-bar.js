const globalData = getApp().globalData

Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: "默认标题"
    }
  },
  data: {
    navBarHeight: globalData.navBarHeight,
    statusBarHeight: globalData.statusBarHeight
  },
  methods: {}
})
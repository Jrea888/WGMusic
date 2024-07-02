Component({
  properties: {
    title: {
      type: String,
      value: '默认标题'
    },
    rightText: {
      type: String,
      value: '更多'
    },
    showRight: {
      type: Boolean,
      value: true
    }
  },
  data: {},
  methods: {
    moreClickHandle() {
      this.triggerEvent('click')
    }
  }
})
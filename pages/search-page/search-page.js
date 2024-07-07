import {
  serviceSearch
} from '../../service/index'

import {
  debounce
} from '../../utils/debounce-throttle'

import {
  searchKeywordsTransformNodes
} from '../../utils/search-keywords-transform-nodes'

const debounceGetSearchSuggest = debounce(serviceSearch.getSearchSuggestList, 300)

Page({
  data: {
    searchValue: '',
    searchList: [],
    hotKeywords: [],
    suggestSongs: [],
    suggestSongsNodes: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取页面数据
    this.getPageData()
  },
  getPageData() {
    serviceSearch.getSearchHot().then(res => {
      this.setData({
        hotKeywords: res.result.hots
      })
    })
  },
  async searchActionHandle() {
    const {
      result
    } = await serviceSearch.getSearchResult(this.data.searchValue)
    this.setData({
      searchList: result.songs
    })
  },
  // 热门搜索词，点击处理
  async hotTagClickHandle(e) {
    const searchValue = e.currentTarget.dataset.keyword
    this.setData({
      searchValue
    })
    await this.searchActionHandle()
  },
  // 搜索输入框改变时触发
  searchChangeHandle(event) {
    // 拿取 搜索关键字
    const searchValue = event.detail
    // 设置值
    this.setData({
      searchValue
    })

    // 搜索词为空时，将搜索列表和搜索词建议列表清空
    if (!searchValue.length) {
      this.setData({
        searchList: [],
        suggestSongs: []
      })
      // 取消延迟执行的函数
      debounceGetSearchSuggest.cancel()
      return
    }

    // 根据关键词 进行搜索，性能优化：防抖处理
    debounceGetSearchSuggest(searchValue).then(data => {
      const suggestSongs = data.result.allMatch
      this.setData({
        suggestSongs
      })

      // 显示搜索关键词列表 需要 把数据转化成对应的格式
      if (suggestSongs) {
        const keywordList = suggestSongs.map(v => v.keyword)
        const suggestSongsNodes = []
        for (const keyword of keywordList) {
          const nodes = searchKeywordsTransformNodes(keyword, searchValue)
          suggestSongsNodes.push(nodes)
        }
        this.setData({
          suggestSongsNodes
        })
      }
    })
  },
  // 搜索建议词列表点击处理
  async suggestKeywordClickHandle(e) {
    const searchValue = e.currentTarget.dataset.keyword
    this.setData({
      searchValue
    })
    await this.searchActionHandle()
  }
})
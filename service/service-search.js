import {
  serviceRequest
} from './service-base'

// 搜索热词
function getSearchHot() {
  return serviceRequest.get({
    url: '/search/hot'
  })
}

// 搜索建议 
function getSearchSuggestList(keywords, type = 'mobile') {
  return serviceRequest.get({
    url: '/search/suggest',
    data: {
      keywords,
      type
    }
  })
}

function getSearchResult(keywords) {
  return serviceRequest.get({
    url: '/search',
    data: {keywords}
  })
}

export {
  getSearchHot,
  getSearchResult,
  getSearchSuggestList
}
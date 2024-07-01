import {
  serviceRequest
} from './service-base'

/**
 * 获取轮播图
 * @param {*} type 
 */
function getBannersList(type = 0) {
  return serviceRequest.get({
    url: '/banner',
    data: {
      type
    }
  })
}

/**
 * 获取排行榜歌曲
 * @param {*} id  新歌歌曲-3779629 原创歌曲-2884035 飙升歌曲-19723756 热歌门曲-3778678
 */
function getSongRanking(id) {
  return serviceRequest.get({
    url: '/playlist/detail',
    data: {
      id
    }
  })
}

/**
 * 获取歌单数据
 * @param {*} cat 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部"
 * @param {*} limit 取出歌单数量 , 默认为 50
 * @param {*} offset 偏移数量 , 用于分页 
 */
function getSongsMenu(cat = "全部", limit = 6, offset = 0) {
  return serviceRequest.get({
    url: '/top/playlist',
    data: {
      cat,
      limit,
      offset
    }
  })
}

export {
  getSongsMenu,
  getSongRanking,
  getBannersList,
}
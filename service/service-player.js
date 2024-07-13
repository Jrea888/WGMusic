import {
  serviceRequest
} from './service-base'

function getSongDetail(id) {
  return serviceRequest.get({
    url: '/song/detail',
    data: {
      ids: id
    }
  })
}

function getSongLyric(id) {
  return serviceRequest.get({
    url: '/lyric',
    data: {
      id
    }
  })
}

export {
  getSongDetail,
  getSongLyric
}
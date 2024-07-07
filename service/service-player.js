import {
  serviceRequest
} from './service-base'

function getSongInfo(id) {
  return serviceRequest.get({
    url: '/song/detail',
    data: {
      ids: id
    }
  })
}

export {
  getSongInfo
}
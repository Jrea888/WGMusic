import {
  serviceRequest
} from './service-base'

function getTopMV(offset = 0, limit = 12) {
  return serviceRequest.get({
    url: '/top/mv',
    data: {
      limit,
      offset
    }
  })
}

function getMVUrl(id) {
  return serviceRequest.get({
    url: '/mv/url',
    data: {
      id
    }
  })
}

function getMVDetail(mvid) {
  return serviceRequest.get({
    url: '/mv/detail',
    data: {
      mvid
    }
  })
}

function getMVRelated(id) {
  return serviceRequest.get({
    url: '/related/allvideo',
    data: {
      id
    }
  })
}

export {
  getTopMV,
  getMVUrl,
  getMVDetail,
  getMVRelated
}
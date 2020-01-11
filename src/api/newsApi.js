import axios from './axios'
import qs from 'qs'
import {partyBuildUrl} from '@/config/config'

export const getNewsTypeParent = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: partyBuildUrl + '/api/News/GetNewsTypeParent',
            method: 'get',
            params
        }).then(res => {
          resolve(res.data)
        })
    })
}

export const getNewsTypeChildren = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: partyBuildUrl + '/api/News/GetNewsTypeChildren',
          method: 'get',
          params
      }).then(res => {
        resolve(res.data)
      })
  })
}

export const getNewsInfoList = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: partyBuildUrl + '/api/News/GetNewsInfoList',
          method: 'get',
          params
      }).then(res => {
        resolve(res.data)
      })
  })
}

export const getNewsInfo = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: partyBuildUrl + '/api/News/GetNewsInfoByTeach',
          method: 'get',
          params
      }).then(res => {
        resolve(res.data)
      })
  })
}

export const getCommentList = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: partyBuildUrl + '/api/News/GetNewsCommentList',
          method: 'get',
          params
      }).then(res => {
        resolve(res.data)
      })
  })
}

export const deleteComment = (data) => {
  return new Promise((resolve, reject) => {
      axios({
          url: partyBuildUrl + '/api/News/DeleteNewsComment',
          method: 'post',
          data: qs.stringify(data)
      }).then(res => {
        resolve(res.data)
      })
  })
}

export const addComment = (data) => {
  return new Promise((resolve, reject) => {
      axios({
          url: partyBuildUrl + '/api/News/AddNewsComment',
          method: 'post',
          data
      }).then(res => {
        resolve(res.data)
      })
  })
}

export const addView = (data) => {
  return new Promise((resolve, reject) => {
      axios({
          url: partyBuildUrl + '/api/News/AddView',
          method: 'post',
          data
      }).then(res => {
        resolve(res.data)
      })
  })
}

export const cancelView = (data) => {
  return new Promise((resolve, reject) => {
      axios({
          url: partyBuildUrl + '/api/News/CancelComment',
          method: 'post',
          data: qs.stringify(data)
      }).then(res => {
        resolve(res.data)
      })
  })
}

export const updateLearnTime = (data) => {
  return new Promise((resolve, reject) => {
    axios.noLoading = true
      axios({
          url: partyBuildUrl + '/api/News/UpdateNewsLearnTime',
          method: 'post',
          data: qs.stringify(data)
      }).then(res => {
        resolve(res.data)
      })
  })
}


export const getRecord = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: partyBuildUrl + '/api/News/GetStudyRecord',
          method: 'get',
          params
      }).then(res => {
        resolve(res.data)
      })
  })
}


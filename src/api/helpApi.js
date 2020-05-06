import axios from './axios'
import qs from 'qs'
import {baseUrlSet, baseUrl2} from '@/config/config'

export const getHelp = (id) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrlSet + '/api/HelperManager/GetHelper/' + id,
          method: 'get'
      }).then(res => {
        resolve(res.data)
      })
  })
}

export const getHelpList = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrlSet + '/api/HelperManager/GetHelperListByMoblie',
          method: 'get',
          params
      }).then(res => {
        resolve(res.data)
      })
  })
}

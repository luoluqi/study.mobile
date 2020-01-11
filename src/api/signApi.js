import axios from './axios'
import qs from 'qs'
import {partyBuildUrl} from '@/config/config'
//签到
export const sign = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: partyBuildUrl + '/api/Sign/Sign',
          method: 'get',
          params
      }).then(res => {
        resolve(res.data)
      })
  })
}


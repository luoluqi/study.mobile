import axios from './axios'
import qs from 'qs'
import {baseUrl, baseUrl2, baseUrl3, baseUrl4,homeWorkUrl,noticeUrl, oaUrl, appUrl} from '@/config/config'
// 获取menu数据接口
export const getUrlList = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/MOAuth/GetUrlList?data=' + JSON.stringify(params),
            method: 'get',
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 已读未读数据接口
export const getReadData = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            // url: baseUrl + '/api/MSos/GetReadData?data=' + JSON.stringify(params),
            // url: baseUrl4 + '/api/Parent/GetReadData?data=' + JSON.stringify(params),
            url: baseUrl4 + '/api/Parent/GetReadData?' + qs.stringify(params),
            method: 'get',
        }).then(res => {
            resolve(res.data)
        })
    })
}
export const getReadDataSos = (studentId) => {
  return new Promise((resolve, reject) => {
      axios({
          url: appUrl + '/safety/api/position/sOSInfo/readInfo/' + studentId,
          // url: baseUrl + '/api/MSos/GetReadData?' + qs.stringify(params),
          method: 'get',
      }).then(res => {
          resolve(res.data)
      })
  })
}
// 获取登录token 信息存入Cookies和catcher
export const getTokenByMoblie = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl2 + '/api/MToken/GetTokenByMoblie',
            method: 'get',
        }).then(res => {
            resolve(res.data)
        }).catch(error => {
          reject(error)
        })
    })
}
// 新闻接口
export const getNewsList = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/MNewsInfo/GetNewsList?data=' + JSON.stringify(params),
            method: 'get',
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 首页列表
export const getUrlListV3 = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl + '/api/MOAuth/GetUrlListV3?data=' + JSON.stringify(params),
          method: 'get',
      }).then(res => {
        resolve(res.data)
      })
  })
}
// 检测用户
export const checkUser = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl + '/api/MOAuth/CheckUser?data=' + JSON.stringify(params),
          method: 'get',
      }).then(res => {
          resolve(res.data)
      })
  })
}
// VIP列表
export const getChargeAndPackage = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl3 + '/api/MCharge/GetChargeAndPackage?data=' + JSON.stringify(params),
          method: 'get',
      }).then(res => {
          resolve(res.data)
      })
  })
}
export const addOrder = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl3 + '/api/MCharge/AddOrder',
          method: 'post',
          data: qs.stringify(params)
      }).then(res => {
          resolve(res.data)
      })
  })
}
export const continueToPay = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl3 + '/api/MCharge/ContinueToPay',
          method: 'post',
          data: qs.stringify(params)
      }).then(res => {
          resolve(res.data)
      })
  })
}

export const getOrderMaturityTime = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl3 + '/api/MCharge/GetOrderMaturityTime?data='+ JSON.stringify(params),
          method: 'get',
          data: qs.stringify(params)
      }).then(res => {
          resolve(res.data)
      })
  })
}

export const checkLevel = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl + '/api/MOAuth/CheckLevel?data='+ JSON.stringify(params),
          method: 'get',
          data: qs.stringify(params)
      }).then(res => {
          resolve(res.data)
      })
  })
}
export const getClassRoomTeacherByTeacherId = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl2 + '/api/Data/GetClassRoomTeacherByTeacherId?data='+ JSON.stringify(params),
          method: 'get',
          data: qs.stringify(params)
      }).then(res => {
          resolve(res.data)
      })
  })
}
export const getYqCode = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl + '/Api/MOAuth/GetYqCode?data='+ JSON.stringify(params),
          method: 'get',
          data: qs.stringify(params)
      }).then(res => {
          resolve(res.data)
      })
  })
}
export const openidDel = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl + '/api/MOAuth/OpenidDel?data='+ JSON.stringify(params),
          method: 'get',
          data: qs.stringify(params)
      }).then(res => {
          resolve(res.data)
      })
  })
}

export const addPoint = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl2 + '/api/Point/AddPoint?data='+ JSON.stringify(params),
          method: 'get',
          data: qs.stringify(params)
      }).then(res => {
          resolve(res.data)
      })
  })
}

// export const getHomeWorkUnread = (params) => {
//     return new Promise((resolve, reject) => {
//         axios({
//             url: homeWorkUrl + '/api/HomeWork/GetUnReadNumber',
//             method: 'get',
//             params
//         }).then(res => {
//             resolve(res.data)
//         })
//     })
// }

export const getHomeWorkUnread = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/GetUnReadNumber',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}

export const getNoticeUnread = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/GetUnReadNumber',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
 // 模块点击日志
export const writeModularLog = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl2 + '/api/MainLog/WriteModularLog',
          method: 'get',
          params
      }).then(res => {
          resolve(res.data)
      })
  })
}

 export const getFlowCount = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: oaUrl + '/api/FlowRecord/MyPendingDealCount',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
  }

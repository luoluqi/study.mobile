import axios from '@/api/axios'
import qs from 'qs'
import {publicUrl, baseUrl2, fytestUrl, payrollUrl} from '@/config/config'
import {homeWorkUrl,schoolUrl} from '@/config/config'
import   cookie from '@/util/cookie'
export const getAccessToken = () => {
    return new Promise((resolve,reject) => {
        axios({
            url: fytestUrl + '/api/CommonApi/GetTokenByCache',
        }).then(res => {
            resolve(res.data)
        })
    });
}

export const GetConfig = () => {
    // console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: fytestUrl + '/api/CommonApi/GetConfig?url=' + window.location.href,
            method: 'get'
        }).then(res => {
            resolve(res.data)
        })
    });
}

// 微信上传图片
export const uploadWechatImg = (data) => {
    // console.log(data)
    // debugger
    return new Promise((resolve,reject) => {
        axios({
            url: 'http://fileapi.xueerqin.net/api/WechatFile/UploadClassZoneFile',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    });
}

// 根据老师id查询年级班级
export const getTeacher = (teacherId) => {
    return new Promise((resolve, reject) => {
        axios({
            url: publicUrl + '/api/Data/GetClassRoomTeacherByTeacherId?data={teacherId:"' + teacherId + '"}',
            method: 'get'
        }).then(res => {
          resolve(res.data)
        })
    })
  }

  // 获取登录token 信息存入Cookies和catcher
export const getTokenByMoblie = () => {
    return new Promise((resolve, reject) => {
        axios({
            url: publicUrl + '/api/MToken/GetTokenByMoblie',
            method: 'get',
        }).then(res => {
            resolve(res.data)
        })
    })
}

//获取链接信息
export const getLinkInfo = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/GetHtmlModel',
            method: 'get',
            params,
            timeout:3000
        }).then(res => {
            resolve(res.data)
        }).catch(res => {
            resolve(res.data)
        })
    })
}
//获取学校下的年级
export const getGrade = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: schoolUrl + '/api/app/grade',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        }).catch(res => {
            resolve(res.data)
        })
    })
}
//获取学校下的年级下得班级
export const getClass = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: schoolUrl + '/api/app/class',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        }).catch(res => {
            resolve(res.data)
        })
    })
}

export const getManListV2 = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: payrollUrl + '/api/TeachSalary/GetTeachDeptV2',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
export const getRoleList = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl2 + '/api/Info/GetUserRoleLisByLoginUserId',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
} 

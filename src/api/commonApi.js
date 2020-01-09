import axios from '@/api/axios'
import qs from 'qs'
import {publicUrl,fytestUrl} from '@/config/config'

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
            // debugger
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

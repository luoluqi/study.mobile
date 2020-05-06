import axios from './axios'
import qs from 'qs'

import {appUrl} from '@/config/config'

export const getGPS = (params) => {

    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/position/gPSService/gpsListFromEs',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}

export const getLastGPS = (studentId) => {

    return new Promise((resolve,reject) => {
        axios.noLoading = true
        axios({
            url: appUrl + '/safety/api/position/gPSService/lastGPSInfoFromEs/' + studentId,
            method: 'get'
        }).then(res => {
            resolve(res.data)
        })
    })
}

export const getDevice = (params) => {

    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/device/studentDevice',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}

export const getFence = (params) => {

    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/device/studentElectronicFence',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}

export const setFence = (data) => {

    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/device/studentElectronicFence/setStudentElectronicFence',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    })
}

export const refreshGPS = (studentId) => {

    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/position/gPSService/refreshGPS/' + studentId,
            method: 'post'
        }).then(res => {
            resolve(res.data)
        })
    })
}

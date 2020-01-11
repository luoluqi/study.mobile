import axios from './axios'
import qs from 'qs'
import {sure} from '@/config/config'



// 确认出入校是否可操作
export const ConfirmInOrOutSchoolIfOp = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: sure + '/api/InOrOutSchool/ConfirmInOrOutSchoolIfOp',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 确认出入校是否可操作
export const ConfirmInOrOutSchool = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: sure + '/api/InOrOutSchool/ConfirmInOrOutSchool',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}

import axios from './axios'

import {baseUrlCheking, clockIn,fytestUrl} from '@/config/config'



// 获取考勤汇总信息
export const getChekingDetail = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrlCheking + '/api/Attence/GetMobileAttenceSumList',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取当天考勤汇总信息
export const getItemDetail = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrlCheking + '/api/Attence/GetMobileOneDateAttenceSumList',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}

// 获取考勤明细信息
export const getParticulars = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrlCheking + '/api/Attence/GetAttenceDetailListV2',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 单个学生当天考勤统计
export const nowDayCheking = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrlCheking + '/api/Attence/GetMobileOneAttenceSumInfo',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 单个学生当天明细
export const nowDetail = (params) => {
    // console.log(5959859859)
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrlCheking + '/api/Attence/GetMobileAttenceDetailInfo',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 单个学生某月考勤颜色--移动端
export const detailColorInfo = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrlCheking + '/api/Attence/GetMobileAttenceDetailColorInfo',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 签到积分
export const updatePoint = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: 'http://srv.xueerqin.net/api-point/api/UserPoint/UpdatePoint',
            method: 'post',
           data
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取老师考勤详细
export const recordDetailed = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: clockIn + '/api/Attence/GetAttendancerecordDetailed',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 是否范围内打卡
export const IsRang = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: clockIn + '/api/AttenceMoblie/IsRang',
            method: 'get',
            params
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
// 确定打卡
export const AddAttendancerecord = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: clockIn + '/api/AttenceMoblie/AddAttendancerecord',
            method: 'post',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取打卡记录
export const GetAttendanceNow = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: clockIn + '/api/AttenceMoblie/GetAttendanceNow',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 更新打卡记录
export const UpdateAttendancerecord = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: clockIn + '/api/AttenceMoblie/UpdateAttendancerecord',
            method: 'post',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取现在打卡是上班还是下班
export const GetAttendanceRecordState = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: clockIn + '/api/AttenceMoblie/GetAttendanceRecordState',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 根据教师Id获取班次
export const GetCommuting = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: clockIn + '/api/AttenceMoblie/GetCommutingTimesByteachId',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// ===============================================================================================
// 改动后的学生考勤
// export const GetCommuting = (params) => {
// 	// console.log(params)
//     return new Promise((resolve,reject) => {
//         axios({
//             url: clockIn + '/api/Attence/GetMobileOneAttenceSumInfo',
//             method: 'get',
//             params
//         }).then(res => {
//             resolve(res.data)
//         })
//     });
// }
// 获获取某学校/某年段/某班级的学生，某一天所有学生的考勤信息---PC端/移动端通用 庄俊龙
export const GetAttenceListByDayDetail = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrlCheking + '/api/Attence/GetAttenceListByDayDetail',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}

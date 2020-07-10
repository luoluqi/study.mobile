import axios from './axios'

import {appUrl} from '@/config/config'

// 获取老师考勤详细
export const reportList = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/school/api/attence/record/reportList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 学生列表
export const studentList = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/school/api/attence/record/studentList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取单个学生考勤
export const records = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/school/api/attence/record/records',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 修改单个学生考勤状态
export const corrent = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/school/api/attence/corrent',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 家长端  考勤列表
export const pageRecords = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/school/api/attence/record/pageRecords',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 改================================================
// 教师
var attence = '/school/api/attence/stuAttendance'
// 获取某班级在不同的月份每日的考勤情况，显示在日历上
export const perMonthClassAttendanceData = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + attence + '/perMonthClassAttendanceData',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取获取班级的所有学生列表
export const classAllStudent = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + attence + '/classAllStudent/' + params.classId,
            method: 'get'
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取某日班级的学生考勤情况
export const classStudentStatus = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + attence + '/classStudentStatus',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取出入校数据
export const studentInOutSchoolData = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + attence + '/studentInOutSchoolData',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取当前班级月度汇总考勤数据和选择的日期的数据
export const classMonthSummaryData = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + attence + '/classMonthSummaryData',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取某个学生的日常考勤
export const studentAttendanceDetail = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + attence + '/studentAttendanceDetail',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取某个学生本月考勤数据汇总
export const studentAttendanceSummaryData = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + attence + '/studentAttendanceSummaryData',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 修改学生考勤状态
export const classRolls = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/school/api/classroom/classRolls',
            method: 'put',
            params
        }).then(res => {
           resolve(res.data)
        }).catch(res => {
            reject(res)
        })
    });
}
// 新增学生考勤状态
export const studentAttendance = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/school/api/classroom/classRolls/studentAttendance',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        }).catch(res => {
            reject(res)
        })
    });
}

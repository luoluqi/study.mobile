import axios from './axios'
import qs from 'qs'
import {homeWorkUrl,circle} from '@/config/config'
// 老师获取家庭作业
export const getHomeWorkList = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/GetHomeWorkList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取学校科目
export const getSubjectList = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: circle + '/api/ClassInfo/GetSubjectListByTeacherId',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 新增家庭作业
export const addHomeWork = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/AddHomeWork',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 提醒
export const remind = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/Remind',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 设置已读
export const setRead = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/SetRead',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取已读未读列表
export const getReadList = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/GetReadList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取提交和点评列表
export const getCommitList = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/GetCommitList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 点赞
export const addLike = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/AddLike',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 教师点评
export const addReview = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/AddReview',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 教师根据主键获取
export const getHomeWork = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/GetHomeWork',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 家长获取家庭作业
export const getHomeWorkListByParent = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/GetHomeWorkListByParent',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 家长提交作业】
export const submit = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/Submit',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 家长获取详情 GET /api/HomeWorkMoblie/GetHomeWorkById/
export const getHomeWorkById = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/GetHomeWorkById',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 老师获取详情 GET /api/HomeWorkMoblie/GetHomeWorkByTeacher/{id}
export const getHomeWorkByTeacher = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWorkMoblie/GetHomeWorkByTeacher',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}

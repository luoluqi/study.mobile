import axios from './axios'
import qs from 'qs'
import {circle,giveALike,commentUrl} from '@/config/config'



// 班级圈列表
export const pageListByClassIdSType = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: circle + '/api/Demeanor/PageListByClassIdSType',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 上传图片
export const uploadFile = (formData) => {
    return new Promise((resolve, reject) => {
        axios.post(
        'http://srv.xueerqin.net/public-api/api/File/UploadFileV2', 
            formData, 
            { 
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        ).then(res => {
            resolve(res.data) 
        })      
    })
}
// 获取学校科目
export const getSubjectList = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: circle + '/api/ClassInfo/GetSubjectList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 发布班级风采、课余天地
export const addCircle = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: circle + '/api/Demeanor/AddDemeanor',
            method: 'post',
            data: qs.stringify(data)
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 课余天地
export const addAfterSchool = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: circle + '/api/Demeanor/AddAfterSchool',
            method: 'post',
            data: qs.stringify(data)
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 发布作业快照
export const addJobSnapshot = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: circle + '/api/Demeanor/AddJobSnapshot',
            method: 'post',
            data: qs.stringify(data)
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 删除班级圈
export const deleteCircle = (id) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: circle + '/api/Demeanor/Delete/'+id,
            method: 'get'
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 点赞
export const addZan = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: giveALike + '/api/GiveALike/Add',
            method: 'post',
            data: qs.stringify(data)
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 取消点赞
export const deleteZan = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: giveALike + '/api/GiveALike/Delete',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 根据被点赞记录id获取点赞记录
export const getListByRecordId = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: giveALike + '/api/GiveALike/GetListByRecordId',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}

export const addComment = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: commentUrl + '/api/Comment/Add',
            method: 'post',
            data:qs.stringify(params)
        }).then(res => {
            resolve(res.data)
        })
    });
}

export const getCommentList = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: commentUrl + '/api/Comment/GetListByRecordId',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}

export const deleteComment = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: commentUrl + '/api/Comment/Delete',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}

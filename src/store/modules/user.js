import   cookie from '@/util/cookie'
import {publicUrl} from '@/config/config'
import {getAccessToken,getTokenByMoblie,getTeacher} from '@/api/commonApi'
const user = {
    namespaced: true,
    state: {
        access_token:'',
        testImg: publicUrl + '/UpLoadFile/b1030d1890f94a2bbee7b28d7eeab568.jpg',
        headImg:'',
        classId:'',
        className:'',
        gradeId:'',
        gradeName:'',
        schoolId:'',
        schoolName:'',
        childList:[],
        classList:[],
        teacherId:'',
        realName:''
       
    },
    getters: {
        cellPhoneNum(){
            var s = cookie.get('cellPhoneNum')
            if(!s){
               return null
            }
            return s
        },
        classId(){
            var s = cookie.get('classId')
            if(!s){
                return "d5f2734484b54ab09e0328c9429c7234"
            }
            return s
        },
        gradeId(){
            var s = cookie.get('gradeId')
            if(!s){
                return null
            }
            return s
        },
        schoolId(){
            var s = cookie.get('schoolId')
            if(!s){
                return null
            }
            return s
        },
        studentId(){
            var s = cookie.get('studentId')
            if(!s){
                return null
            }
            return s
        },
        parentId(){
            var s = cookie.get('parentId')
            if(!s){
                return null
            }
            return s
        },
        teacherId(){
            var s = cookie.get('teacherId')
            if(!s){
                return null
            }
            return s
        },
        roleCode(){
            var s = cookie.get('roleCode')
            if(!s){
                return 'Teacher'
            }
            return s
        },
        loginUserId(){
            var s = cookie.get('loginUserId')
            if(!s){
                return null
            }
            return s
        },
        realName(){
            var s = cookie.get('realName')
            if(!s){
                return null
            }
            return decodeURI(s)
        },
        loginName(){
            var s = cookie.get('loginName')
            if(!s){
                return null
            }
            return s
        },
        img(){
            var s = cookie.get('img')
            if(!s){
                s = 'http://file.xueerqin.net/PortraitFiles/eeeea2b869e44b3bbd797f4d781aceaf/14ea81d3ada5490cb1b2d128d109bca0.png'
            }
            return s
        }
    },
    mutations: {
      
    },
    actions: {
        getAccessToken({state}){
            return new Promise((resovle,reject) => {
                if(state.access_token){
                    resovle(state.access_token)
                }else{
                    getAccessToken().then(res => {
                     
                         res = JSON.parse(res)
                         state.access_token = res.Data.accessToken
                          resovle(state.access_token)
                     })
                }
                 
            })
        },
        getUserInfo({state,getters,dispatch}){
            return new Promise((resolve,reject) => {
                if(state.classId){
                    resolve()
                    return
                }
                getTokenByMoblie().then(res => {
                    
                    res = JSON.parse(res)
                    if(getters['roleCode'] == 'Teacher'){
                        state.headImg = res.Data.Img
                        state.classList = res.Data.ClassInfoList
                        state.teacherId = res.Data.SelfId
                        state.realName = res.Data.RealName
                        state.schoolId = getters['schoolId']
                        dispatch('getTeacher').then(() => {
                            resolve()
                        })
                    }else if(getters['roleCode'] == 'Parent'){
                        state.headImg = res.Data.Img
                        state.childList = res.Data.MChildList
                        for(var item of state.childList){
                            if(item.SelfId == getters['studentId']){
                                state.classId = item.ClassId
                                state.className = item.ClassName
                                state.gradeId = item.GradeId
                                state.gradeName = item.GradeName
                                state.schoolId = item.SchoolId
                                state.schoolName = item.SchoolName
                                state.studentName = item.RealName
                                state.studentId = getters['studentId']
                                state.studentImg = item.Img
                                state.isMain = false
                            }
                        }
                        resolve()
                    }
                })
            })
        },
        getTeacher({state,getters}){
            return new Promise((resolve,reject) => {
                getTeacher(getters['teacherId']).then(res => {
                    res = JSON.parse(res)
                    res = JSON.parse(res)
                    var list = res.data
                    for(var item of list){
                        var isHave = false
                        for(var i = 0;i<state.classList.length;i++){
                            if(state.classList[i].ClassId == item.Id){
                                state.classList[i].isMain = true
                                isHave = true
                            }
                        }
                        if(!isHave){
                            state.classList.push({
                                ClassId:item.Id,
                                ClassName:item.Name,
                                GradeId:item.GradeId,
                                GradeName:item.GradeName,
                                SchoolId:item.SchoolId,
                                SchoolName:item.SchoolName,
                                IsMain:true
                            })
                        }
                        
                    }

                    for(var item of state.classList){
                        if(item.ClassId == getters['classId']){
                            state.classId = item.ClassId
                            state.className = item.ClassName
                            state.gradeId = item.GradeId
                            state.gradeName = item.GradeName
                            state.schoolName = item.SchoolName,
                            state.isMain = item.IsMain
                        }
                    }
                    resolve()
                })
            })
        }
    }
}
export default user

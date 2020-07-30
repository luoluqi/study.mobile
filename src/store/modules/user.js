import cookie from '@/util/cookie'
import { publicUrl } from '@/config/config'
import { getAccessToken, getTokenByMoblie, getTeacher, getRoleList } from '@/api/commonApi'
import {getCookiesObj, setCookie, checkArr, unique, getCookie} from '@/util/tool'
const user = {
  namespaced: true,
  state: {
    access_token: '',
    testImg: 'static/zanwu.png',
    headImg: '',
    classId: '',
    className: '',
    gradeId: '',
    gradeName: '',
    schoolId: '',
    schoolName: '',
    childList: [],
    classList: [],
    teacherId: '',
    realName: '',
    loginUserId: '',
    parentId: '',
    studentId: '',

    isSchoolAdmin: false,

    isNoClass: false,
    cookiesObj: {},

    reloadToken: true

  },
  getters: {
    cellPhoneNum (state) {
      var s = cookie.get('cellPhoneNum')
      if (!s) {
        return null
      }
      return s
    },
    classId (state) {
        return state.classId
    },
    gradeId (state) {
     return state.gradeId
    },
    schoolId (state) {
      return state.schoolId
    },
    studentId (state) {
      return state.studentId
    },
    parentId (state) {
      return state.parentId
    },
    teacherId (state) {
      return state.teacherId
    },
    roleCode (state) {
      return state.roleCode
    },
    loginUserId (state) {
      return state.loginUserId
    },
    realName (state) {
      return state.realName
    },
    loginName (state) {
        return state.LoginName
    },
    img () {
      var s = cookie.get('img')
      if (!s) {
        s = 'http://file.xueerqin.net/PortraitFiles/eeeea2b869e44b3bbd797f4d781aceaf/14ea81d3ada5490cb1b2d128d109bca0.png'
      }
      return s
    }
  },
  mutations: {

  },
  actions: {
    getAccessToken ({ state }) {
      return new Promise((resovle, reject) => {
        if (state.access_token) {
          resovle(state.access_token)
        } else {
          getAccessToken().then(res => {

            res = JSON.parse(res)
            state.access_token = res.Data.accessToken
            resovle(state.access_token)
          })
        }

      })
    },
    changePerson ({ state, dispatch }, item) {
        if (getCookie('roleCode') == 'Teacher') {
            setCookie('schoolId', item.SchoolId, 0)
            setCookie('classId', item.ClassId, 0)
            setCookie('gradeId', item.GradeId, 0)

            state.schoolId = item.SchoolId
            state.classId = item.ClassId
            state.gradeId = item.GradeId

        } else if (getCookie('roleCode') == 'Parent') {
            setCookie('schoolId', item.SchoolId, 0)
            setCookie('studentId', item.SelfId, 0)
            setCookie('classId', item.ClassId, 0)
            setCookie('gradeId', item.GradeId, 0)
            setCookie('img', item.Img, 0)

            state.schoolId = item.SchoolId
            state.studentId = item.SelfId
            state.classId = item.ClassId
            state.gradeId = item.GradeId
        }

        location.reload()
    },
     getUserInfo ({ state, dispatch }) {
      return new Promise(async (resolve, reject) => {
        if (!state.reloadToken) {
          resolve()
          return
        }
        state.reloadToken = false

        var res = await getTokenByMoblie()
        
        res = JSON.parse(res)
        console.log(res)
        if (!res.Data) {
          resolve()
          return
        }
        state.roleCode = getCookie('roleCode')
       
        if (getCookie('roleCode') == 'Teacher') {
         
            dispatch('teacherHandle', res)
            await dispatch('getTeacher')
            await dispatch('getRoleList')
        } else if (getCookie('roleCode') == 'Parent') {
          console.log(getCookie('roleCode'))
            dispatch('parentHandle', res)
        }
        resolve()

      })
    },
    parentHandle ({ state, dispatch }, res) {
       // 陈勇的逻辑 
      setCookie('loginUserId', res.Data.UserId, 0)
      setCookie('parentId', res.Data.SelfId, 0)
      setCookie('realName', encodeURI(res.Data.RealName), 0)
      if(!localStorage.getItem('itemData')){
        setCookie('schoolId', res.Data.MChildList[0].SchoolId, 0)
        setCookie('studentId', res.Data.MChildList[0].SelfId, 0)
        setCookie('classId', res.Data.MChildList[0].ClassId, 0)
        setCookie('gradeId', res.Data.MChildList[0].GradeId, 0)
        setCookie('img', res.Data.MChildList[0].Img, 0)
        state.cookiesObj = getCookiesObj(document.cookie)
        localStorage.setItem('mChildList', JSON.stringify(res.Data.MChildList))
      }
      // 路奇的逻辑
      state.headImg = res.Data.Img
      state.loginName = res.Data.LoginName
      state.childList = res.Data.MChildList
      state.parentId = res.Data.SelfId
      state.realName = res.Data.RealName
      state.loginUserId = res.Data.UserId
      
      for (var item of state.childList) {
        
        if (item.SelfId == getCookie('studentId')) {
          state.classId = item.ClassId
          state.className = item.ClassName
          state.gradeId = item.GradeId
          state.gradeName = item.GradeName
          state.schoolId = item.SchoolId
          state.schoolName = item.SchoolName
          state.studentName = item.RealName
          state.studentId = getCookie('studentId')
          state.studentImg = item.Img
          state.isMain = false
        }
      }

    },
    teacherHandle ({ state, dispatch }, res) {
      
        // 陈勇的逻辑
        setCookie('img', res.Data.Img, 0)
        setCookie('loginUserId', res.Data.UserId, 0)
        setCookie('teacherId', res.Data.SelfId, 0)
        setCookie('realName', encodeURI(res.Data.RealName), 0)
        setCookie('schoolId', res.Data.SchoolId, 0)
        setCookie('loginName', res.Data.LoginName, 0)

        if(!res.Data.ClassInfoList || res.Data.ClassInfoList.length == 0){ 
            state.isNoClass = true
        }

        if (!localStorage.getItem('itemDataTeacher')) {
          if (res.Data.ClassInfoList.length > 0) {
            setCookie('classId', res.Data.ClassInfoList[0].ClassId, 0)
            setCookie('gradeId', res.Data.ClassInfoList[0].GradeId, 0)
          }
        }

        state.cookiesObj = getCookiesObj(document.cookie)

        // 路奇的逻辑
        state.headImg = res.Data.Img
        state.classList = res.Data.ClassInfoList ? res.Data.ClassInfoList : []
        state.teacherId = res.Data.SelfId
        state.realName = res.Data.RealName
        state.schoolId = res.Data.SchoolId
        state.loginUserId = res.Data.UserId
    },

    getTeacher ({ state }) {
      return new Promise((resolve, reject) => {
        getTeacher(getCookie('teacherId')).then(res => {
          res = JSON.parse(res)
          res = JSON.parse(res)
          var list = res.data
          for (var item of list) {
            var isHave = false
            for (var i = 0; i < state.classList.length; i++) {
              if (state.classList[i].ClassId == item.Id) {
                state.classList[i].isMain = true
                state.classList[i].IsMain = true
                state.classList[i].parentName = '班主任'
                isHave = true
              }
            }
            if (!isHave) {
              state.classList.push({
                ClassId: item.Id,
                ClassName: item.Name,
                GradeId: item.GradeId,
                GradeName: item.GradeName,
                SchoolId: item.SchoolId,
                SchoolName: item.SchoolName,
                IsMain: true,
                isMain: true,
                parentName : '班主任'
              })
            }

          }

          for (var item of state.classList) {
            if (item.ClassId == getCookie('classId')) {
              state.classId = item.ClassId
              state.className = item.ClassName
              state.gradeId = item.GradeId
              state.gradeName = item.GradeName
              state.schoolName = item.SchoolName,
                state.isMain = item.IsMain
            }
          }

          localStorage.setItem('classInfoList', JSON.stringify(state.classList))
          resolve()
        })
      })
    },

    getRoleList ({ state }) {
      var params = {
        userId: getCookie('loginUserId')
      }
      getRoleList(params).then(
        res => {
          res = JSON.parse(res)
          console.log(res)
          if (res.Code == 200) {
            var roles = res.Data.data.roles
            roles.forEach(item => {
              if (item.code == 'SchoolAdmin') {
                state.isSchoolAdmin = true
              }
            })
          }
        }
      )
    }
  }
}
export default user

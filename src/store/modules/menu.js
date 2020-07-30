import {getUrlList, getReadData, getTokenByMoblie, getNewsList, getUrlListV3, checkUser, getChargeAndPackage, 
  addOrder, getOrderMaturityTime, checkLevel, getReadDataSos, getClassRoomTeacherByTeacherId, getYqCode, openidDel,continueToPay,addPoint,
  getHomeWorkUnread,getNoticeUnread, writeModularLog, getFlowCount} from '@/api/menuApi'

import {getCookiesObj, setCookie, checkArr, unique, getCookie} from '@/util/tool'
import Vue from 'vue'
import router from '@/router'
const menu = {
    namespaced: true,
    state: {
        userData:{},
       cookieStr: '',
        cookieStart: {},
        cookiesObj: {},
        isNoClass: false
    },
    getters: {
    },
    mutations: {
        SET_USERINFO(state,params){
            state.userData = params
        },
        GET_COOKIE (state, params) {
          if (document.cookie != '') {
            state.cookiesObj = getCookiesObj(document.cookie)
          }
        }
    },
    actions: {
        GetUrlList ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getUrlList(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetReadData ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getReadData(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetTokenByMoblie ({state, commit, dispatch}, params) {
            
            return new Promise((resolve, reject) => {
           
              state.cookieStart = getCookiesObj(document.cookie)
              setCookie('isNewLoad', true, 0)



                getTokenByMoblie().then(res => {
                  var result = JSON.parse(res)
                  console.log(result)
                  if (result.Code == 200) {
                    if(state.cookieStart.roleCode == 'Parent'){
                      // if(result.Data&&result.Data.MChildList&&result.Data.MChildList.length == 0){
                      //   setCookie('img', result.Data.Img, 0)
                      //   setCookie('loginUserId', result.Data.UserId, 0)
                      //   setCookie('parentId', result.Data.SelfId, 0)
                      //   setCookie('realName', encodeURI(result.Data.RealName), 0)
                      //   location.href = 'http://mappv2.xueerqin.net/App/PersonalInfo/PersonalInfo.shtml'
                      //   return
                      // }
                      // if(result.Data == null){
                      //   alert('无关联孩子');
                      //   var params = {
                      //     openId:getCookie("OpenId")
                      //   }
                      //   dispatch("OpenidDel",params).then(res => {
                      //     document.cookie = ''
                      //     window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8a1dedca1e981275&redirect_uri=http%3A%2F%2Fmappv2.xueerqin.net%2FCommon%2FLogin.shtml&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect'
                      //     // router.push('/index-master')
                      //     return
                      //   })
                      // }
                    }else{
                      // console.log(result.Data)
                      if(!result.Data){
                        alert('您暂未设置教师信息，请联系管理员设置教师信息')
                        // location.href = 'http://mappv2.xueerqin.net/Common/Choose.shtml'
                        return
                      }
                      if(!result.Data || !result.Data.ClassInfoList || result.Data.ClassInfoList.length == 0){
                        // alert('无关联班级');
                        var params = {
                          openId:getCookie("OpenId")
                        }
                        if (result.Data) {
                          // console.log(result.Data)
                          setCookie('img', result.Data.Img, 0)
                          setCookie('loginUserId', result.Data.UserId, 0)
                          setCookie('teacherId', result.Data.SelfId, 0)
                          setCookie('realName', encodeURI(result.Data.RealName), 0)
                          setCookie('schoolId', result.Data.SchoolId, 0)
                          setCookie('loginName', result.Data.LoginName, 0)
                        }
                        // router.push('/index-master')
                        // resolve(res)
                        // return
                        state.isNoClass = true
                        // dispatch("OpenidDel",params).then(res => {
                        //   document.cookie = ''
                        //   // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8a1dedca1e981275&redirect_uri=http%3A%2F%2Fmappv2.xueerqin.net%2FCommon%2FLogin.shtml&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect'
                          
                        // })
                      }
                    }
                    
                    if (result.Data && result.Data.MChildList) {
                      if(localStorage.getItem('itemData') == null&&result.Data) {
                        var strData = result.Data
                        // setCookie('img', strData.Img, 0)
                        setCookie('loginUserId', strData.UserId, 0)
                        setCookie('parentId', strData.SelfId, 0)
                        setCookie('realName', encodeURI(strData.RealName), 0)
                        setCookie('schoolId', strData.MChildList[0].SchoolId, 0)
                        setCookie('studentId', strData.MChildList[0].SelfId, 0)
                        setCookie('classId', strData.MChildList[0].ClassId, 0)
                        setCookie('gradeId', strData.MChildList[0].GradeId, 0)
                        setCookie('img', strData.MChildList[0].Img, 0)
                        state.cookiesObj = getCookiesObj(document.cookie)
                        localStorage.setItem('mChildList', JSON.stringify(strData.MChildList))
                      }
                    } else {
                      if (localStorage.getItem('itemDataTeacher') == null&&result.Data) {
                        var strData = result.Data
                        // console.log(strData)
                        setCookie('img', strData.Img, 0)
                        setCookie('loginUserId', strData.UserId, 0)
                        setCookie('teacherId', strData.SelfId, 0)
                        setCookie('realName', encodeURI(strData.RealName), 0)
                        // setCookie('studentId', strData.ClassInfoList[0].SelfId, 0)
                        setCookie('schoolId', strData.SchoolId, 0)
                        if (strData.ClassInfoList.length > 0) {
                          setCookie('classId', strData.ClassInfoList[0].ClassId, 0)
                          setCookie('gradeId', strData.ClassInfoList[0].GradeId, 0)
                        }
                        state.cookiesObj =getCookiesObj(document.cookie)
                        var params = {
                          teacherId: strData.SelfId
                        }
                        // Vue.$vux.loading.show({
                        //   text: '加载中'
                        // })
                        dispatch("GetClassRoomTeacherByTeacherId",params).then(res => {
                          // console.log(JSON.parse(res)=='')
                          if(JSON.parse(res)!=''){
                            // Vue.$vux.loading.hide()
                            var result = JSON.parse(JSON.parse(res))
                            // console.log(result)
                            if(result.status == 200){
                              var strArr = strData.ClassInfoList
                              var dataArr = result.data
                              for(var i=0;i<dataArr.length;i++){
                                dataArr[i].parentName = '班主任'
                                dataArr[i].ClassId = dataArr[i].Id
                                dataArr[i].ClassName = dataArr[i].Name
                                var index = checkArr(strArr, dataArr[i])
                                if(index==-1){
                                  strArr.push(dataArr[i])
                                }else{
                                  strArr[index].parentName = '班主任'
                                }
                              }
                              // console.log(strArr)
                              localStorage.setItem('classInfoList', JSON.stringify(strArr))
                            }
                          }else{
                            localStorage.setItem('classInfoList', JSON.stringify(strData.ClassInfoList))
                          }
                        })
                      }
                    }
                  }
                  resolve(res)
                }).catch(error => {
                  reject(error)
                })
            })
        },
        
        GetNewsList ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getNewsList(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetUrlListV3 ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              getUrlListV3(params).then(res => {
                    resolve(res)
                })
            })
        },
        CheckUser ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              checkUser(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetChargeAndPackage ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              getChargeAndPackage(params).then(res => {
                    resolve(res)
                })
            })
        },
        AddOrder ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              addOrder(params).then(res => {
                    resolve(res)
                })
            })
        },
        ContinueToPay ({state, commit, dispatch}, params) {
          return new Promise((resolve, reject) => {
            continueToPay(params).then(res => {
                  resolve(res)
              })
          })
        },
        GetOrderMaturityTime ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              getOrderMaturityTime(params).then(res => {
                    resolve(res)
                })
            })
        },
        CheckLevel ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              checkLevel(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetReadDataSos ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              getReadDataSos(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetClassRoomTeacherByTeacherId ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              getClassRoomTeacherByTeacherId(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetYqCode ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              getYqCode(params).then(res => {
                    resolve(res)
                })
            })
        },
        OpenidDel ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              openidDel(params).then(res => {
                    resolve(res)
                })
            })
        },
        AddPoint ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              addPoint(params).then(res => {
                    resolve(res)
                })
            })
        },
        getHomeWorkUnread({state, commit, dispatch}, params){
          return new Promise((resolve,reject) => {  
            getHomeWorkUnread(params).then(res => {
              resolve(res)
            })
          })
        },
        getNoticeUnread({state, commit, dispatch}, params){
          return new Promise((resolve,reject) => {
            getNoticeUnread(params).then(res => {
              resolve(res)
            })
          })
        },
        WriteModularLog({state, commit, dispatch}, params){
          return new Promise((resolve,reject) => {
            writeModularLog(params).then(res => {
              resolve(res)
            })
            // resolve('')
          })
        },
        getFlowCount({state}, params){
          return new Promise((resolve, reject) => {
            getFlowCount(params).then(res => {
              resolve(res)
            })
          })
        },

        toUrl ({state}, url) {
          var index =  url.indexOf('m.xueerqin.net/study/index.html')
          if (index != -1) {
            var hash = url.split('#')[1]
            if (/^\//.test(hash)) {
              router.push(hash)
            } else {
              router.push("/" + hash)
            }
          }else {
            location.href = url
          }
        }
    }
}
export default menu

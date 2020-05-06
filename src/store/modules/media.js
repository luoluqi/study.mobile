import Vue from 'vue'
import store from '@/store'
import {getTeacher,uploadWechatImg} from '@/api/commonApi'

const media = {
    namespaced: true,
    state: {
        access_token: '',
        voices: [],
        voiceServerIds: [],
        serverIds:[],
        imgData:[],
        video: [],
        timeList: [],
        link: [],
        files: [],
        filesName: [],
        filesObj: [],
        showModel: true,
        imgageResolve: null,
        voiceResolve: null,
        uploadError:true
    },
    getters: {
       
    },
    mutations: {
        changeModel (state, flag) {
            state.showModel = flag
        },
        clear (state) {
            state.voices = []
            state.voiceServerIds = []
            state.serverIds = []
            state.imgData = []
            state.video = []
            state.link = []
            state.timeList = []
            state.files = []
            state.filesName = []
            state.filesObj = []
        },
      addVoice (state, voice) {
        state.voices.push(voice)
      },
      delVoice (state, i) {
        state.voices.splice(i,1)
      },
      delImg (state, i) {
          state.imgData.splice(i,1)
      },
      addVideo (state, v) {
        state.video.push(v)
      },
      delVideo (state, index) {
        state.video.splice(index,1)
      },
      addLink (state, link) {
        state.link.push(link)
      },
      delLink (state, index) {
        state.link.splice(index,1)
      },
      addFile (state, v) {
        state.files.push(v)
      },
      addFileObj (state, obj) {
        state.filesObj.push(obj)
      },
      addFileName (state, name) {
        state.filesName.push(name)
      },
      delFile (state, index) {
        state.files.splice(index,1)
        state.filesObj.splice(index,1)
      },
      delFileName (state, index) {
        state.filesName.splice(index,1)
      },
      addTime (state, time) {
        state.timeList.push(time)
      },
      delTime (state, index) {
          state.timeList.splice(index, 1)
      }
    },
    actions: { 
        // 选择图片
        chooseImage({state,rootGetters,dispatch}){
            return new Promise((resolve, reject) => {
                
                wx.chooseImage({
                    count: 9 - state.imgData.length, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: (res) => {
                        
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        console.log('chooseImage success:::',localIds)
                        state.imgData = state.imgData.concat(localIds)  

                        resolve()
                    }
                });
            })
           
        },
        // 启动上传图片
        startUploadImage ({state,rootGetters,dispatch}) {
            return new Promise((resolve, reject) => {
                if (state.imgData.length == 0) {
                    resolve()
                    return
                }
                state.imgageResolve = resolve
             
                dispatch('uploadImage', [].concat(state.imgData))
            })
        },
        // 递归一张一张的将图片上传到微信
        uploadImage({state,rootGetters,dispatch}, localIds){
            var localId = localIds.shift();
            wx.uploadImage({
                localId: localId,
                isShowProgressTips: 0,
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                    //其他对serverId做处理的代码
                    state.serverIds.push(serverId)
                    if(localIds.length > 0){
                        dispatch('uploadImage', localIds)
                    }else{
                        state.imgageResolve()
                    }
                }
            })
        },
        // 从微信下载图片到自己的服务器
        uploadServeId({state,rootGetters,rootState,dispatch}){
            return new Promise((rslv, rjct) => {
                var schoolId = rootGetters['user/schoolId']
                console.log(schoolId)
                store.dispatch('user/getAccessToken').then(access_token => {
                    console.log(access_token)
                    state.access_token = access_token
                    var proArr = []
                    for(let i = 0;i<state.serverIds.length;i++){
                        var promise = new Promise((resolve,reject) => {
                            uploadWechatImg({
                                schoolId:schoolId,
                                access_token:access_token,
                                media_id:state.serverIds[i]
                            }).then(res => {
                                if(res.data){
                                    // state.imgData[i] = res.data
                                    state.imgData.splice(i, 1, res.data)
                                }else{
                                    res.media_id = state.serverIds[i]
                                    // alert(JSON.stringify(res))
                                    // Vue.$vux.toast.text('图片上传失败')
                                    state.uploadError = true
                                    // state.imgData[i] = rootState.user.testImg   
                                    state.imgData.splice(i, 1, rootState.user.testImg)
                                }
                                resolve()
                            })
                        })
                        proArr.push(promise)
                    }
                    Promise.all(proArr).then(() => {
                        rslv()
                    })
                })
            })
        },
        // 启动上传录音
        startUploadVoice ({state,rootGetters,dispatch}) {
            return new Promise((resolve, reject) => {
                if (state.voices.length == 0) {
                    resolve()
                    return
                }
                state.voiceResolve = resolve
             
                dispatch('uploadVoice', [].concat(state.voices))
            })
        },
        // 递归一个一个的将录音上传到微信
        uploadVoice({state,rootGetters,dispatch}, localIds){
            var localId = localIds.shift();
            wx.uploadVoice({
                localId: localId,
                isShowProgressTips: 0,
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                    //其他对serverId做处理的代码
                    state.voiceServerIds.push(serverId)
                    if(localIds.length > 0){
                        dispatch('uploadVoice', localIds)
                    }else{
                        state.voiceResolve()
                    }
                }
            })
        },
        // 从微信下载录音到自己的服务器
        uploadVoiceServeId({state,rootGetters,dispatch}){
            return new Promise((rslv, rjct) => {
                var schoolId = rootGetters['user/schoolId']
                console.log(schoolId)
                store.dispatch('user/getAccessToken').then(access_token => {
                    console.log(access_token)
                    state.access_token = access_token
                    var proArr = []
                    for(let i = 0;i<state.voiceServerIds.length;i++){
                        var promise = new Promise((resolve,reject) => {
                            uploadWechatImg({
                                schoolId:schoolId,
                                access_token:access_token,
                                media_id:state.voiceServerIds[i]
                            }).then(res => {
                            
                                if(res.data){
                                    state.voices[i] = res.data
                                }else{
                                    // alert(JSON.stringify(res))
                                    Vue.$vux.toast.text('录音上传失败')
                                    state.uploadError = true
                                }
                                
                                resolve()
                            })
                        })
                        proArr.push(promise)
                    }
                    Promise.all(proArr).then(() => {
                        rslv()
                    })
                })
            })
        },
        upload ({state,rootGetters,dispatch}) {
            // startUploadImage
            // uploadServeId
            // startUploadVoice
            // uploadVoiceServeId
            return new Promise((resolve, reject) => {
                dispatch('startUploadImage').then(() => {
                    console.log(1)
                    return dispatch('uploadServeId')
                }).then(() => {
                    console.log(2)
                    return dispatch('startUploadVoice')
                }).then(() => {
                    console.log(3)
                    return dispatch('uploadVoiceServeId')
                }).then(() => {
                    console.log(4)
                    resolve()
                })
            })
        },
        uploadImg ({state,rootGetters,dispatch}) {
            // startUploadImage
            // uploadServeId
            // startUploadVoice
            // uploadVoiceServeId
            return new Promise((resolve, reject) => {
                dispatch('startUploadImage').then(() => {
                    console.log(1)
                    return dispatch('uploadServeId')
                }).then(() => {
                    console.log(4)
                    resolve()
                })
            })
        }
    }
}
export default media

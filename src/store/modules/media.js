import Vue from 'vue'
import store from '@/store'
import {getTeacher,uploadWechatImg} from '@/api/commonApi'

const media = {
    namespaced: true,
    state: {
        access_token: '',
        voices: [],
        voicesSource: [],
        voiceServerIds: [],
        serverIds:[],
        imgData:[],
        imgDataSource: [],
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

            state.voicesSource = []
            state.imgDataSource = []
        },
      addVoice (state, voice) {
        state.voicesSource.push(voice)
      },
      delVoice (state, i) {
        state.voicesSource.splice(i,1)
      },
      delImg (state, i) {
          state.imgDataSource.splice(i,1)
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
        chooseImage({state,rootGetters,dispatch}, num){
            var count = 0
            if (typeof num == 'number') {
                count = num
            } else {
                count = 9 - state.imgDataSource.length
            }
         
            return new Promise((resolve, reject) => {
                
                wx.chooseImage({
                    count: count, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: (res) => {
                        
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        console.log('chooseImage success:::',localIds)
                        state.imgDataSource = state.imgDataSource.concat(localIds)  

                        resolve()
                    }
                });
            })
           
        },
        // 启动上传图片
        async startUploadImage ({state,rootGetters,dispatch}) {
            return new Promise(async (resolve, reject) => {
                if (state.imgDataSource.length == 0) {
                    resolve()
                    return
                }
                
                state.serverIds = []
                for (let item of state.imgDataSource) {
                    await dispatch('uploadImage', item)
                }
             
                resolve()
            })
        },
        // 将图片上传到微信
        uploadImage({state,rootGetters,dispatch}, localId){
         
            return new Promise((resolve, reject) => {
                wx.uploadImage({
                    localId: localId,
                    isShowProgressTips: 0,
                    success: function (res) {
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        //其他对serverId做处理的代码
                        state.serverIds.push(serverId)
                        resolve()
                    }
                })
            })
            
        },
        // 从微信下载图片到自己的服务器
        async uploadServeId({state,rootGetters,rootState,dispatch}){
            return new Promise(async (rslv, rjct) => {
                var schoolId = rootGetters['user/schoolId']
                console.log(schoolId)
                var access_token = await store.dispatch('user/getAccessToken')
                
                console.log(access_token)
                state.access_token = access_token
              
                for(let i = 0;i<state.serverIds.length;i++){
                    
                        var res = await uploadWechatImg({
                            schoolId:schoolId,
                            access_token:access_token,
                            media_id:state.serverIds[i]
                        })
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
                   
                }
                rslv()
            })
        },
        // 启动上传录音
        async startUploadVoice ({state,rootGetters,dispatch}) {
            return new Promise(async (resolve, reject) => {
                if (state.voicesSource.length == 0) {
                    resolve()
                    return
                }
                
                state.voiceServerIds = []
                for (let item of state.voicesSource) {
                   await dispatch('uploadVoice', item)
                }
                resolve()
                
            })
        },
        // 将录音上传到微信
        uploadVoice({state,rootGetters,dispatch}, localId){
           return new Promise((resolve, reject) => {
                wx.uploadVoice({
                    localId: localId,
                    isShowProgressTips: 0,
                    success: function (res) {
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        //其他对serverId做处理的代码
                        state.voiceServerIds.push(serverId)
                        resolve()
                    }
                })
           })
           
        },
        // 从微信下载录音到自己的服务器
        async uploadVoiceServeId({state,rootGetters,dispatch}){
            return new Promise(async (rslv, rjct) => {
                var schoolId = rootGetters['user/schoolId']
                console.log(schoolId)
                var access_token = await store.dispatch('user/getAccessToken')
                
                console.log(access_token)
                state.access_token = access_token
              
                for(let i = 0;i<state.voiceServerIds.length;i++){
                  
                    var res = await uploadWechatImg({
                        schoolId:schoolId,
                        access_token:access_token,
                        media_id:state.voiceServerIds[i]
                    })

                    if(res.data){
                        state.voices[i] = res.data
                    }else{
                        // alert(JSON.stringify(res))
                        Vue.$vux.toast.text('录音上传失败')
                        state.uploadError = true
                    }
                   
                   
                }
               
                rslv()
               
            })
        },
        async upload ({state,rootGetters,dispatch}) {

            return new Promise(async (resolve, reject) => {
                await dispatch('startUploadImage')
                await dispatch('uploadServeId')
                await dispatch('startUploadVoice')
                await dispatch('uploadVoiceServeId')

                
               
                resolve()
            })
        },
        async uploadImg ({state,rootGetters,dispatch}) {

            return new Promise(async (resolve, reject) => {
                await dispatch('startUploadImage')
                await dispatch('uploadServeId')



                resolve()
            })
        }
    }
}
export default media

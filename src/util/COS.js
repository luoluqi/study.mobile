import COS from 'cos-js-sdk-v5'
import Vue from 'vue'
import {appUrl} from '@/config/config'

const getCosTmpKey = (data) => {
    return new Promise((resolve, reject) => {
        Vue.$vux.loading.show({
			text: '加载中'
		})
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.responseText)
                Vue.$vux.loading.hide();
            } else {
               
            }
        } 
        var url = ''
        if (appUrl == 'http://tapp.xueerqin.net') {
            url = 'https://t-api.xueerqin.net/public-server-center/api/cos/getCosTmpKey?projectName=face&suffix=jpg'
        } else {
            url = 'https://api.xueerqin.net/public-server-center/api/cos/getCosTmpKey?projectName=face&suffix=jpg'
        }
        xhr.open('POST', url)
        xhr.send()
    })
}

export default{
    expiration: 0,
    init () {
        return new Promise((resolve, reject) => {
            var now = new Date().getTime()
            if (now < this.expiration) {
                resolve()
                return
            }
            getCosTmpKey().then(res => {
                res = JSON.parse(res).data
                this.SecretId = res.cosTmpKey.credentials.tmpSecretId
                this.SecretKey = res.cosTmpKey.credentials.tmpSecretKey
                this.XCosSecurityToken = res.cosTmpKey.credentials.sessionToken
                this.Bucket = res.bucketName
                this.Region = res.region
                this.Key = res.key
                this.expiration = res.cosTmpKey.expiration
                this.COS = new COS({
                    SecretId: this.SecretId,
                    SecretKey: this.SecretKey,
                    XCosSecurityToken: this.XCosSecurityToken
                })
                resolve()
            })
         })
    },
    putObject (file, progress) {
        return new Promise((resolve, reject) => {
            this.init().then(a => {
                Vue.$vux.loading.show({
                    text: '加载中'
                })
                var name = file.name
                var suffix = name.substring(name.lastIndexOf('.'))
                var now = new Date()
                var key = 'study/' + now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + '/' + (Math.random() + '').replace('.', '') + now.getTime() + suffix
                this.COS.putObject({
                    Bucket: this.Bucket, /* 必须 */
                    Region: this.Region, /* 存储桶所在地域，必须字段 */
                    Key: key, /* 必须 */
                    Body: file, // 上传文件对象
                    onProgress: function (progressData) {
                        console.log(progressData)
                        if (progress) {
                            progress(progressData)
                        }
                    }
                }, function (err, data) {
                    Vue.$vux.loading.hide();
                    console.log(err || data)
                    resolve('http://' + data.Location)
                })
            })
        })
    }
}

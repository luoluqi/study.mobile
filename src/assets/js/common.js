//自定义一个common.js
import Vue from 'vue'
export default function(Vue){
    //分割成数组
    Vue.prototype.setImgArr =function(imgs) {
        var imgArr = []
        imgs.forEach((item,index) => {
            var obj = {src: item, msrc: item}
            imgArr.push(obj)
        })
        return imgArr
    },
    Vue.prototype.setVoiceArr = function(voices) {
        var arr = []
        for (var item of voices) {
            var obj = {url: item, isPlay: false}
            arr.push(obj)
        }
        return arr
    },
    Vue.prototype.setFileArr = function(files) {
        var fileNameArr = []
        files.FileUrl.forEach(item => {
            var index = item.lastIndexOf(".")
            var suffix = item.substr(index+1)
            fileNameArr.push(suffix)
        })
        return fileNameArr
    }
  } 

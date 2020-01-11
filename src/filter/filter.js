import store from "@/store"
import Vue from 'vue'
Vue.filter('count', function (count) {
   if(!count){
       return 0
   }
   var arr = []
   while(true){
        var temp = count / 1000
        if(temp < 1){
            arr.unshift(count)
            break
        }else{
            var more = count % 1000
            arr.unshift(more)
            count = Math.floor(temp)
        }
   }
   return arr.join(',')
})
Vue.filter('imgUrl', function (value) {
    value = value.replace(/\\/g, '/')
   if (/^http/.test(value)) {
        return value
   } else {
        return 'http://' + value
   }
})


Vue.filter("offsetTime",function(date){
   
    var str = ''
    var now = new Date().getTime()
    date= date.replace(/-/g,"/")
    date= date.replace(/T/g," ")
    date = new Date(date).getTime()
    var offset = now - date
    offset = Math.floor(offset / 1000)
    if (offset < 3600) {
        str = Math.ceil(offset / 60) + '分钟前'
        return str
    }

    if (offset < 3600*24){
        str = Math.floor(offset /3600) + '小时前'
        return str
    }

    if(offset < 3600*24*30){
         str = Math.floor(offset / 3600 / 24) + '天前'
        return str
    }

     if(offset < 3600*24*30*12){
         str = Math.floor(offset / 3600 / 24 / 30) + '月前'
        return str
    }

     str = Math.floor(offset / 3600 / 24 / 30 /12) + '年前'
        return str
})

Vue.filter("channelType",function(id){
    
    var list = store.state.channelTypeList;

    var name = "";
    for(var item of list){
        if(item.channelTypeId == id){
            name = item.channelTypeName;
        }
    }
    if(name){
        return name;
    }else{
        return "其它";
    }
   
});


Vue.filter("getDay",function(str){
   var date = new Date(str);
   var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
   var day = date.getDay();
    return weeks[day];
});


Vue.filter('formatDateTime', function (value, formatStr) {
    var self;
    if (value) {
        if(typeof value == 'string'){
            value = value.replace(/T/g, ' '); //去掉T
            value = value.replace(/-/g, '/');
            value = value.replace(/\.\d+/, ' ');//去掉毫秒
            self = new Date(value)
        }else{
            self = value
        }
        
    }else{
        self = new Date()
        
    }
   
    var str = formatStr
    var Week = ['日', '一', '二', '三', '四', '五', '六']
    str = str.replace(/yyyy|YYYY/, self.getFullYear())
    str = str.replace(/yy|YY/, (self.getYear() % 100) > 9 ? (self.getYear() % 100).toString() : '0' + (self.getYear() % 100))
    str = str.replace(/MM/, self.getMonth() > 8 ? (self.getMonth() + 1).toString() : '0' + (self.getMonth() + 1))
    str = str.replace(/M/g, self.getMonth())
    str = str.replace(/w|W/g, Week[self.getDay()])
    str = str.replace(/dd|DD/, self.getDate() > 9 ? self.getDate().toString() : '0' + self.getDate())
    str = str.replace(/d|D/g, self.getDate())
    str = str.replace(/hh|HH/, self.getHours() > 9 ? self.getHours().toString() : '0' + self.getHours())
    str = str.replace(/h|H/g, self.getHours())
    str = str.replace(/mm/, self.getMinutes() > 9 ? self.getMinutes().toString() : '0' + self.getMinutes())
    str = str.replace(/m/g, self.getMinutes())
            str = str.replace(/ss|SS/, self.getSeconds() > 9 ? self.getSeconds().toString() : '0' + self.getSeconds())
            str = str.replace(/s|S/g, self.getSeconds())
            return str
          })

Vue.prototype.replaceUrl= function (str) {  

    var reg = new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]', 'g');


    var list = []

    var result = null
    do {
        result = reg.exec(str)
        result && list.push(result[0])
    } while (result)
    for(var i = 0;i<list.length;i++){
        var item = list[i]
        str = str.replace(item,'<a href="'+item+'">'+item+'</a>')
    }
    return str

};
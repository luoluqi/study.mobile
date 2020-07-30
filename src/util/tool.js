export function getCookiesObj (cookies) {
    var arr = cookies.split(";")
    var obj = {}
    for(var i=0;i<arr.length;i++){
        var newArr = arr[i].split("=")
        obj[newArr[0].trim()]=newArr[1]
    }
    return obj
} 

export function setCookie (name, value, expiresHours) {

  // delCookie(name)
  clearCookie(name, value, 1)


  var dateTime = new Date()
  var msTime = 240 * 3600 * 1000
  dateTime.setTime(dateTime.getTime() + msTime)
  var cookieString = name + "=" + value + ";domain=" + "xueerqin.net" + ";path=" + '/'
  if (expiresHours && expiresHours > 0) {
    var date = new Date()
    var ms = expiresHours * 3600 * 1000
    date.setTime(date.getTime() + ms)
    cookieString = cookieString + ";expires=" + date.toGMTString() + ";domain=" + "xueerqin.net"
  }
  document.cookie = cookieString
} 

function delCookie(name){

  console.log('delete cookie...', name)
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = "000";
  if(cval!=null)
  document.cookie= name + "="+cval+";expires="+exp.toUTCString();
}

function clearCookie(cname, cvalue, exdays) {
  var d = new Date();
  if (exdays && exdays > 0) {
    // d.setTime(d.getTime() + (exdays*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }else {
    document.cookie = cname + "=" + cvalue + ";path=/";
  }
 
} 

export function getCookie (name) {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split("; ")
  for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split("=")
      if (arr[0] == name) {
          return arr[1]
      }
  }
  return null
}

export function checkArr (arr, item) {
  var index = -1
  for (var i = 0; i < arr.length; i++) {
    if (item.Id == arr[i].ClassId) {
      index = i
    }
  }
  return index
}

// 数组去重
export function unique (arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i]) < 0) {
          newArr.push(arr[i])
      }
  }
  return newArr
}

export function toHanZi(data) {
  if (!data) {
      alert('请输入十六进制unicode')
      return
  }
  // 十六进制unicode 在（\\u 或 u 处）分隔 会直接转成汉字
  data = data.split("\\u");
     // var str ='';
     // for (var i = 0;i < data.length; i ++) {
        //  str += String.fromCharCode( parseInt(data[i],16));
     // }
  return data;
}

export function getQueryString(url){
  var search = location.search
    search = search.replace('?', '')
    var arr = search.split('&')
    var obj = {}
    for (var item of arr) {
        var list = item.split('=')
        obj[list[0]] = list[1]
    }
    return obj
}
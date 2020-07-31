var _ajax = $.ajax;
$.ajax = function(opt){
    //签名
    var sign = '3L7bfO3OBjucxpuVK+gO0g=='
  

    if(opt.headers){
        opt.headers.sign = sign
        opt['X-Requested-With'] = 'XMLHttpRequest'
       
    }else{
        opt.headers = {
            sign:sign,
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
    _ajax(opt)
}

var fytest = 'http://t-api.fytest.xueerqin.net'
var srv = 'http://srv.xueerqin.net'

function getParams() {
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
function getAccessToken (code) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: fytest + "/api/OAuthApi/GetAccessToken?code=" + code,
            success: function (data) {
                var d = JSON.parse(data).Data;
               
                resolve(d)
            }
        });
    })
}

function getUnionID (openid) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: fytest + "/api/OAuthApi/GetUnionID",
            data: {
                data: JSON.stringify({openid: openid}) 
            },
            success: function (res) {
                res = JSON.parse(res)
                resolve(res)
            }
        });
    })
}

function getUserInfo ({openid, unionid}){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: srv + "/public-api/api/Data/GetUserInfoByOpenId",
            data: {
                data: JSON.stringify({"loginType":101,"openId":openid,"unionId": unionid})
            },
            success: function (res) {
              
                resolve(res)
            }
        });
    })
}

function loginUser ({loginName, loginPwd, openId, unionId}) {
    return new Promise((resolve, reject) => {
        var params = {loginName, loginPwd, openId, unionId}
        $.ajax({
            url: srv + "/apiV2-stucard/Api/MOAuth/GetLoginResultV2",
            data: {
                data: JSON.stringify(params)
            },
            success: function (res) {
                res = JSON.parse(res)
                resolve(res)
            }
        });
    })
}

async function submitLogin() {
    var layerIndex = layer.open({type: 2, shadeClose: false});
    var loginName = $.trim($('#loginName').val())
    var loginPwd = $.trim($('#loginPwd').val())
    var openId = $.cookie('OpenId')
    var unionId = $.cookie('unionID')
    var res = await loginUser({loginName, loginPwd, openId, unionId})

    layer.close(layerIndex);

    var result = res.Data
    if (result.message == "ok") {
        localStorage.clear();
       
        var roleCount = 0;
        if (result.data != null && result.data != "") {
            roleCount = result.data.length;
        } else {
            alert("这个账号角色不是老师或者家长,登录失败")
           
         
            return;
        }
        if (roleCount == 0) {
            alert("这个账号角色不是老师或者家长,登录失败")
           
            return;
        }
       

        $.cookie('authToken', JSON.stringify(result.oAuth), {
            path: '/',
            domain: '.xueerqin.net',
            expires: 100
        })

        $.cookie('loginName', loginName, { expires: 100, path: '/', domain: 'xueerqin.net' })
        $.cookie('cellPhoneNum', loginName, { expires: 100, path: '/', domain: 'xueerqin.net' })

        var url = location.origin + location.pathname
        if (roleCount > 1) {
            $.cookie('isMoreRole', true, { expires: 100, path: '/', domain: 'xueerqin.net' })
            location.href = url.replace('static/login.html', 'index.html#/role')
        }
        else {
            $.cookie('isMoreRole', false, { expires: 100, path: '/', domain: 'xueerqin.net' })
           
           
           
            var role = result.data[0].Code;
            $.cookie('roleCode', role, { expires: 100, path: '/', domain: 'xueerqin.net' })
          
            location.href =url.replace('static/login.html', 'index.html#/menu/index')
        }
    }
    else if (result.message == "wrongPwd") {
        alert("密码错误");
    }
    else if (result.message == "invalidUser") {
        alert("用户不存在");
    }
    else if (result.message == "disable") {
        alert("用户被禁用");
    }
    else if (result.message == "userBinded") {
        alert("账号已经被登录");
    }
    else if (result.message == "wechatBinded") {
        alert("账号已经被微信绑定登录");
    }
    else if (result.message == "noteacher") {
        alert("您尚未录入教职工信息，请联系管理员添加。");
    }
    else if (result.message == "noparent") {
        alert("您尚未录入家长信息，请联系管理员添加。");
    }
    else if (result.message == "noteacherandparent") {
        alert("您尚未录入教职工和家长信息，请联系管理员添加。");
    }
    else {
        alert("异常错误");
    }
}

async function start(){
    var layerIndex = layer.open({type: 2, shadeClose: false});
    var openid = $.cookie('OpenId')
    var unionid = $.cookie('unionID')
    if (!openid || openid == "null") {
        var code = getParams().code
        if (!code) {
            var url = location.origin + location.pathname
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8a1dedca1e981275&redirect_uri='+url+'&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect'
            return
        }
        
        var res = await getAccessToken(code)
        if (!res.openid) {
            location.href = location.origin + location.pathname
        }
        
        openid = res.openid
    }
    
    $.cookie('OpenId', openid, { expires: 100, path: '/', domain: 'xueerqin.net' });
    if (!unionid || unionid == "null") {
        var res = await getUnionID(openid)
        unionid = res.unionid
    }
    $.cookie('unionID', unionid, { expires: 100, path: '/', domain: 'xueerqin.net' });
    res = await getUserInfo({openid, unionid})
    
    // "{"Code":"200","Msg":"","Data":{"roleCount":2,"Loginname":"13459486768","parentId":"9b4f723d94dc4a3f804ce9c667766993"}}"
    if (!res) {
        layer.close(layerIndex);
        return
    }
    res = JSON.parse(res)
    var userData = res.Data
    if (res.Code == '600') {
        $.cookie('isNewLoad', true, { expires: 100, path: '/', domain: 'xueerqin.net' });
        layer.close(layerIndex);
        return
    }
    if (res.Code == '200') {
        var roleCount = userData.roleCount;
        var roleCode = userData.roleCode;
        
        $.cookie("loginName", userData.Loginname, { expires: 100, path: '/', domain: 'xueerqin.net' });
        $.cookie("cellPhoneNum", userData.Loginname, { expires: 100, path: '/', domain: 'xueerqin.net' });
        
        var url = location.origin + location.pathname
        $.cookie('isMoreRole', true, { expires: 100, path: '/', domain: 'xueerqin.net' })
        location.href = url.replace('static/login.html', 'index.html#/role')

        // if (roleCount >= 2) {
           
        //     $.cookie('isMoreRole', true, { expires: 100, path: '/', domain: 'xueerqin.net' })
        //     location.href = url.replace('static/login.html', 'index.html#/role')
        // }
        // else if (roleCount == 1) {
        //     $.cookie('isMoreRole', false, { expires: 100, path: '/', domain: 'xueerqin.net' })
        //     $.cookie('roleCode', roleCode, { expires: 100, path: '/', domain: 'xueerqin.net' })
        //     location.href =url.replace('static/login.html', 'index.html#/menu/index')
           
        // }
    }
    layer.close(layerIndex);
}

start()
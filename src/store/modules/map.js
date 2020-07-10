import Vue from 'vue'
import GPS from '@/util/gps'
import {getLastGPS, refreshGPS} from '@/api/mapApi'
const map = {
    namespaced: true,
    state: { 
        map: null,
        placeSearch: null,
        searchText: '',
        mouseTool: null,
        overlays: [],
        isDrawCircle: false,
        isDrawPolygon: false,
        trackMarker: null,
        trackText: null,
        childMarker: null,
        childText: null,
        childCircle: null,
        myMarker: null,
        myText: null,
        locationing: false,
        locationCount: 0,
        createTime: ''
    },
    getters: {
      
    },
    mutations: { 
        
    },
    actions: {  
        addMarker({state,dispatch}, {img, width, height, lng, lat, anchor, content}){
            return new Promise((resolve, reject) => {
                var icon = new AMap.Icon({
                    size: new AMap.Size(width, height),    // 图标尺寸
                    image: img,  // Icon的图像
                     imageSize: new AMap.Size(width, height) 
                });
      
                // 将 Icon 实例添加到 marker 上:
                var marker = new AMap.Marker({
                  
                    position: new AMap.LngLat(lng, lat),
                     offset: new AMap.Pixel(0,0), // 设置点标记偏移量
                    anchor:anchor, // 设置锚点方位
                    icon: icon, // 添加 Icon 实例
                  
                });
   
      
                state.map.add(marker);
                resolve(marker)
            })
            
         },
         addText({state,dispatch}, {lng, lat, content}){
             return new Promise((resolve, reject) => {
                var text = new AMap.Text({
                    text: content,
                    anchor:'top-center', // 设置文本标记锚点
                    draggable:true,
                    cursor:'pointer',
                    angle:0,
                    offset: new AMap.Pixel(0,20),
                    style:{
                        'background-color': 'white',
                        'width':'6rem',
                        'border-width': 0,
                        'box-shadow': '0 2px 6px 0 rgba(0, 0, 0, .5)',
                        'text-align': 'center',
                        'font-size': '0.28rem',
                        'word-break': 'break-all',
                        'white-space': 'normal'
                    },
                    position: [lng, lat]
                });
            
                text.setMap(state.map);
                resolve(text)
             })
            
         },
         myMarker({state,dispatch}, {lng, lat, content}){
             if (state.myMarker){
                 state.map.remove(state.myMarker)
             }
             if(state.myText){
                 state.map.remove(state.myText)
             }
            dispatch('addMarker', {
                img: 'static/img/map/location.png',
                width: 23,
                height: 31,
                lng: lng,
                lat: lat,
                anchor: 'center'
            }).then(res => {
                state.myMarker = res
            })

            dispatch('addText', {
               content: content,
                lng: lng,
                lat: lat 
            }).then(res => {
                state.myText = res
            })

        },
        childMarker({state,dispatch}, {lng, lat, content}){
            if (state.childCircle){
                state.map.remove(state.childCircle)
            }
            if (state.childText){
                state.map.remove(state.childText)
            }
            if (state.childMarker){
                state.map.remove(state.childMarker)
            }
            dispatch('addMarker', {
                img: 'static/img/map/dot.png',
                width: 30,
                height: 30,
                lng: lng,
                lat: lat,
                anchor: 'center'
            }).then(res => {
                state.childCircle = res
            })
           
            dispatch('addText', {
                content: '' + content,
                 lng: lng,
                 lat: lat 
             }).then(res => {
                 state.childText = res
             })
            dispatch('addMarker', {
                img: 'static/img/map/head.png',
                width: 66,
                height: 71,
                lng: lng,
                lat: lat,
                anchor: 'bottom-center'
            }).then(res => {
                state.childMarker = res
            })
        },
        drawTrack({state,dispatch},{path, type}){
            state.map.clearMap()
            var pathParam = path.map((obj, index) => {
                
                var tm
                if (index == 0) {
                    tm = new Date(obj.createTime).getTime() / 1000
                } else {
                    tm = new Date(obj.createTime).getTime() - new Date(path[0].createTime).getTime()
                    tm = Math.ceil(tm / 1000 / 60)
                }
                return  {
                    x: obj.lng,
                    y: obj.lat,
                    lng: obj.lng,
                    lat: obj.lat,
                    sp:10,
                    ag:0, 
                    tm:tm
                }
            })

            
            dispatch('drive', pathParam)
        },

        drive ({state, dispatch},arr) {
            
            AMap.plugin(['AMap.Driving'], () => {
                var start = [arr[0].lng, arr[0].lat]
                var end = [arr[arr.length - 1].lng, arr[arr.length - 1].lat]

                var list = []
               
                for (let i = 1; i < arr.length; i++) {
                  
                        list.push([arr[i].lng, arr[i].lat])
                   
                }
                let driving = new AMap.Driving({
                    hideMarkers: true,
                    map: state.map,
                    panel: "panel",
                    autoFitView: true,
                    showTraffic: false
                });
              
                driving.search(
                    start, 
                    end,
                    {
                        waypoints:list
                    }, 
                function(status, result) {
                    // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                    if (status === 'complete') {
                        console.log('绘制驾车路线完成')
                    } else {
                        console.log('获取驾车数据失败：' + result)
                    }
                  
                    var pathList = []
                    for (var s of result.routes[0].steps) {
                        pathList = pathList.concat(s.path)
                    }
                    console.log(pathList)

                  
                    
                    dispatch('addMarker', {
                        img: 'static/img/map/start.png',
                        width: 23,
                        height: 31,
                        lng: pathList[0].lng,
                        lat: pathList[0].lat,
                        anchor: 'bottom-center'
                    })
        
                    dispatch('addMarker', {
                        img: 'static/img/map/end.png',
                        width: 23,
                        height: 31,
                        lng: pathList[pathList.length -1].lng,
                        lat: pathList[pathList.length -1].lat,
                        anchor: 'bottom-center'
                    })

                    dispatch('addMarker', {
                        img: 'static/img/map/head.png',
                        width: 66,
                        height: 71,
                        lng: pathList[0].lng,
                        lat: pathList[0].lat,
                        anchor: 'bottom-center'
                    }).then(marker => {
                        marker.moveAlong(pathList, 200)
                    })

                      // pathList = pathList.map(obj => {
                    //     return [obj.lng, obj.lat]
                    // })

                    // var polyline = new AMap.Polyline({
                    //     path: pathList,
                    //     isOutline: true,
                    //     outlineColor: 'blue',
                    //     borderWeight: 0,
                    //     strokeColor: "#128FEF", 
                    //     strokeOpacity: 1,
                    //     strokeWeight: 3,
                    //     // 折线样式还支持 'dashed'
                    //     strokeStyle: "solid",
                    //     // strokeStyle是dashed时有效
                    //     strokeDasharray: [10, 5],
                    //     lineJoin: 'round',
                    //     lineCap: 'round',
                    //     zIndex: 50,
                    // })
                
                    // polyline.setMap(state.map)
                    // // 缩放地图到合适的视野级别
                    // state.map.setFitView([ polyline ])
                    
                   
                   
                });
            })
        },
       
        walking ({state, dispatch},arr) {
            AMap.plugin(['AMap.Walking'], () => {
                var list = []
                list.push(arr[0])
                for (let i = 1; i < arr.length; i++) {
                    if (i % 10 === 0) {
                        list.push(arr[i])
                    }
                }
                list.push(arr[arr.length - 1])
                
                for (let i = 0;i < list.length; i++) {
                    if (i >= list.length - 1) {
                        state.map.setFitView()
                        break
                    }
                    let start = [list[i].lng, list[i].lat]
                    let end = [list[i + 1].lng, list[i + 1].lat]
                    let walking = new AMap.Walking({
                        hideMarkers: true,
                        map: state.map,
                        panel: "panel",
                        autoFitView: false
                    });
                    walking.search(start, end, (status, result) => {
                      
                        if (status === 'complete') {
                            console.log('绘制步行路线完成')
                           
                        } else {
                            console.log('步行路线数据查询失败' + result)
                        } 
                    });
                }
            })
        },
       
        riding ({state}, arr) {
            AMap.plugin(['AMap.Riding'], () => {
                var list = []
                list.push(arr[0])
                for (let i = 1; i < arr.length; i++) {
                    if (i % 10 === 0) {
                        list.push(arr[i])
                    }
                }
                list.push(arr[arr.length - 1])
                
                for (let i = 0;i < list.length; i++) {
                    if (i >= list.length - 1) {
                        state.map.setFitView()
                        break
                    }
                    let start = [list[i].lng, list[i].lat]
                    let end = [list[i + 1].lng, list[i + 1].lat]
                    let riding = new AMap.Riding({
                        hideMarkers: true,
                        map: state.map,
                        panel: "panel",
                        autoFitView: false
                    });
                    riding.search(start, end, (status, result) => {
                    
                        if (status === 'complete') {
                            console.log('绘制骑行路线完成')
                        
                        } else {
                            console.log('骑行路线数据查询失败' + result)
                        } 
                    });
                }
            })
        },
        addTrackMarker({state,dispatch},{lng, lat, content}){
            if(state.trackMarker){
                state.map.remove(state.trackMarker)
            }
            if(state.trackMarker){
                state.map.remove(state.trackText)
            }

            dispatch('addMarker', {
                img: 'static/img/map/track-dot.png',
                width: 23,
                height: 31,
                lng: lng,
                lat: lat,
                anchor: 'bottom-center'
            }).then(res => {
                state.trackMarker = res
                state.map.setFitView(state.trackMarker)
            })

            dispatch('addText', {
                content: content,
                 lng: lng,
                 lat: lat 
             }).then(res => {
                 state.trackText = res
             })

        },
        drawCircle({state, dispatch}, {lng, lat}){
            state.isDrawCircle = false
            var circle = new AMap.Circle({
                center: [lng, lat],
                radius: 200, //半径
                borderWeight: 3,
                strokeColor: "#FF33FF", 
                strokeOpacity: 1,
                strokeWeight: 0,
                strokeOpacity: 0.2,
                fillOpacity: 0.4,
                strokeStyle: 'dashed',
                strokeDasharray: [10, 10], 
                // 线样式还支持 'dashed'
                fillColor: '#128FEF',
                zIndex: 50,
            })
        
            circle.setMap(state.map)

            state.overlays.push(circle)
            // 缩放地图到合适的视野级别
            state.map.setFitView([ circle ])


            AMap.plugin(['AMap.CircleEditor'], () => {
                var circleEditor = new AMap.CircleEditor(state.map, circle)
                circleEditor.open()
            
                circleEditor.on('move', function(event) {
                    console.log('触发事件：move')
                })
            
                circleEditor.on('adjust', function(event) {
                    console.log('触发事件：adjust')
                })
            
                circleEditor.on('end', function(event) {
                    console.log('触发事件： end')
                    // event.target 即为编辑后的圆形对象
                })
                
            });
        },
        drawPolygon({state, dispatch}){
            if(state.mouseTool){
                state.mouseTool.close()
            }
           

            AMap.plugin(['AMap.MouseTool', 'AMap.PolyEditor'],function(){
                state.mouseTool = new AMap.MouseTool(state.map)
                state.mouseTool.on('draw',function(e){
                    console.log(e.obj)
                    console.log(e.obj.getPath())
                    state.overlays.push(e.obj)
    
    
                    state.isDrawPolygon =  false
                    state.mouseTool.close()
    
                    var polyEditor = new AMap.PolyEditor(state.map, e.obj)
                    polyEditor.open()
    
                    polyEditor.on('addnode', function(event) {
                        console.log('触发事件：addnode')
                    })
                
                    polyEditor.on('adjust', function(event) {
                        console.log('触发事件：adjust')
                    })
                
                    polyEditor.on('removenode', function(event) {
                        console.log('触发事件：removenode')
                    })
                }) 
                
                state.mouseTool.polygon({
                    fillColor:'#128FEF',
                    strokeColor:'#80d8ff'
                    //同Circle的Option设置
                })
            })

            
        },
        drawFence({state, dispatch}, data){
            for (var item of data) {
                if (item.fenceType == 10) {
                    var center = item.pointInfo
                    var arr = center.split(',')
                    var lng = parseFloat(arr[0])
                    var lat = parseFloat(arr[1])
                    var radius = item.radius
                    var circle = new AMap.Circle({
                        center: [lng, lat],
                        radius: radius, //半径
                        borderWeight: 3,
                        strokeColor: "#FF33FF", 
                        strokeOpacity: 1,
                        strokeWeight: 0,
                        strokeOpacity: 0.2,
                        fillOpacity: 0.4,
                        strokeStyle: 'dashed',
                        strokeDasharray: [10, 10], 
                        // 线样式还支持 'dashed'
                        fillColor: '#128FEF',
                        zIndex: 50,
                    })
                
                    circle.setMap(state.map)
        
                    state.overlays.push(circle)

                    AMap.plugin(['AMap.CircleEditor'],function(){
                        var circleEditor = new AMap.CircleEditor(state.map, circle)
                        circleEditor.open()
                    })
                } else {
                    var path = item.pointInfo.split('|')
                    var list = []
                    for (var item of path) {
                        var s = item.split(',')
                        var lng = parseFloat(s[0])
                        var lat = parseFloat(s[1])
                        list.push([lng, lat])
                    }
                    var polygon = new AMap.Polygon({
                        path: list,
                        strokeColor: "#FF33FF", 
                        strokeWeight: 0,
                        strokeOpacity: 0.2,
                        fillOpacity: 0.4,
                        fillColor: '#128FEF',
                        zIndex: 50,
                    })
                    polygon.setMap(state.map)
        
                    state.overlays.push(polygon)

                    AMap.plugin(['AMap.PolyEditor'],function(){
                        var polyEditor = new AMap.PolyEditor(state.map, polygon)
                        polyEditor.open()
                    })
                   
                }
            }
            state.map.setFitView(state.overlays)
        },
        closeMouseTool({state, dispatch}){
            state.mouseTool.close(false)
            var layers = state.map.getLayers()
            console.log(layers)
        },
        clear({state, dispatch}){
            if(state.mouseTool){
                state.mouseTool.close()
            }
            state.map.clearMap()
            // state.mouseTool = null
            state.overlays = []
            state.isDrawCircle = false
            state.isDrawPolygon = false
        },
        getLocation({state, dispatch}){
            Vue.$vux.loading.show({
                text: '加载中'
            })
            
             wx.getLocation({
                  type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                  success: function (res) {   
                    Vue.$vux.loading.hide()                
                      var latitude = parseFloat(res.latitude+'') // 纬度，浮点数，范围为90 ~ -90
                      var longitude = parseFloat(res.longitude+'') // 经度，浮点数，范围为180 ~ -180。
                     
    
                        var resLnglat = GPS.gcj_encrypt( latitude,longitude)
                      console.log(resLnglat)
                     
                       dispatch('myMarker', {lng: resLnglat.lng, lat: resLnglat.lat, content:'我的位置'})
                      state.map.panTo([resLnglat.lng, resLnglat.lat])
                      state.map.setFitView(state.myMarker)
                  },
                  cancel: function (res) {
                      
                      // 点击取消执行的回调函数
                      Vue.$vux.loading.hide()
                      Vue.$vux.toast.text('用户拒绝授权获取地理位置', 'top')
                  },
                  fail: function () {
                    
                  // 失败的回调函数
                        Vue.$vux.loading.hide()
                        Vue.$vux.toast.text('获取地理位置失败', 'top')
                  }
                  
              })
          },
          refreshGPS ({state, dispatch, getters}, studentId) {
            refreshGPS(studentId).then(res => {
              console.log(res)
              state.locationCount = 0
              state.locationing = true
              dispatch('getLastGPS', studentId)
            })
          },
          getLastGPS({state, dispatch, getters}, studentId){
            state.locationing = true
            state.locationCount ++
            if(state.locationCount > 10){
                state.locationing = false
                Vue.$vux.toast.text('追踪失败', 'top')
                return
            }
            getLastGPS(studentId).then(res => {
                 if (!res) {
                    setTimeout(() => {
                        dispatch('getLastGPS', studentId)
                    }, 1000)
                    return
                 }

                  var lng = parseFloat(res.c_Longitude + '')
                  var lat = parseFloat(res.c_Latitude + '')
                  var address = res.c_Address
                  var positionType = res.positionType
                  var positionTypeStr = ''
                  if(positionType == 1){
                    positionTypeStr = 'GPS定位'
                  }else if(positionType == 2){
                    positionTypeStr = 'WIFI定位'
                  }else if (positionType == 3) {
                    positionTypeStr = '基站定位(存在误差)'
                  }
                  var content = res.createTime.replace('T', ' ') + " <br>" + address + '<br>' + '定位类型：' + positionTypeStr
                
                  dispatch('childMarker', {lng, lat, content})
                 
                 
                  state.map.setFitView(state.childMarker)

                if(res.createTime == state.createTime){
                    setTimeout(() => {
                        dispatch('getLastGPS', studentId)
                    }, 1000)
                 } else{
                    state.locationing = false
                    Vue.$vux.toast.text('追踪成功', 'top')
                 }
                 
                 state.createTime = res.createTime
            })

           
          },
    }
}
export default map

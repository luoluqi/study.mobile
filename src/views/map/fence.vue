<template>
  <div >
     <amap @complete='complete'></amap>
     <div class="func-p">
        <img @click="back" class="func-img" src="@/assets/img/map/back.png" alt="">
        <div>返回</div>
        <img @click="getLocation" class="func-img" src="@/assets/img/map/my.png" alt="">
        <div  @click="getLocation">我的</div>
      </div>
     <div class="fence-p">
      

        <div class="op-p">
          <div  @click="startDrawCircle" class="middle">
             
            <img v-if="isDrawCircle" class="op-img middle" src="@/assets/img/map/circle-b.png" alt="">
            <img v-else class="op-img middle" src="@/assets/img/map/circle-g.png" alt="">
            <div class="op-text middle" :class="{'blue': isDrawCircle}">圆形</div>
          </div>
          <div @click="startDrawPolygon" class="middle">
             
              <img v-if="isDrawPolygon" class="op-img middle" src="@/assets/img/map/poly-b.png" alt="">
              <img v-else class="op-img middle" src="@/assets/img/map/poly-g.png" alt="">
              <div   class="op-text middle" :class="{'blue': isDrawPolygon}">多边形</div>
          </div>
         
           <div @click="clear" class="del-p">
             <img class="del-img middle" src="@/assets/img/map/del.png" alt="">
             <div class="op-text middle">删除图形</div>
           </div>
        </div>
        <div @click="save" class="save-btn">保存</div>
     </div>
      <!-- <div v-if="isDrawCircle || isDrawPolygon" class="fence-p">
        <div v-if="isDrawPolygon" class="op-p">点击地图，绘制多边形</div>
        <div v-if="isDrawCircle" class="op-p">拖拽地图，绘制园形</div>
         <div @click="endDraw" class="save-btn">确定</div>
      </div> -->
  </div>
</template>

<script>
import amap from '@/components/map'
import GPS from '@/util/gps'
import {getFence, setFence} from '@/api/mapApi'
  export default {
    components: {
      amap
    },
    computed:{
      overlays(){
        var a =this.$store.state.map.overlays[0]
        if(a){
          return a.getPath()
        } else{
          return ''
        }
       
      },
      overlays1(){
        var a =this.$store.state.map.overlays[1]
        if(a){
          return a.getPath()
        } else{
          return ''
        }
       
      },
      isDrawCircle(){
        return this.$store.state.map.isDrawCircle
      },
       isDrawPolygon(){
        return this.$store.state.map.isDrawPolygon
      },
      studentId(){
         return this.$store.getters['user/studentId']
        //  return '651316833dbd42fabaf923f80e0e97ef'
      }
    },
    data() {
      return {
       
      }
    },
   
    methods: { 
      back(){
        this.$router.go(-1)
      }, 
       getLocation(){
        this.$store.dispatch('map/getLocation')
      },
      complete(){
        console.log('complete...')
         var self = this
        this.$store.state.map.map.on('click', function(ev) {
          var lnglat = ev.lnglat;
          console.log(lnglat)
          
          if(!self.isDrawCircle && !self.isDrawPolygon){
            return
          }
           // 将 Icon 实例添加到 marker 上:
             var marker = new AMap.Marker({
                 position: new AMap.LngLat(lnglat.lng, lnglat.lat),
                  offset: new AMap.Pixel(0,0), // 设置点标记偏移量
                 anchor: 'bottom-center'
               
             });
   
            self.$store.state.map.map.add(marker);
                                
            if(self.isDrawCircle){
              self.$store.dispatch('map/drawCircle', {lng:lnglat.lng, lat:lnglat.lat})
            }
         
        })

        this.getFence()
      },
      startDrawCircle(){
       this.$vux.toast.show({
          text: '点击地图，添加圆形',
          time: 3000,
          type: 'text',
          position: 'top',
          width: '6rem'
        })
        this.$store.state.map.isDrawCircle =  true
        this.$store.state.map.isDrawPolygon =  false
        
      },
      startDrawPolygon(){
        this.$vux.toast.show({
          text: '点击地图，添加多边形的点，最后一个点用双击',
          time: 3000,
          type: 'text',
          position: 'top',
          width: '7rem'
        })
         this.$store.state.map.isDrawPolygon =  true
         this.$store.state.map.isDrawCircle =  false
        this.$store.dispatch('map/drawPolygon')
      },
      clear(){
        this.$store.dispatch('map/clear')
        setFence({
          studentId: this.studentId,
          studentElectronicFenceInputDto: []
        }).then(res => {
            console.log(res)
            this.$vux.toast.text('已删除', top)
        })
      },
      save(){
        var overlays = this.$store.state.map.overlays
        if(overlays.length == 0){
          this.$vux.toast.text('没有设置围栏', top)
          return
        }
        var list = []
    //     {
    //   "fenceType": 0,
    //   "radius": 0,
    //   "pointInfo": "string"
    // }
        for(var item of overlays){
          if(item.CLASS_NAME == 'AMap.Circle'){
            var center = item.getCenter()
            list.push({
              fenceType: 10,
              radius: item.getRadius(),
              pointInfo: center.lng + ',' + center.lat
            })
          }else if(item.CLASS_NAME == 'AMap.Polygon') {
            var path = item.getPath()
            var str = ''
            for(var i = 0; i < path.length; i ++){
              str += path[i].lng + ',' + path[i].lat
              if(i == path.length - 1){

              }else {
                str += '|'
              }
            }
            list.push({
              fenceType: 0,
              pointInfo: str
            })
          }
        }
      
        setFence({
          studentId: this.studentId,
          studentElectronicFenceInputDto: list
        }).then(res => {
            console.log(res)
            this.$vux.toast.text('保存成功', top)
        })
      },
      getFence(){
         getFence({
            studentId: this.studentId
        }).then(res => {
            console.log(res)
            if (res) {
              this.$store.dispatch('map/drawFence', res)
            }
        })
      },
      endDraw(){
       
         this.$store.dispatch('map/closeMouseTool')
      }
    },
     mounted () { 
      
    }
  }
</script>
<style scoped>

.func-p{
  position: absolute;
  width: 0.72rem;
 
  background: #fff;
  left:0.2rem;
  bottom:3rem;
  box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.3);
  text-align: center;
  padding: 0 0 0.2rem 0;
}
.func-img{
  width: 0.44rem;
  height:0.44rem;
  display: inline-block;
  margin: 0.2rem 0 0 0;
}
.middle{display: inline-block;vertical-align: middle;}
.fence-p{position:absolute;width:100%;bottom:0;background: #fff;box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.3);}
.op-p{font-size: 0.28rem;color:#333;padding:0.28rem 0.24rem;}
.op-img{width: 0.54rem;height: 0.54rem;}
.op-text{margin: 0 0.57rem 0 0;}
.del-p{position: absolute;font-size: 0.28rem;color:#333;right:0.1rem;top:0.3rem;}
.del-img{width:0.24rem;height: 0.32rem;}
.save-btn{width:6.7rem;height: 0.76rem;line-height: 0.76rem;margin: 0.1rem auto 0.3rem auto;background: #128FEF;color:#fff;font-size: 0.28rem;text-align: center;border-radius: 0.1rem;}
.blue{color:#128FEF;}
</style>
<template>
  <div >
      <!-- <headNav title="SOS"></headNav> -->
     <amap @complete='complete'></amap>
     <div id="panel" style="display:none;"></div>
     <div class="func-p">
        <img @click="back" class="func-img" src="@/assets/img/map/back.png" alt="">
        <div>返回</div>
      </div>
      <div class="sosAdress">
         <div class="itemAdress">
             <p class="adress-p">
               <span class="left"><img src="@/assets/img/sos/sosRed.png" alt="">报警位置</span>
               <span class="right">{{getSosItem.creatTime | formatDateTime('YYYY-MM-DD HH:mm')}}</span>
             </p>
             <h2 class="adress-h2">{{getSosItem.address}}</h2>
         </div>
         <!-- <div class="itemAdress">
             <p class="adress-p">
               <span class="left"><img src="@/assets/img/sos/sosBlue.png" alt="">最新位置（仅供参考）</span>
               <span class="right">{{newAdress.createTime | formatDateTime('YYYY-MM-DD HH:mm')}}</span>
             </p>
             <h2 class="adress-h2">{{newAdress.c_Address}}</h2>
         </div> -->
      </div>
  </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import amap from '@/components/map'
import GPS from '@/util/gps'
import {getLastGPS, getDevice} from '@/api/mapApi'
import {setSOSReadState,lastGPSInfoFromEs} from '@/api/sosApi'
  export default {
    components: {
      amap,
      headNav
    },
    computed:{
      tel(){
        return 'tel:' + this.phone
      },
       studentId(){
         return this.$store.getters['user/studentId']
        //  return '651316833dbd42fabaf923f80e0e97ef'
      },
      getSosItem () {
            return this.$store.state.sos.sosItem
        }
    },
    data() {
      return {
        phone: '',
        newAdress:''
      }
    },
     mounted () { 
       console.log(this.getSosItem)
       this.getDevice()
       this.setRead()
       this.getAdress()
    },
    methods: {
      back(){
        this.$router.go(-1)
      }, 
      noPhone(){
        this.$vux.toast.text('学生没有电话', 'top')
      },
      complete(){
        console.log('complete...')
        var self = this
        this.$store.state.map.map.on('click', function(ev) {
          var lnglat = ev.lnglat;
          console.log(lnglat)
                                
          // self.$store.dispatch('map/childMarker', {lng: lnglat.lng, lat: lnglat.lat})
         
        })

       
        // this.getLastGPS()
        this.getPath()
      },
      getDevice(){
        getDevice({
          StudentId:this.studentId
        }).then(res => {
          
          console.log(res)
          if(res){
            this.phone = res.phone 
          }
        })
      },
      getLastGPS(){ 
        this.$store.dispatch('map/refreshGPS', this.studentId)
      },
      // 设置已读
      setRead(){
        setSOSReadState({id:this.getSosItem.id}).then(res => { })
      },
      // 获取最新的位置
      getAdress(){
          lastGPSInfoFromEs({studentId:this.studentId}).then(res =>{
                 this.newAdress = res
            })
      },
      // 给地图赋值
      getPath(){
        this.$store.state.map.map.setZoomAndCenter(14, [this.getSosItem.x,this.getSosItem.y]);
       var marker = new AMap.Marker({
         map: this.$store.state.map.map,
          position: [this.getSosItem.x,this.getSosItem.y]
        });
        this.$store.state.map.map.add(marker);
      }
    }
  }
</script>
<style scoped>

.func-p{
  position: absolute;
    width: 0.72rem;
    height: 1.28rem;
    background: #fff;
    left: 0.2rem;
    bottom: 2.78rem;
    -webkit-box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.3);
    box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.3);
    text-align: center;
  
}
.func-img{
  width: 0.44rem;
  height:0.44rem;
  display: inline-block;
  margin: 0.2rem 0 0 0;
}
.func-text{
  font-size: 0.2rem;
  color:#999999;
  display: inline-block;
  margin: 0rem 0 0.12rem 0;
}
.amap-marker-label{
      border: 0;
      background-color: transparent;
  }
  .sosAdress{
    width:100%;
    height:1.58rem;
    background:rgba(255,255,255,1);
    position:absolute;
    bottom: 0;
    box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.3);
  }
  .adress-p span{
    font-size: 0.24rem;
    color: #999999;
  }
  .adress-p{
        overflow: hidden;
    padding: 0 0.2rem;
    line-height: 0.6rem;
        margin-top: 0.24rem;
  }
  .adress-p span img{
    width: 0.3rem;
    height: 0.34rem;
    vertical-align: sub;
    margin-right: 0.1rem;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .adress-h2{
    padding: 0 0.2rem;
    font-size: 0.28rem;
    color: #999999;
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 6.4rem;
  }
  #panel{
    display: none !important;
  }
</style>
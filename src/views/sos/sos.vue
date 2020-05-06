<template>
    <div>
        <headNav title="SOS信息"></headNav>
        <div class="tableContent" ref="scroll"> 
          <infiniteScroll  @loadMore="loadMore">
            <div class="itemAdress">
                <p class="adress-p">
                  <span class="left"><img src="@/assets/img/sos/sosOrange.png" alt="">最新位置（仅供参考）</span>
                </p>
                <h2 class="adress-h2">{{newAdress.c_Address}}</h2>
            </div>
            <div class="itemSos">
              <ul >
                  <li v-for="(item,index) in sosInfoList" :key="index" @click="sosDetail(item)">
                    <div class="warning-time">
                      <span class="warning-type sos" v-if="item._Type == 1">SOS告警</span>
                      <span class="warning-type weilan" v-if="item._Type == 2">围栏告警</span>
                      <span class="warTime">{{item.creatTime | formatDateTime('YYYY-MM-DD HH:mm')}}</span>
                      <span class="look-type daicha" v-if="item.isRead == 0">待查看</span>
                      <span class="look-type yicha" v-if="item.isRead == 1">已查看</span>
                      <span class="look-type guoqi" v-if="item.isRead == 2">已过期</span>
                      </div>
                      <div class="warning-tit">报警位置：</div>
                      <div class="warning-adress"><img src="@/assets/img/sos/sosGray.png" alt="">{{item.address}}</div>
                  </li>
              </ul>
            </div>
            <div class="load-p">
                  <load-more v-if="isMore" :tip="'正在加载'"></load-more>
                  <load-more v-else :show-loading="false" :tip="'没有更多了'" background-color="#fbf9fe"></load-more>
            </div>
          </infiniteScroll>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import infiniteScroll from '@/components/infiniteScroll'
import { LoadMore} from 'vux'
import {lastGPSInfoFromEs,sOSInfo} from '@/api/sosApi'
export default {
  name:'sos',
    components: {
      headNav,
      infiniteScroll,
        LoadMore
    },
    data() {
      return {
        pageNum:0,
        pageSize:6,
        sosInfoList:[],
        newAdress:'',
        isMore:true
      }
    },
    activated(){
      // this.$store.getters['user/studentId']
      // 获取最新位置
      lastGPSInfoFromEs({studentId:this.$store.getters['user/studentId']}).then(res =>{
                 this.newAdress = res
            })
      this.sosList()
    },
    methods:{
          //  获取sos信息列表
          sosList(){
             if(!this.isMore){
                return
            }
            this.pageNum++
            var parms = {
                StudentId:this.$store.getters['user/studentId'],
                // StudentId: 'e0838d9a5bd54caf8a5a71db8ca2c6f2',
                PageNum:this.pageNum,
                PageSize:this.pageSize
            }
            sOSInfo(parms).then(res => {
              if(res){
                 if(res.items.length < this.pageSize){
                        this.isMore = false
                    }
                  // 当前时间时间戳
                  var endTime=new Date().getTime()
                  for(var obj of res.items){
                    var date = new Date(obj.creatTime)
                    var startTime = date.getTime()
                    var time = endTime - startTime
                    if(time > 60*60*24*1000){
                        obj.isRead = 2
                    }
                  }
                  this.sosInfoList = this.sosInfoList.concat(res.items) 
                  }else{
                    this.isMore = false
                  }
            })
          },
          loadMore(){
            this.sosList()
        },
          // 跳转详情
          sosDetail(item){
            if(item.isRead == 2){
                this.$router.push('sosDetail2')
                this.$store.commit('sos/getSosItem', item)
                this.$store.commit('sos/getNewAdress', this.newAdress)    
            }else{
              this.$router.push('sosDetail')
              this.$store.commit('sos/getSosItem', item)
              this.$store.commit('sos/getNewAdress', this.newAdress)    
              item.isRead = 1
            }
            
          }
    }
}
</script>
<style scoped>
.itemAdress{
  background-color: #ffffff;
  padding: 0.24rem;
  margin-bottom: 0.24rem;
}
.adress-p span{
    font-size: 0.24rem;
    color: #666666;
  }
  .adress-p{
        overflow: hidden;
    line-height: 0.6rem;
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
    font-size: 0.28rem;
    color: #333333;
  }
  .tableContent{
    height: calc(100% - 0.88rem);
  }
  .itemSos li{
    width: 6.6rem;
    height: 1.52rem;
    background: #ffffff;
    margin: 0 auto;
    margin-bottom: 0.24rem;
    border-radius: 0.1rem;
    padding: 0.3rem 0 0.3rem 0.2rem;
  }
  .warning-type{
    width:1.13rem;
    height:0.42rem;
    border-radius:0.15rem 0 0.15rem 0;
    color: #ffffff;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.42rem;
    display: inline-block;
  }
  .weilan{
    background:rgba(74,170,244,1);
  }
  .sos{
    background:#FF9900;
  }
  .warning-tit{
    color: #999999;
    font-size: 0.24rem;
    margin-top: 0.2rem;
  }
  .warning-adress{
    color: #333333;
    font-size: 0.32rem;
    margin-top: 0.2rem;
    width: 6.4rem;
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
  }
  .warning-adress img{
    width: 0.3rem;
    height: 0.34rem;
    vertical-align: sub;
  }
  .warTime{
    font-size: 0.28rem;
    color: #999999;
  }
  .look-type{
    float:right;
    width:1.08rem;
    height:0.50rem;
    border-radius:0.26rem 0 0 0.26rem;
    text-align: center;
    line-height: 0.5rem;
  }
  .daicha{
    color: #FF3000;
    background:rgba(254,235,231,1);
  }
  .yicha{
    color: #128FEF;
    background:#DCF0F8;
  }
  .guoqi{
    background: #E2E2E2;
    color: #9F9E9E;
  }
  .load-p{
        padding: 1rem 0 0 0;
    }
</style>
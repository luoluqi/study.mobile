<template>
    <div style="position: relative;">
     <headNav :title="'考勤查询'"></headNav>
    <div class="qj-bj">
		<!-- <div class="qj-img"><img :src="itemTecher.Img"></div>
		<div class="qj-text">
			<h2>{{itemTecher.RealName}}</h2>
			<p>{{itemTecher.GradeName}} {{itemTecher.ClassName}}</p>
		</div> -->
        <!-- <div class="changeIdn">
            <img src="@/assets/img/change-reco.png">
            学生考勤
        </div> -->
	</div>
     <div class="dateTime">
         <calendar 
        :late="late"
        :lack="lack"
        :leave="leave"
        :normal="normal"
        :lackText="'旷课'"
        @change="change"
        @select="select">
        </calendar>
    
     </div>
        
    
    <div class="content">
        <div class="chekingInDay">
            <p>本月应考勤<label>{{dayStuDetail.ykqTs}}</label>天，已考勤<label>{{dayStuDetail.okqTs}}</label>天</p>
            <ul class="kaoDetail">
                <li>
                    <h2><label>{{dayStuDetail.cd}}</label>次</h2>
                    <h3>迟到</h3>
                </li>
                <li>
                    <h2><label>{{dayStuDetail.zt}}</label>次</h2>
                    <h3>早退</h3>
                </li>
                <li>
                    <h2><label>{{dayStuDetail.qj}}</label>次</h2>
                    <h3>请假</h3>
                </li>
                <li>
                    <h2><label>{{dayStuDetail.kk}}</label>次</h2>
                    <h3>旷课</h3>
                </li>
            </ul>    
        </div>
         <div class="chekingInDuan">
            <p>{{Datetime}} {{Datetime | getDay}}</p>
             <div class="duanTime">
                 <ul>
                    <li v-for="(item,index) in nowDetailData" :key="index">
                        <h2>{{item.time}} &nbsp;&nbsp; {{item.attencetime}} 
                            <span v-if="item.attencestatus == 0">正常</span>
                             <span v-if="item.attencestatus == 1" class="zaotui2">迟到</span>
                            <span v-if="item.attencestatus == 2" class="zaotui2">早退</span>
                            <span v-if="item.attencestatus == 3" class="qingjia2">请假</span>
                             <span v-if="item.attencestatus == 4" class="kuangke2">旷课</span>
                        </h2>
                        <h3>
                            <label v-if="item.attencedevicetype == 0">考勤方式：闸机人脸识别</label>
                            <label v-if="item.attencedevicetype == 1">考勤方式：学生卡定位</label>
                            <label v-if="item.attencedevicetype == 2">考勤方式：球机人脸识别</label>
                            <img v-if="item.attencestatus == 0" @click="ifShow('1',item.attenceimgurl)" src="@/assets/img/tupian.png" alt="">
                        </h3>
                    </li>
                    
                 </ul>
             </div>
        </div>
      </div>
      <!-- 弹窗 -->
      <div class="jieTan" v-if="this.tanShow==1" >
          <div class="BlackWin"></div>
          <div class="WinImg">
              <div class="recognition">
                  <p>闸机人脸识别</p>
                  <img :src="zhaji" alt="">
              </div>
              <div class="recognition">
                  <p>球机人脸识别</p>
                  <img :src="qiuji" alt="">
              </div>
              <div class="faceCha" @click="ifHide()"><img src="@/assets/img/faceCha.png" alt=""></div>
          </div>
      </div>
       <bottomNav></bottomNav>
    </div>
</template>
<script>
// import { InlineCalendar } from 'vux';
import  calendar  from '@/components/calendar/calendar';
import headNav from '@/components/headNav/headNav';
import bottomNav from '@/components/bottomNav/bottomNav';
import {nowDayCheking,nowDetail,detailColorInfo,updatePoint} from "@/api/chekingApi"
import { debuglog, debug } from 'util';
export default {
    components: {
    calendar,
    headNav,
    bottomNav
  },
  computed:{
      mChildList(){
          return this.$store.state.user.childList
      }
  },
  data(){
      return {
           tanShow:'',
           dayStuDetail:{},
           nowDetailData:[],
           imgurl:'',
           Datetime:'',
        //    ColorInfo:[]
           late:[], //迟到
           lack:[], //旷课
           leave:[],  //请假
            normal:[],  //正常
           studentId:'',
           itemTecher:{},
           mydate:'',
           userId:'',
           userRoleCode:'',
           userRealName:'',
        //    mChildList:[{"ClassId":"d5f2734484b54ab09e0328c9429c7234","ClassName":"1班","GradeId":"162f01e041d541db8a5885c2e16e3a9f","GradeName":"一年级","Relation":"","SchoolId":"eeeea2b869e44b3bbd797f4d781aceaf","SchoolName":"易宇网络测试学校","Img":"http://t-fileapi.xueerqin.net/PortraitFiles/eeeea2b869e44b3bbd797f4d781aceaf/984ff3cb0791493597288b523d89cead.jpg","LoginName":"","RealName":"陈睿麒","SelfId":"984ff3cb0791493597288b523d89cead","UserId":""},{"ClassId":"27ea30bfc96245aba495d50084bc6795","ClassName":"2班","GradeId":"162f01e041d541db8a5885c2e16e3a9f","GradeName":"一年级","Relation":"","SchoolId":"eeeea2b869e44b3bbd797f4d781aceaf","SchoolName":"易宇网络测试学校","Img":"http://t-fileapi.xueerqin.net/PortraitFiles/eeeea2b869e44b3bbd797f4d781aceaf/c2d76f626f804cf18f86438124e491f5.jpg","LoginName":"","RealName":"陈诗雨2619","SelfId":"c2d76f626f804cf18f86438124e491f5","UserId":""},{"ClassId":"27ea30bfc96245aba495d50084bc6795","ClassName":"2班","GradeId":"162f01e041d541db8a5885c2e16e3a9f","GradeName":"一年级","Relation":"","SchoolId":"eeeea2b869e44b3bbd797f4d781aceaf","SchoolName":"易宇网络测试学校","Img":"http://t-fileapi.xueerqin.net/PortraitFiles/eeeea2b869e44b3bbd797f4d781aceaf/2681bfe2e8a44b3a9945556e451cd1e0.jpg","LoginName":"","RealName":"陈子龙","SelfId":"2681bfe2e8a44b3a9945556e451cd1e0","UserId":""},{"ClassId":"d5f2734484b54ab09e0328c9429c7234","ClassName":"1班","GradeId":"162f01e041d541db8a5885c2e16e3a9f","GradeName":"一年级","Relation":"","SchoolId":"eeeea2b869e44b3bbd797f4d781aceaf","SchoolName":"易宇网络测试学校","Img":"http://t-file.xueerqin.net/PortraitFiles/eeeea2b869e44b3bbd797f4d781aceaf/1943212dd9754a61a7d4f2080806c28d.jpg","LoginName":"","RealName":"陈1","SelfId":"1943212dd9754a61a7d4f2080806c28d","UserId":""},{"ClassId":"d5f2734484b54ab09e0328c9429c7234","ClassName":"1班","GradeId":"162f01e041d541db8a5885c2e16e3a9f","GradeName":"一年级","Relation":"","SchoolId":"eeeea2b869e44b3bbd797f4d781aceaf","SchoolName":"易宇网络测试学校","Img":"http://file.xueerqin.net/PortraitFiles/eeeea2b869e44b3bbd797f4d781aceaf/82fe869981f34a3892e7370f5769cea2.jpg","LoginName":"","RealName":"吴泽成","SelfId":"82fe869981f34a3892e7370f5769cea2","UserId":""},{"ClassId":"86760121ed034622a65fcbf7c095043b","ClassName":"9班","GradeId":"162f01e041d541db8a5885c2e16e3a9f","GradeName":"一年级","Relation":"","SchoolId":"ea432352dc154ac7a6d3054a4b39f2bc","SchoolName":"福州市国货路小学","Img":"http://fileapi.xueerqin.net/PortraitFiles/ea432352dc154ac7a6d3054a4b39f2bc/195283b2879046a8ad5a65c801cc52c4.jpg","LoginName":"","RealName":"金沙江","SelfId":"195283b2879046a8ad5a65c801cc52c4","UserId":""},{"ClassId":"86760121ed034622a65fcbf7c095043b","ClassName":"9班","GradeId":"162f01e041d541db8a5885c2e16e3a9f","GradeName":"一年级","Relation":"","SchoolId":"ea432352dc154ac7a6d3054a4b39f2bc","SchoolName":"福州市国货路小学","Img":null,"LoginName":"","RealName":"张馨予","SelfId":"f9d097253469422f9a35ec673acc4304","UserId":""}]

      }
  },
   mounted(){
        this.$store.dispatch('user/getUserInfo').then(res => {
            
            this.UpdatePoint()
            this.NowDayCheking()
            this.NowDetail()
            this.DetailColorInfo()
        })
      
  },
  methods:{
       //   获取cookie中的值
      getCookie(sName){
            var aCookie = document.cookie.split("; ");
            for (var i=0; i < aCookie.length; i++){
                var aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                return unescape(aCrumb[1]);
            }
            return null;
        },

    //   签到积分{"userId":"844219e9ca7a47b79b2346867886dd16","userRoleCode":"Teacher","userRealName":"黄鑫文","pointType":1001}
        UpdatePoint(){
            this.userId = this.getCookie("loginUserId")
            if(!this.userId){
                this.userId = "844219e9ca7a47b79b2346867886dd16";
            }
            this.userRoleCode = this.getCookie("roleCode")
            if(!this.userRoleCode){
                this.userRoleCode = "Teacher";
            }
            this.userRealName = this.getCookie("realName")
            if(!this.userRealName){
                this.userRealName = "黄鑫文";
            }else{
                 this.userRealName = decodeURI( this.userRealName)
            }
           var param = {
                 userId:this.userId,
				userRoleCode:this.userRoleCode,
                userRealName:this.userRealName,
                pointType:"2007"
            }
           updatePoint(param).then((data) => {
               console.log(data) 
                
			});
        },


       
      ifShow(show,attenceimgurl){
       this.tanShow=show;
       this.imgurl=attenceimgurl;
       var result=this.imgurl.split(',');
        for(var i=0;i<result.length;i++){
          this.zhaji = result[0]
          this.qiuji = result[1]
          if(this.zhaji=='0'){
              this.zhaji = "static/zanwu.png"
          }
          if(this.qiuji=='0'){
              this.qiuji = "static/zanwu.png"
          }
        }
    //    console.log(this.imgurl)


      },
      ifHide(){
          this.tanShow='0';
      },
      change(year,month){
          var zreo ;
          if(month > 8){
              zreo =''
          }else{
              zreo = '0'
          }
          var date =year+'-'+zreo+(month+1)+'-'+0+1
        //   console.log(date);
          this.DetailColorInfo(date)
          this.NowDetail(date);
          this.NowDayCheking(date)
      },
      select(date){
          
        //   console.log(date);
         
          this.NowDetail(date);
          this.DetailColorInfo(date)
        //   this.NowDayCheking(date)
      },
      //  获取当天考勤统计
     NowDayCheking(date){
        //  当前日期
         var myDate = new Date();
         var year = myDate.getFullYear()
         var month = myDate.getMonth() + 1
         var date = myDate.getDate()
         if(month < 10) {
             month = '0' + month
         }
         if(date < 10) {
             date = '0' + date
         }
       
            this.mydate=year+'-'+month+'-'+date
       
           this.studentId = this.getCookie("studentId")
            if(!this.studentId){
                this.studentId = "2681bfe2e8a44b3a9945556e451cd1e0";
            }
            for(var obj of this.mChildList){
                //  debugger
                if(obj.SelfId==this.studentId){
                    this.itemTecher = obj
                //     console.log(2222222222222222222222222222222222222222222222222)
                //    console.log(this.itemTecher)
                }
            }
            var param ={
                studentId:this.studentId,
                // startTime:this.mydate
            }
             if(date){
                 param.startTime = date
            }else{
                param.startTime = this.mydate
            }
			nowDayCheking(param).then((data) => {
                var data =JSON.parse(data);
                if (data.Code==200) {
                    console.log(data.Data[0]);
                    this.dayStuDetail=data.Data[0]
                }
			});
        },
        //    获取当天明细
        NowDetail(date){
            this.Datetime=this.mydate
            var param = {
                 schoolId:this.itemTecher.SchoolId,
				gradeId:this.itemTecher.GradeId,
                studentId:this.studentId
            }

            if(date){
                 param.startTime = date
                 this.Datetime =date
            }else{
                param.startTime = this.mydate
            }

            nowDetail(param).then((data) => {
                var data =JSON.parse(data);
                if (data.Code==200) {
                    // console.log(data);
                    this.nowDetailData=data.Data
                }
			});
        },
        // 单个学生某月考勤颜色--移动端
        DetailColorInfo(date){
            // debugger
            this.Datetime=this.mydate 
            // alert(this.mydate)
            var param = {
                studentId:this.studentId
            }

            if(date){
                 param.startTime = date
                  this.Datetime=date
            }else{
                param.startTime = this.mydate
            }
  
            detailColorInfo(param).then((data) => {
                var data =JSON.parse(data);
                if (data.Code==200) {
                    //  console.log(88888888888888888888888888888888);
                    // console.log(data);
                   var ColorInfo = data.Data;
                   for( var obj of ColorInfo){
                    //    debugger
                      if(obj.status == 0){
                          this.normal.push(obj.datetime)
                       }
                       if(obj.status == 1 || obj.status == 2){
                          this.late.push(obj.datetime)
                       }
                       if(obj.status == 3){
                          this.leave.push(obj.datetime)
                       }
                       if(obj.status == 4){
                          this.lack.push(obj.datetime)
                       }
                   }
                    // console.log(this.late);
                    // console.log(this.leave);
                    // console.log(this.lack);
                }
			});
        }
       
        
  }
 
}
</script>
<style scoped src="@/assets/css/chekingIn.css">

</style>


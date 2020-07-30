<template>
    <div id="menu" class="menu-con">
        
        <img class="top-bg" src="@/assets/img/menu/top-bg.png" alt="">
        <div class="nav_title">
            <!-- <img class="logo_index2" src="./img/indexlogo2.png" /> -->
            <div class="nav_person" @click="showList">
              <span>
                  {{realName}}
                 
                </span>
            </div>
           
            <img class="refresh" @click="refreshData" src="@/assets/img/menu/refresh.png" alt="">
        </div>
        <div class="banner">
            <Swiper>
                 <Slide>
                    <a target="_blank" href="https://mp.weixin.qq.com/s?__biz=Mzg3MDIxMTg1NA==&mid=2247484371&idx=2&sn=e33940a92dc4b9febec4844bf6c2a632&chksm=ce900bb2f9e782a42b7238a1b083010cc8608a44a1c186bf5fff8357bb14293f742f2552273f&token=648086099&lang=zh_CN#rd">
                        <img class="banner-img" src="@/assets/img/menu/banner1.png" alt="">
                    </a>
                </Slide>
                <Slide>
                      <a target="_blank" href="https://mp.weixin.qq.com/s?__biz=Mzg3MDIxMTg1NA==&mid=2247484069&idx=2&sn=6a5c0560b022061a1a9c013b034e5e83&chksm=ce900ac4f9e783d20d6eda55e2e9bbf033b782a904e8854b45e22f8ce75807a7ad39052e5639&token=648086099&lang=zh_CN#rd">
                        <img  class="banner-img" src="@/assets/img/menu/banner2.png" alt="">
                      </a>
                </Slide>
                <Slide>
                      <a target="_blank" href="https://mp.weixin.qq.com/s?__biz=Mzg3MDIxMTg1NA==&mid=2247483901&idx=1&sn=9c43804305333f76aeac56d212c3be45&chksm=ce90099cf9e7808affddc7f2903fcfcb3c6509f8ad4c69c79a34d1ad29d97c0706f855a9f5fb&token=648086099&lang=zh_CN#rd">
                        <img  class="banner-img" src="@/assets/img/menu/banner3.png" alt="">
                      </a>
                </Slide>
            </Swiper>
        </div>
        <div id="muserList" v-show="isShowList">
            <div class="windows" @click="showList()"></div> 
            <div class="person_list">
                <ul v-if="roleCode == 'Parent'">
                    <li v-for="(item,index) in classData" :key="index" @click="showListItem(item)">
                        <img :src="item.Img" class="pern_img">
                        <span>{{item.RealName}}</span>
                        <label>{{item.GradeName}}{{item.ClassName}}</label>
                    </li>
                </ul>
                <ul v-else>
                    <li v-for="(item,index) in classData" :key="index" @click="showListItem1(item)" class="item-li">
                        <img :src="teacherImg" class="pern_img">
                        <span>{{item.RealName}}</span>
                        <label>{{item.GradeName}}{{item.ClassName}}<em class="item-em">{{item.parentName}}</em></label>
                    </li>
                </ul>  
            </div>
        </div>
        <div class="workbench workbenchim" v-for="(item,index) in totalData" :key="index">
            <h2 class="workbenc_h2">
              <!-- <img src="./img/tit_left.png"/> -->
              <div>{{item.featurepack.PackageName}}</div>
              <!-- <img src="./img/tit_right.png"/> -->
            </h2>
            <ul v-if="roleCode == 'Parent'" class="menu-list">
                <li 
                 class="menu-item"
                v-for="(child,j) in item.urljsons" :key="j" @click="checkUser(child,item)">
                    <label v-if="child.Name=='通知公告'&&notice!=0">{{notice}}</label>
                    <label v-if="child.Name=='家庭作业'&&task!=0">{{task}}</label>
                    <label v-if="child.Name=='学生请假'&&leave!=0">{{leave}}</label>
                    <label v-if="child.Name=='sos'&&sos!=0">{{sos}}</label>
                    

                    <img class="menu-img" :src="child.ImgUrl">
                        <p class="menu-text">{{child.Name}}</p>
                </li>
            </ul>
            <ul v-else class="menu-list">
                <li 
                 class="menu-item"
                v-for="(child,j) in item.urljsons" :key="j" v-if="child.Name!='邀请家长'||isInviteParent"  @click="checkUser(child,item)">
                    <label v-if="child.Name=='通知公告'&&notice!=0">{{notice}}</label>
                    <label v-if="child.Name=='家庭作业'&&task!=0">{{task}}</label>
                    <label v-if="child.Name=='学生请假'&&leave!=0">{{leave}}</label>
                    <label v-if="child.Name=='sos'&&sos!=0">{{sos}}</label>
                    <label v-show="child.Name=='工作流'&&flowCount!=0">{{flowCount}}</label>
                  
                     <img class="menu-img" :src="child.ImgUrl">
                        <p class="menu-text">{{child.Name}}</p>
                </li>
            </ul>
        </div>

      <schoolAdminMenu></schoolAdminMenu>

        <div class="b-banner">
             <img src="@/assets/img/menu/214.jpg" />
        </div>
        <!-- <div class="news">
            <h2>骆米校园资讯<span><a href="https://www.k12jyw.cn">更多&gt;&gt;</a></span></h2>
            <ul>
                <li v-for="(item,index) in newsData" :key="index">
                    <a :href="item.url">
                      <img :src="item.imgUrl == null?baseImg:item.imgUrl" />
                      <label>{{item.title}} </label>
                    </a>
                </li>
            </ul>
        </div> -->
        <div style="height: 1.1rem;"></div>
        <!--未开通此功能-->
        <div class="tan_gn" v-if="tanShow=='1'">
            <div class="tan_black"></div>
            <div class="gongneng">
                <img src="@/assets/img/jinggao.png" />
                <p>抱歉，您尚未开通此功能！</p>
                <h2>如需使用可点击 <label @click="gotoVip">立即开通</label><br /> 或点击屏幕下方VIP模块了解开通</h2>
                <div class="qued" @click="gotoVip">确定</div>
            </div>
        </div>
        <!--解除绑定弹框-->
        <!--<div class="j-tan" v-if="tanShow=='1'">
            <img src="./img/w-ico.png" />
            <p>是否解除绑定？</p>
            <a v-on:click="clearOpenid">确定</a><a v-on:click="clickShow('0')">取消</a>
        </div>-->
        <bottomNav :index="1"></bottomNav>
    </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import {getCookiesObj, setCookie, getCookie} from '@/util/tool'
import { Swiper, Slide } from 'vue-swiper-component'
import {deptListByTeacherId} from '@/api/commonApi'
import schoolAdminMenu from '@/components/schoolAdminMenu'
import bottomNav from '@/components/bottomNav/bottomNav';
export default {
    name: 'index',
     components:{
      Swiper,
      Slide,
      schoolAdminMenu,
      bottomNav
    },
    data () {
        return {
            tanShow:'2',
            baseData: [],
            vipData: [],
            cardData: [],
            baseUrl:'http://mappv2.xueerqin.net',
            isShowList: false,
            readData: [],
            classData: [],
            itemData: {},
            notice: 0,
            task:0,
            leave: 0,
            flowCount: 0,
            newsData: [],
         
           
            sos: 0,
            isInviteParent: false,
            roleCode: '',
            realName: '',
            resCode: '',
            imgList:[
            
            ],
            imgIndex: 0,
            teacherImg: '',
           
            totalData: [
                  {
                    "featurepack": {
                      "Id": "87911e2ec7f740e7b69e3f8922044b06",
                      "PackageName": "日常应用",
                      "FunctionNum": 5,
                      "CreateTime": "2019-10-24T17:47:16",
                      "UpTime": "2019-10-24T17:47:16",
                      "Type": 2,
                      "UrlIds": "548,698,699,700,701",
                      "Rid": "350100",
                      "Order": 47
                    },
                    "urljsons": [
                    ]
                  }
                ],
            menuList: ["考勤打卡","邮件","办公通知","工资条","工作流","综合评价","云上党建","教育资讯","体温监测"]
        }
    },
   
    created () {
      
      // alert(JSON.stringify(localStorage.getItem('itemData')))
      // this.totalData = this.statisData[0].featurepackExend
      this.realName=decodeURI(getCookie('realName')) 
      this.getNewsList()
      
     
      this.getUrlNewList(getCookie('schoolId'), 2)
    },
    methods: {
        // 获取menu数据接口
        getUrlList (classId,gradeId,schoolId,realName) {
            this.baseData = []
            this.vipData = []
            this.cardData = []
            var params = {
                classId:classId,
                gradeId:gradeId,
                schoolId:schoolId,
                realName:realName,
                // img:this.cookiesObj.img,
                // OpenId:this.cookiesObj.OpenId,
                // Token:this.cookiesObj.Token,
                // loginName:this.cookiesObj.loginName,
                // loginUserId:this.cookiesObj.loginUserId,
                // returnCode:this.cookiesObj.returnCode,
                // roleCode:this.cookiesObj.roleCode,
                // teacherId:this.cookiesObj.teacherId,
                // studentId:this.cookiesObj.studentId,
            }
            this.$store.dispatch('menu/GetUrlList',params).then(res => {
                var data = JSON.parse(res).Data.parentVip
                data.forEach((item,index) =>{
                    if(item.type == '1'){
                        this.baseData.push(item)
                    }
                    if(item.type == '2'){
                        this.vipData.push(item)
                    }
                    if(item.type == '3'){
                        this.cardData.push(item)
                    }
                })
            })
        },
        // 已读未读数据接口
        getReadData (studentId,classId) {
          if (getCookie('roleCode') == 'Parent'){
            var params1 = {
               classId: getCookie('classId'),
                gradeId: getCookie('gradeId'),
              // studentId:studentId,
              // typeId: 1,
              // data: {},
              parentId: getCookie('parentId')
            }
         
            this.$store.dispatch('menu/getNoticeUnread',params1).then(res => {
                var data = JSON.parse(res).Data
                this.notice = data
            })
            var params2 = {
                classId: getCookie('classId'),
                gradeId: getCookie('gradeId'),
                // studentId:studentId,
                // typeId: 4,
                // data: {},
                parentId: getCookie('parentId')
            }
            
            this.$store.dispatch('menu/getHomeWorkUnread',params2).then(res => {
             
                var data = JSON.parse(res).Data
                this.task = data
            })
            var params3 = {
                studentId:studentId
            }
            this.$store.dispatch('menu/GetReadDataSos',params3).then(res => {
                var data = JSON.parse(res).Data
                this.sos = data.UnReadCount
            })
          } else {
            // console.log(studentId)
             var params4 = {
              classId: classId,
              studentId:studentId,
              typeId: 1
            }
            // this.$store.dispatch('menu/GetReadData',params4).then(res => {
            //     var data = JSON.parse(res).Data
            //     this.notice = data.UnReadCount
            // })
            var params5 = {
                classId: classId,
                studentId:studentId,
                typeId: 2
            }
            // this.$store.dispatch('menu/GetReadData',params5).then(res => {
            //     var data = JSON.parse(res).Data
            //     this.task = data.UnReadCount
            // })
            var params6 = {
                classId: classId,
                studentId:studentId,
                typeId: 3
            }
            this.$store.dispatch('menu/GetReadData',params6).then(res => {
                var data = JSON.parse(res).Data
                this.leave = data.UnReadCount
            })

             deptListByTeacherId({teacherId: getCookie('teacherId')}).then(d => {
                d = JSON.parse(d).Data
                this.$store.dispatch('menu/getFlowCount', 
                  {
                    userId:  getCookie('teacherId'),
                    schoolId: getCookie('schoolId'),
                    deptId: d.join()
                  }).then(res => {
                    var data = JSON.parse(res).Data
                    this.flowCount = data
                })
            })
          }
        },
        // 获取头部列表
        getHeadList () {
          var roleCode = getCookie("roleCode")
          if(roleCode == 'Parent') {
            this.classData = JSON.parse(localStorage.getItem('mChildList'))
            if (localStorage.getItem('itemData') == null) {
              this.itemData = this.classData[0]
              localStorage.setItem('childName',this.itemData.RealName) 
            } else {
              this.itemData = JSON.parse(localStorage.getItem('itemData'))
              localStorage.setItem('childName',this.itemData.RealName)
              // alert(JSON.stringify(localStorage.getItem('itemData')))
            }
          } else {
            var self = this
            setTimeout(() => {
              self.classData = JSON.parse(localStorage.getItem('classInfoList'))
              // console.log(self.classData)
              this.teacherImg = getCookie('img')
              if (localStorage.getItem('itemDataTeacher') == null) {
                // console.log(self.itemData)
                self.itemData = self.classData ? self.classData[0] : {}
                if(self.itemData && self.itemData.parentName == "班主任"){
                  this.isInviteParent = true
                }else{
                  this.isInviteParent = false
                }
              } else {
                self.itemData = JSON.parse(localStorage.getItem('itemDataTeacher'))
                if(self.itemData.parentName == "班主任"){
                  this.isInviteParent = true
                }else{
                  this.isInviteParent = false
                }
              }
            }, 1500);
          }
        },
        // 新闻接口
        getNewsList () {
            var params = {}
            this.$store.dispatch('menu/GetNewsList',params).then(res => {
                var result = JSON.parse(res)
                var data = result.Data
                this.newsData = data
            })
        },
        clickShow (params,url) {
            location.href = url
        },
        showListItem (item) {
            // console.log(item)
            this.isShowList = !this.isShowList
            this.itemData = item
            localStorage.setItem('itemData', JSON.stringify(item))
             localStorage.setItem('childName',item.RealName)
            
            this.$store.dispatch('user/changePerson', item)

            // this.getReadData(item.SelfId,item.ClassId)
            // this.getUrlNewList(getCookie('schoolId'), 1)
        },
        showListItem1 (item) {
            if(item.parentName == "班主任"){
              this.isInviteParent = true
            }else{
              this.isInviteParent = false
            }
            this.isShowList = !this.isShowList
            this.itemData = item
            localStorage.setItem('itemDataTeacher', JSON.stringify(item))
            this.$store.dispatch('user/changePerson', item)

            // this.getUrlNewList(getCookie('schoolId'), 2)
            //  this.getReadData(getCookie('teacherId'), item.ClassId)
        },
        showList () {
            this.isShowList = !this.isShowList
        },
        getCookiesObj (cookies) {
            var arr = cookies.split(";")
            var obj = {}
            for(var i=0;i<arr.length;i++){
                var newArr = arr[i].split("=")
                obj[newArr[0].trim()]=newArr[1]
            }
            return obj
        },
        getUrlNewList (schoolId, type) {
          console.log(123)
          // this.totalData = this.statisData[0].featurepackExend
          this.$vux.loading.show({
              text: '加载中..'
            })
            var params = {
              schoolId: schoolId,
              type: type
            }
            
            this.$store.dispatch('menu/GetUrlListV3',params).then(res => {
              
              // console.log(res)
              this.$vux.loading.hide()
              var result = JSON.parse(res)
              if (result.Code == 200) {
                var data = result.Data[0].featurepackExend

                for (var menuName of this.menuList) {
                    for(var item of data){
                        for(var json of item.urljsons){
                            //  console.log(json.Name)
                            //  console.log(this.menuList, json.Name)
                            if(menuName == json.Name){
                                this.totalData[0].urljsons.push(json)
                            }
                          
                        }
                    }
                }
               
              }
              this.getReadData()
            })
        },
        async checkUser (item,pItem) {
          
            var self = this
            // 日志
            var paramsLog = {
              ModularName: item.Name,
              ModularCode: item.BaseId,
              UserID: getCookie("loginUserId"),
              UserRole: getCookie("roleCode"),
              Type: 'wxoa',
              SchoolId: getCookie("schoolId")
            }
          // console.log(paramsLog)
            var res = await this.$store.dispatch('menu/WriteModularLog', paramsLog)
          
            console.log(res)
         
            // 检测是否收费
            if (getCookie('roleCode') == 'Parent') {
                var params1 = {
                  featureId: pItem.featurepack.Id
                }
                res = await this.$store.dispatch('menu/CheckLevel',params1)
              
                var result = JSON.parse(res)
                // console.log(result)
                if (result.Data) {
                    // 检测用户
                    var params = {
                      studentId: getCookie('studentId'),
                      type: item.Type,
                      featureId: pItem.featurepack.Id,
                    }
                    res = await this.$store.dispatch('menu/CheckUser',params)
                  
                
                    var result = JSON.parse(res)
                
                    if (result.Data) {
                        this.$store.dispatch('menu/toUrl', item.Url)
                    } else {
                      this.tanShow = '1'
                    }
                } else {
                    this.$store.dispatch('menu/toUrl', item.Url)
                }
            } else { 
                this.$store.dispatch('menu/toUrl', item.Url)
            } 
        },
        gotoVip () {
          if (getCookie('roleCode') == 'Parent') {
            this.$router.push('/vip')
          }
        },
        refreshData () {
          localStorage.clear()
          location.reload()
        },
        //添加积分
        getPoints (typt) {
          var pointParams = {
            loginUresId: getCookie('loginUserId'),
            roleCode: getCookie('roleCode'),
            realName: decodeURI(getCookie('realName')),
            type: typt
          }
          this.$store.dispatch('menu/AddPoint',pointParams).then((res)=>{
            console.log(res)
          })
        }    
    },
     mounted(){
      //  history.pushState(null, null,window.location.href);
      //   window.addEventListener('popstate', function () {
      //     history.pushState(null, null,window.location.href);
      //   });
    }
}
</script>
<style scoped>
    @import url('../../style/Menu.css');
    .item-li{
      position: relative;
    }
    .item-em{
      position: absolute;
      right: 30px;
      top: 0;
    }
  

    .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img{
      height: 2.3rem!important;
    }
</style>
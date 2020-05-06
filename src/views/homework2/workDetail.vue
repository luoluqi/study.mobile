<template>
    <div id="workDetail">
        <headNav title="作业详情"></headNav>
        <div class="detail-t">
            <div class="detail-s">
                <span>{{itemData.SubjectName}}</span>
                <label>{{itemData.CreateTime | formatDateTime('YYYY-MM-DD')}}&nbsp;&nbsp;{{itemData.SubjectName}}作业</label>
            </div>
            <div class="detail-p">
                <span class="left">{{itemData.GradeName}}{{itemData.ClassName}}</span>
                <img v-if="itemData.teacherImgurl" class="right" :src="itemData.teacherImgurl" alt="">
                <img v-else class="right" src="@/assets/img/homeWork/head.png" alt="">
                <span class="right">{{itemData.TeacherName}}</span>
            </div>
        </div>
        <!-- 类型 -->
        <div class="detail-c">
            <div class="detail-c-t">
                <ul>
                    <li v-if="commitData.notReviewList" @click="changeType(0)" style="width:30%" :class="{active:current==0}">已提交({{commitData.notReviewList.length + commitData.reviewList.length}})<div></div></li>
                    <li @click="changeType(1)" style="width:40%" :class="{active:current==1}">已查看未提交({{readData.length}})<div></div></li>
                    <li @click="changeType(2)" style="width:30%" :class="{active:current==2}">未查看({{unReadData.length}})<div></div></li>
                </ul>
            </div>
            <!-- 已提交 -->
           <div class="detail-c-c" v-if="current == 0">
               <!-- 未点评 -->
               <div>
                   <div v-if="commitData.notReviewList" class="detail-wei">
                        <span class="left wei-remark">未点评({{commitData.notReviewList.length}})</span>
                        <div class="right pi-remark" @click="allRemark(commitData.notReviewList)">
                            <span>批量点评</span>
                            <img src="@/assets/img/homeWork/arrR.png" alt="">
                        </div>
                    </div>
                    <div class="d-person">
                        <ul>
                            <li v-for="(item,index) in commitData.notReviewList" :key="index">
                                <div v-if="item.studentName" class="left">
                                    <div class="per-quan " :class="[colorList[index % colorList.length]]">{{item.studentName.substring(item.studentName.length-2,item.studentName.length)}}</div>
                                    <div class="per-name">{{item.studentName}}</div>
                                </div>
                                <div class="right r-remark" @click="oneRemark(item)">
                                    <span>去点评</span>
                                    <img src="@/assets/img/homeWork/a-r.png" alt="">
                                </div>
                            </li>
                        </ul>
                    </div>
               </div>
               <!-- 已点评 -->
               <div>
                   <div v-if="commitData.reviewList" class="detail-wei">
                        <span class="left wei-remark">已点评({{commitData.reviewList.length}})</span>
                    </div>
                    <div class="d-person">
                        <ul>
                            <li v-for="(item,index) in commitData.reviewList" :key="index">
                                <div v-if="item.homeworksubmit.studentName" class="left">
                                    <div class="per-quan" :class="[colorList[index % colorList.length]]">{{item.homeworksubmit.studentName.substring(item.homeworksubmit.studentName.length-2,item.homeworksubmit.studentName.length)}}</div>
                                    <div class="per-name">{{item.homeworksubmit.studentName}}</div>
                                </div>
                                <div class="right r-remark" @click="yiRemark(item)">
                                    <span style="color:#B0B0B0">已点评</span>
                                    <img src="@/assets/img/homeWork/a-r.png" alt="">
                                </div>
                            </li>
                        </ul>
                    </div>
               </div>
           </div>
           <!-- 已查看未提交 -->
           <div class="detail-c-c" v-if="current == 1">
               <div class="d-person" v-if="readData">
                    <ul>
                        <li v-for="(item,index) in readData" :key="index">
                            <div v-if="item.StudentName" class="left">
                                <div class="per-quan" :class="[colorList[index % colorList.length]]">{{item.StudentName.substring(item.StudentName.length-2,item.StudentName.length)}}</div>
                                <div class="per-name">{{item.StudentName}}</div>
                            </div>
                             <div class="right r-remark" v-if="item.IsCommit == 0">
                                <span style="color:#B0B0B0">已查看</span>
                                <img src="@/assets/img/homeWork/a-r.png" alt="">
                            </div>
                            <div class="right r-remark" @click="remind(item.HomeWorkId,item.StudentId,0)" v-if="item.IsRemind == 0 && item.IsCommit == 1">
                                <span>去提醒</span>
                                <img src="@/assets/img/homeWork/a-r.png" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="remind" v-if="readData.length > 0 && readData[0].IsCommit == 1" @click="remind(readData[0].HomeWorkId,null,0)">一键提醒</div>
                <div class="remind2" v-if="readData.length == 0">暂无需要提醒的数据</div>
           </div>
           <!-- 未查看 -->
           <div class="detail-c-c" v-if="current == 2">
               <div class="d-person">
                    <ul>
                        <li v-for="(item,index) in unReadData" :key="index">
                            <div v-if="item.StudentName" class="left">
                                <div class="per-quan" :class="[colorList[index % colorList.length]]">{{item.StudentName.substring(item.StudentName.length-2,item.StudentName.length)}}</div>
                                <div class="per-name">{{item.ParentName}}</div>
                            </div>
                            <div class="right r-remark" @click="remind(item.HomeWorkId,item.StudentId,1)"  v-if="item.IsRemind == 0">
                                <span>去提醒</span>
                                <img src="@/assets/img/homeWork/a-r.png" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="remind" v-if="unReadData.length > 0" @click="remind(unReadData[0].HomeWorkId,null,1)">一键提醒</div>
                <div class="remind2" v-if="unReadData.length == 0">暂无需要提醒的数据</div>
           </div>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
export default {
     name:'workDetail',
     components:{
       headNav
    },
    data () {
        return {
           current: 0,
           colorList:['c1','c2','c3','c4','c5','c6','c7','c8'],
           itemData: '',
           commitData: '',
           readData: [],
           unReadData: [],
           homeworkId:''
        }
    },
    mounted () {
         this.itemData = this.$store.state.homework2.homeworkItem
         if(!this.$store.state.homework2.homeworkItem){
            this.itemData = JSON.parse(localStorage.getItem('homeworkItem'))
         }
        this.homeworkId = this.itemData.Id
        this.homeworkDetail()
    },
    methods: {
         changeType(num){
				this.current = num
            },
            // 列表详情
        homeworkDetail(){
            var prams ={
                homeWorkId:this.itemData.Id
            }
            console.log(this.itemData)
            this.$store.dispatch('homework2/GetCommitList',prams).then((data) => {
                if(data.Code == 200){
                    // 已提交
                    this.commitData = data.Data.commit  
                    // 已查看 未提交
                    this.readData = data.Data.readList  
                    // 未查看
                    this.unReadData = data.Data.unReadList  
                }
                
            })
                
        },
        // 提醒
        remind (homeworkId,studentId,choice) {
             var prams ={
                homeWorkId:homeworkId,
                studentId:studentId,
                choice:choice
            }
             this.$store.dispatch('homework2/Remind',prams).then((data) => {
                 if(data.Code == 200){
                      this.$vux.toast.text('提醒成功', 'top')
                      this.homeworkDetail()
                 }else{
                     this.$vux.toast.text(data.Msg, 'top')
                 }
             })
        },
        // 批量提醒

        // 批量评价
        allRemark(item){
            if(item.length == 0){
                this.$vux.toast.text("暂无数据", 'top')
                return
            }
             this.$store.state.homework2.allStudent = item
            localStorage.setItem('allStudent', JSON.stringify(item))
            this.$router.push('batchRemark')

        },
        // 单个评价
        oneRemark(item){
             this.$store.state.homework2.studentData = item
            localStorage.setItem('studentData', JSON.stringify(item))
            this.$router.push('remarkWork')
        },
        yiRemark(item){
            // this.$vux.toast.text("已经点评过了", 'top')
            this.$store.commit('homework2/sethomeWorkId',item.homeworksubmit.HomeWorkId)
            this.$store.commit('homework2/stuId',item.homeworksubmit.StudentId)
            // this.$store.state.homework2.stuId = item.homeworksubmit.StudentId
            this.$router.push('lookWork')
        }
    }
}
</script>
<style scoped>
    .detail-t{
        height:1.52rem;
        background:rgba(255,255,255,1);
        padding: 0 0.25rem;
        overflow: hidden;
        margin-bottom: 0.1rem;
    }
    .detail-s{
        margin-top: 0.3rem;
    }
    .detail-s span{
        display: inline-block;
        width:0.60rem;
        height:0.36rem;
        line-height: 0.36rem;
        background:rgba(255,153,0,1);
        border-radius:0.08rem;
        vertical-align: text-bottom;
        text-align: center;
        font-size:0.24rem;
        color: #ffffff;
    }
    .detail-s label{
        font-size:0.36rem;
        color: #333333;
    }
    .detail-p{
        line-height: 0.54rem;
        overflow: hidden;
        margin-top: 0.1rem;
    }
    .detail-p span{
        color: #999999;
        font-size: 0.24rem;
    }
    .detail-p img{
        width: 0.54rem;
        height: 0.54rem;
        border-radius: 0.54rem;
        margin-left: 0.1rem;
    }
    .left{
        float: left;
    }
    .right{
        float: right;
    }
    /*  */
    .detail-c{
        background-color: #ffffff;
        overflow: hidden;
    }
    .detail-c-t{
        padding: 0 0.32rem;
        overflow: hidden;
        border-bottom: 1px solid #E5E5E5;
    }
    .detail-c-t li{
        float: left;
        color: #999999;
        font-size: 0.3rem;
        text-align: center;
        overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
         line-height: 0.9rem;
        margin-bottom: 0.1rem;
    }
    .active{
        color: #333333 !important;
    }
    .active div{
          width:0.66rem;
          height:0.08rem;
          background:rgba(18,143,239,1);
          border-radius:0.04rem;
          margin-left: 30%;
    }
    /*  */
    .detail-c-c{
        padding: 0 0.26rem;
    }
    .detail-wei{
        line-height: 1rem;
        height: 1rem;
    }
    .wei-remark{
        font-size: 0.28rem;
        color: #999999;
    }
    .pi-remark span{
        font-size: 0.28rem;
        color: #128FEF;
    }
    .pi-remark img{
        width: 0.12rem;
        height: 0.24rem;
        margin-left: 0.1rem;
    }
    .d-person{
      overflow: hidden;
      width: 100%;
    }
    .d-person li{
        line-height: 0.88rem;
        overflow: hidden;
    }
    .per-quan{
        width:0.60rem;
        height:0.60rem;
        line-height: 0.6rem;
        text-align: center;
        border-radius: 0.6rem;
        float: left;
        margin-top: 0.12rem;
        margin-right: 0.1rem;
        font-size: 0.24rem;
        color: #ffffff;
    }
    .per-name{
        font-size: 0.32rem;
        color: #333333;
        float: left;
    }
    .r-remark span{
        font-size: 0.28rem;
        color: #333333;
    }
    .r-remark img{
        width: 0.12rem;
        height: 0.24rem;
        margin-left: 0.1rem;
    }
    .remind{
        width:6.40rem;
        height:0.80rem;
        background:rgba(18,143,239,1);
        border-radius:0.08rem;
        line-height: 0.8rem;
        text-align: center;
        color: #ffffff;
        margin: 0.28rem auto;
        font-size: 0.32rem;
    }
    .c1{
        background-color: #3EA4F2;
    }
    .c2{
        background-color: #38D68A;
    }
    .c3{
        background-color: #79D754;
    }
    .c4{
        background-color: #7591E3;
    }
    .c5{
        background-color: #24CABD;
    }
    .c6{
        background-color: #F8C83F;
    }
    .c7{
        background-color: #A77CCC;
    }
    .c8{
        background-color: #3CB3D6;
    }
    .remind2{
        text-align: center;
        padding: 1rem 0;
        color: #999;
        font-size: 0.24rem;
    }
</style>
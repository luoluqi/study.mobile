<template>
    <div id="noticeDetail">
        <headNav title="通知详情"></headNav>
        <!--  -->
        <div class="detail-t">
            <div class="detail-s">
                <span>通知</span>
                <label>{{noticeDetail.Title}}</label>
            </div>
            <div class="detail-p">
                <img v-if="noticeDetail.teacherImgurl" class="right" :src="noticeDetail.teacherImgurl" alt="">
                <img v-else class="right" src="@/assets/img/notice/head.png" alt="">
                <span class="right">{{noticeDetail.TeacherName}}</span>
            </div>
        </div>
        <!-- 类型 -->
        <div class="detail-c">
            <div class="detail-c-t">
                <ul>
                    <li @click="changeType(0)" style="width:50%" :class="{active:current==0}">已查看({{readList.readList ? readList.readList.length:0}})<div></div></li>
                    <li @click="changeType(1)" style="width:50%" :class="{active:current==1}">未查看({{readList.unreadList ? readList.unreadList.length:0}})<div></div></li>
                </ul>
            </div>
            <!-- 已看 -->
            <div class="detail-c-c" v-if="current == 0">
                <div class="d-person">
                    <ul>
                        <li v-for="(item,index) in readList.readList" :key="index">
                            <div class="left">
                                <div class="per-quan" :class="[colorList[index % colorList.length]]">{{item.TeacherName.substring(item.TeacherName.length-2,item.TeacherName.length)}}</div>
                                <div class="per-name">{{item.TeacherName}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 未查看 -->
            <div class="detail-c-c" v-if="current == 1">
                 <div class="d-person">
                    <ul>
                        <li v-for="(item,index) in readList.unreadList" :key="index">
                            <div class="left">
                                <div class="per-quan" :class="[colorList[index % colorList.length]]">{{item.TeacherName.substring(item.TeacherName.length-2,item.TeacherName.length)}}</div>
                                <div class="per-name">{{item.TeacherName}}</div>
                            </div>
                            <div v-if="item.IsRemind != 1" @click="remind(item.TeacherId,1)" class="right r-remark">
                                <span>去提醒</span>
                                <img src="@/assets/img/homeWork/a-r.png" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="remind" v-if="readList.unreadList.length>0" @click="remind(null,1)" >一键提醒</div>
                <div class="remind2" v-if="readList.unreadList.length == 0">暂无需要提醒的数据</div>
            </div>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
export default {
    name:'oaNoticeDetail',
    components:{
       headNav
    },
    data() {
        return {
            current: 0,
            colorList: ['c1','c2','c3','c4','c5','c6','c7','c8'],
            readList: []
        }
    },
    computed: {
        noticeDetail () {
            return this.$store.state.oaNotice.noticeDetail
        },
        noticeId () {
            return this.$store.state.oaNotice.noticeId
        }
    },
    mounted(){
        this.getReadList()
    },
    methods:{
        changeType(num){
            this.current = num
        },
        // 获取已读和未读
        getReadList () {
            var params = {
                noticeId: this.noticeId
            }
            this.$store.dispatch('oaNotice/GetReadList', params).then(
                data => {
                    if (data.Code == 200) {
                        this.readList = data.Data
                    }
                }
            )
        },
         // 提醒
        remind (TeacherId, choice) {
             var prams = {
                noticeId: this.noticeId,
                teacherId: TeacherId,
                choice: choice
            }
            this.$store.dispatch('oaNotice/Remind', prams).then((data) => {
                if (data.Code == 200) {
                    this.$vux.toast.text('提醒成功', 'top')
                    this.getReadList()
                } else {
                    this.$vux.toast.text(data.Msg, 'top')
                }
            })
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
          margin-left: 35%;
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
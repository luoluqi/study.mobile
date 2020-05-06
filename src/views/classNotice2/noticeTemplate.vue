<template>
    <div id="noticeTemplate">
        <headNav title="通知模板"></headNav>
        <div class="notice-c">
            <!-- 推荐模板 -->
            <div class="template-item">
                <div class="template-tit"><img src="@/assets/img/notice/tuijian.png" alt="">推荐模板</div>
                <ul>
                    <li :class="{active:current== item.Id}" @click="addClass(item.Id, item)"  v-for="(item,index) in recommendList" :key="index">{{item.Title}}</li>
                </ul>
            </div>
            <!-- 其他模板 -->
            <div class="template-item" v-for="(item,index) in noticeTemplateTypeList" :key="index">
                <div class="template-tit"><img :src="[titIcon[index % titIcon.length]]" alt="">{{item.typeName}}</div>
                <ul>
                    <li :class="{active:current== item2.Id}" @click="addClass(item2.Id, item2)" v-for="(item2,index) in item.list" :key="index">{{item2.Title}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
export default {
    name:'noticeTemplate',
     components:{
       headNav
    },
    data() {
        return {
            titIcon: [
                require('@/assets/img/notice/richang.png'),
                require('@/assets/img/notice/anquan.png'),
                require('@/assets/img/notice/jiaqi.png'),
                require('@/assets/img/notice/huodong.png')
            ],
            recommendList: [],
            noticeTemplateTypeList: []
        }
    },
    mounted () {
         this.getNoticeByType()
    },
    computed: {
        current () {
            return this.$store.state.notice2.currentTemplate.Id
        }
    },
    methods:{
        addClass(id, item){
          this.$store.commit('notice2/setTemplate', item)
          this.$router.go(-1)
        },
        getNoticeByType(){
            this.$store.dispatch('notice2/GetNoticeByType').then((data) => {
                if(data.Code == 200){
                    this.recommendList = data.Data.RecommendList
                    this.noticeTemplateTypeList = data.Data.NoticeTemplateTypeList
                }
            })
       }
    }
}
</script>
<style scoped>
.template-item{
    background: #ffffff;
    padding: 0.24rem;
    margin-top: 0.14rem;
}
.template-tit{
    color: #333333;
    font-size: 0.32rem;
}
.template-tit img{
    width: 0.32rem;
    height: 0.32rem;
    float: left;
    margin-top: 0.1rem;
    margin-right: 0.05rem;
}
.template-item ul{
    overflow: hidden;
}
.template-item ul li{
    padding: 0.17rem;
    border:1px solid rgba(202, 202, 202, 1);
    border-radius:0.08rem;
    float: left;
    font-size: 0.28rem;
    color: #555555;
    margin-top: 0.25rem;
    margin-right: 0.24rem;
}
.active{
    background-color: #38A1F2 !important;
     border:1px solid #38A1F2 !important;
     color: #ffffff !important;
}
</style>
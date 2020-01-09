<template>
    <div style="background-color: #fff;">
         <headNav title="成绩统计"></headNav>
        <div class="examList">
            <div class="leftSubject">
                <ul>
                    <li @click="getSubject(index,item)" :class="activeClass == index ? 'active':''" v-for="(item,index) in subjectData" :key="index"><span class="sub">{{item.Name}}</span></li>
                    <!-- <li class="active"><span class="sub">语文</span></li>
                    <li><span class="sub">语文</span></li>
                    <li><span class="sub">语文</span></li> -->
                </ul>
            </div>
            <div class="tableContent">
                <infiniteScroll  @loadMore="loadMore">
                <ul>
                    <li v-for="(item,index) in examData" :key="index" @click="getExamItem(item)">
                        <div class="examName"><img src="@/assets/img/exam/text.png" alt=""><span>{{item.examName}}</span></div>
                        <span class="examNum">考试ID：{{item.examId}} </span>
                    </li>
                </ul>
                  <div class="load-p">
                    <load-more v-if="isMore" :tip="'正在加载'"></load-more>
                    <load-more v-else :show-loading="false" :tip="'没有更多了'" background-color="#fbf9fe"></load-more>
                </div>
                </infiniteScroll>
            </div>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
import infiniteScroll from '@/components/infiniteScroll'
import { LoadMore} from 'vux'
export default {
    components: {
        headNav,
        infiniteScroll,
        LoadMore
  },
    data() {
        return {
            activeClass:'',
            subject:''
        }
    },
    mounted(){
      this.getSubjectList()
    //   this.getExamListTeachBySubject()
    },
     computed: {
        subjectData(){
            return this.$store.state.exam.subjectData
        },
        examData(){
            return this.$store.state.exam.examData
        },
        isMore(){
             return this.$store.state.exam.isMore
        }
    },
    methods:{
        // 科目列表
      getSubjectList(){
           this.$store.dispatch('exam/getSubjectList')
        },
        // 家长获取考试列表GetExamListParentBySubject
        getSubject(index,subject){
          this.subject = subject
          this.activeClass = index
          this.$store.commit('exam/clearData')
          this.$store.dispatch('exam/getExamListParentBySubject',subject)
        },
        loadMore(){
            this.$store.dispatch('exam/getExamListParentBySubject',this.subject)
        },
        getExamItem(item){
            this.$router.push('statisticsDeatail')
            this.$store.commit('exam/setExamItem',item)
        }
    }
}
</script>
<style scoped>
.examList{
    height: calc(100% - 0.88rem);
}
.leftSubject{
    float: left;
    width: 1.48rem;
    background-color: #F1F6F9;
    height: 100%;
    overflow: auto;
}
.leftSubject li{
    height: 1.12rem;
    line-height: 1.12rem;
    text-align: center;
    font-size: 0.28rem;
    color: #333333;
    border-bottom: 1px solid #fff;
}
.active{
  background: #ffffff
}
.active .sub{
     border-left: 0.06rem solid #098EE5;
    line-height: 0.28rem;
    width: 1.48rem;
    display: inline-block;
}
.tableContent{
    float: left;
    width: calc(100% - 1.48rem);
    height: 100%;
}
.tableContent li{
  height: 1.25rem;
  border-bottom: 1px dashed #BBBBBB;
  margin: 0 0.24rem;
      overflow: hidden;
}
.examName{
    margin-top: 0.24rem;
    margin-bottom: 0.1rem;
}
.examName img{
    width: 0.25rem;
    height: 0.26rem;
    float: left;
    margin-top: 0.06rem;
    margin-right: 0.08rem;
}
.examName span{
    font-size: 0.28rem;
    color: #333333;
    display: inline-block;
    width: 4.5rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.examNum{
    color: #999999;
    font-size: 0.24rem;
    display: inline-block;
    width: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.nomore{
        text-align: center;
    margin-top: 3rem;
    color: #999;
}
.load-p{
	padding: 1rem 0 0 0;
}
</style>
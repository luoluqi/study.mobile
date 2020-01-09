<template>
    <div>
        <headNav title="班级圈"></headNav>
        <div class="scroll-container">
            <infiniteScroll  @loadMore="loadMore">
        <div class="grade-p">
            <span class="classGrad">{{gradeName}}{{className}}</span>
            <div v-if="type == 2" @click="subListShow" class="subjectSel">科目筛选<img src="@/assets/img/circle/arrow-xia.png" alt=""></div>
            <img @click="publish" class="camera" src="@/assets/img/circle/camera.png" alt="" srcset="">
        </div>
        <div class="tab-list">
            <div class="tab-item "  @click="handle(3)" :class="{'active':type == 3}">
                班级风采
                <div class="tab-item-line"></div>
            </div>
            <div class="tab-item"  @click="handle(1)" :class="{'active':type == 1}">
                课余天地
                 <div class="tab-item-line"></div>
            </div>
            <div class="tab-item"  @click="handle(2)" :class="{'active':type == 2}">作业快照</div>
        </div>
        <div>
            <list  ></list>
           
        </div>
        <div class="popout" v-if="isShow">
            <div class="win" @click="subListHide"></div>
            <div class="bottomPopout">
                <div class="selSub">
                    <span class="selQueding" @click="subListHide">取消</span>
                    <span class="subAll">选择科目</span>
                    <!-- <span @click="subListHide" class="selQuxiao">确定</span> -->
                </div>
                <div class="subList">
                    <ul>
                         <li 
                        @click="changeSubject()"
                      :class="{'active':subjectId == ''}"
                        >全部</li>
                        <li 
                        @click="changeSubject(item)"
                        v-for="(item,index) in subjectData" 
                        :key="index" 
                        :class="{'active':item.id == subjectId}"
                        >{{item.name}}</li>
                        
                    </ul>
                </div>
            </div>
        </div>
            </infiniteScroll>
        </div>
         <bottomNav></bottomNav>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import headNav from '@/components/headNav/headNav';
import bottomNav from '@/components/bottomNav/bottomNav';
import list from './list.vue'
import infiniteScroll from '@/components/infiniteScroll'
import bus from '@/util/bus'
import {getStudentDetail} from "@/api/studyApi"
import {getTokenByMoblie,getTeacher} from '@/api/commonApi'
export default {
    components: {
        headNav,
        bottomNav,
        list,
        infiniteScroll
  },
 computed:{
        subjectData(){
            return this.$store.state.circle.subjectData
        },
         subjectId(){
            return this.$store.state.circle.subjectId
        },
        gradeName(){
            
            return this.$store.state.user.gradeName
        },
        className(){
            return this.$store.state.user.className
        },
        type(){
            return this.$store.state.circle.type
        }
    },
    data () {
        return {
          
             isShow:false
        }
    },
    methods:{
        handle(type){
           this.$store.state.circle.type = type
           this.$store.state.circle.isAddCom = false
           this.$store.commit('circle/clearData')
         
           this.$store.dispatch('circle/circleDataList')
        },
        subListShow(){
            this.isShow = true
        },
        subListHide(){
            this.isShow = false
        },
        publish(){
            if(this.$store.state.user.classList.length == 0 && this.type == 3){
                this.$vux.toast.text('只有老师可以发班级风采', 'top')
                return
            }

             this.$router.push('addCircle')
            
        },
        loadMore(){
            this.$store.dispatch('circle/circleDataList')
        },
        changeSubject(item){
            
            this.$store.commit('circle/clearData')
            if(item){
                this.$store.state.circle.subjectId = item.id
            }else{
                this.$store.state.circle.subjectId = ''
            }
           
            this.subListHide()
            
            this.$store.dispatch('circle/circleDataList')
        }
    },
    mounted(){
     


        this.$store.dispatch('circle/getSubjectData')

        this.$store.dispatch('user/getUserInfo').then(res => {
            
            console.log('user info:',this.$store.state.user)
        })
    }
}
</script>
<style  scoped>
.scroll-container{height: calc(100% - 1.98rem);}
.grade-p{height: 2.71rem;background: url(../../assets/img/bj-qj.png) no-repeat;background-size:cover;font-size: 0.28rem;
position: relative;color: #fff;height: 1.12rem;padding: 0.35rem 0.24rem;box-sizing: border-box;}
.camera{position: absolute;top: 0.16rem;right: 0.16rem;width: 0.72rem;height: 0.72rem;}
.tab-list{text-align: center;font-size: 0;border-bottom: 1px solid #dddddd;background-color: #fff;}
.tab-item{display: inline-block;width: 2.36rem;height: 0.9rem;line-height: 0.9rem;color: #888888;font-size: 0.32rem;position: relative;}
.tab-item.active{color: #0a8de5;border-bottom: 1px solid #0a8de5;}
.tab-item-line{position: absolute;border-left: 1px solid #dddddd;height: 0.32rem;top: 0.29rem;right: 0;}
.classGrad{
        float: left;
    width: 3rem;
    line-height: 0.54rem;
}
.subjectSel{
    float: left;
    font-size: 0.24rem;
    color: #fff;
    width: 1.56rem;
    height: 0.54rem;
    text-align: center;
    border: 0.01rem solid #fff;
    line-height: 0.54rem;
    border-radius: 0.08rem;
    background-color: #41b0ed;
}
.subjectSel img{
    width: 0.21rem;
    height: 0.11rem;
    display: inline-block;
    margin-left: 0.1rem;
    vertical-align: middle;
}
.win{
    position: fixed;
    z-index: 200;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    top: 0;
    left: 0;
}
.bottomPopout{
    width: 100%;
    height: 4.86rem;
    position: absolute;
    bottom: 0;
    background-color: #fff;
    z-index: 999;
}
.selSub{
    height: 0.88rem;
    background-color: #eeeeee;
    padding: 0 0.24rem;
    line-height: 0.88rem
}
.selSub span{
    display: inline-block;
    font-size: 0.28rem
}
.selQueding{
 color: #0a8de5;
}
.subAll{
  text-align: center;
  width: 5.4rem;
}
.selQuxiao{
    text-align: right;
    color: #0a8de5;
}
.subList{
    padding: 0.24rem;
    overflow: auto;
    height: 3.3rem;

}
.subList li{
    float: left;
    padding: 0.1rem 0.2rem;
    border: 0.01rem solid #bbbbbb;
    border-radius: 0.08rem;
    margin-right: 0.2rem;
    margin-bottom: 0.2rem;
}
.subList li.active{
    border: 0.01rem solid #0a8de5;
    background-color: #0a8de5;
    color: #ffffff
}
</style>
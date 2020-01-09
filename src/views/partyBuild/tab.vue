<template>
<div>
    <div v-if="fristTabList.length > 0" class="menu-list">
        <div @click="change(0)" class="menu-item">
            <img v-if="index == 0" class="menu-img" src="@/assets/img/partyBuild/news-icon-active.png" >
             <img v-else class="menu-img" src="@/assets/img/partyBuild/news-icon.png" >
            <div>{{fristTabList[0].typeName}}</div>
        </div>
        <div  @click="change(1)" class="menu-item">
            <img v-if="index == 1"  class="menu-img" src="@/assets/img/partyBuild/ren-icon-active.png" >
            <img v-else class="menu-img" src="@/assets/img/partyBuild/ren-icon.png" >
             <div>{{fristTabList[1].typeName}}</div>
        </div>
        <div  @click="change(2)" class="menu-item">
            <img v-if="index == 2" class="menu-img" src="@/assets/img/partyBuild/study-icon-active.png" >
            <img v-else class="menu-img" src="@/assets/img/partyBuild/study-icon.png" >
            <div>学习强国</div>
        </div>
        <div  @click="change(3)" class="menu-item">
            <img v-if="index == 3" class="menu-img" src="@/assets/img/partyBuild/sign-icon-active.png" >
            <img v-else class="menu-img" src="@/assets/img/partyBuild/sign-icon.png" >
            <div>每日签到</div>
        </div>
    </div>
    <sign :signResult='signResult'></sign>
</div>
</template>
<script>
import sign from './sign'
export default {
    data () {
        return{
            signResult:''
        }
    },
    components:{
        sign
    },
    props:{
        index:{
            type:Number,
            default:0
        }
    },
    computed:{
        fristTabList(){
            return this.$store.state.news.fristTabList
        },
        curFristTab(){
            return this.$store.state.news.curFristTab
        }
    },
    methods: {
        change(type){
            
            switch(type){
                case 0:
                    this.$router.push('news')
                    
                        this.$store.dispatch('news/changeFristType',this.fristTabList[0])
                        
                    
                     break;
                case 1:
                    this.$router.push('read')
                    
                   
                        this.$store.dispatch('news/changeFristType',this.fristTabList[1])
                    
                   
                     break;
                case 2:
                    this.$router.push('study')
                    break;
                case 3:
                    this.$store.commit('partyBuild/openSign')
                    this.sign(this.$store.state.user.teacherId)
                break;
            }
        },
        sign (teacherId) {
            this.$store.dispatch('sign/Sign', {teacherId}).then(res => {
                if (res.Code == 200) {
                    this.signResult = res.Data
                }
            }) 
        }
    },
    mounted(){
        this.$store.dispatch('news/getNewsTypeParent',{
            schoolId : this.$store.state.user.schoolId
        }).then(() => {

        })
    }
}
</script>
<style scoped>
.menu-list{
    display: flex;
    justify-content:space-around;
    background: url(../../assets/img/bj-qj.png);
    background-size: cover;
    padding: 0 0 0.2rem 0;
}
.menu-item{
    text-align: center;
    color: #fff;
}
.menu-img{
    display: inline-block;
    width: 0.86rem;
    height: 0.86rem;
}
</style>
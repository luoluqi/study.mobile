<template>
    
        <div id="noticeIndex">
            <headNav title="公告"></headNav>
            <div class="noticeIndex">
                <img :src="headImg" />
                <div class="detailtext">
                    <h2><span>{{gradeName}}</span><label>{{className}}</label></h2>
                    <h3 >{{schoolName}}</h3>
                </div>
                <div v-show="teacherId" 
                @click="toPublish" class="publish">发布通知</div>
            </div>
            <div class="InList">
                <ul>
                    <li @click="toList">
                        <img class="biao" src="@/assets/img/lingdang.png" />
                        <span>班级通知</span>
                        <i v-show="roleCode == 'Parent' && count > 0">{{count}}</i>
                        <img class="arrow_ri" src="@/assets/img/a-arrow.png" />
                    </li>
                    <!--<li>
                        <img class="biao" src="@/assets/img/laba.png" />
                        <span>学校通知</span>
                        <i>20</i>
                        <img class="arrow_ri" src="@/assets/img/a-arrow.png" />
                    </li>
                    <li>
                        <img class="biao" src="@/assets/img/shengyin.png" />
                        <span>系统通知</span>

                        <img class="arrow_ri" src="@/assets/img/a-arrow.png" />
                    </li>-->
                </ul>
            </div>
        </div>
    
</template>
<script>
import headNav from '@/components/headNav/headNav'
import {getUnReadNumber} from '@/api/noticeApi'
import   cookie from '@/util/cookie'
export default {
    components:{
        headNav
    },
    computed:{
        headImg(){
            return cookie.get('img')
        },
        schoolName(){
            return this.$store.state.user.schoolName
        },
        gradeName(){
            return this.$store.state.user.gradeName
        },
        className(){
            return this.$store.state.user.className
        },
        teacherId(){
            return this.$store.state.user.teacherId
        },
        roleCode(){
            return this.$store.getters['user/roleCode']
        }
        
    },
    data(){
        return {
            count:0
        }
    },
    methods:{
        toList(){
            this.$store.commit('notice/clearList')
            this.$store.dispatch('notice/getList')
            this.$router.push('list')
        },
        toPublish(){
            this.$router.push('teacherPublish')
        },
        getUnReadNumber(){
            getUnReadNumber({
                parentId:this.$store.getters['user/parentId'],
                gradeId:this.$store.state.user.gradeId,
                classId:this.$store.state.user.classId
              
            }).then(res => {
                
                res = JSON.parse(res)
                this.count = res.Data

            })
        }
    },
    mounted(){
        console.log(11111)
        this.$store.dispatch('user/getUserInfo').then(res => {
            if(this.roleCode == 'Parent'){
                this.getUnReadNumber()
            }
        })
       
    }
}
</script>
<style scoped src="@/assets/css/NoticeV2.css"></style>
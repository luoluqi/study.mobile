<template>
    <div id="publishNotice" style="background-color: #FFFFFF;padding-bottom: 0.2rem;">
         <headNav title="公告"></headNav>
    <div class="serch_infrom">
        <ul>
            <li class="checkR">
                <p>通知类型：</p>
                <div>
                    <label>
                        <input id="csradio" type="radio" name="radio" checked />
                        班级通知
                    </label>
                </div>
                <div style="display:none"><label><input type="radio" name="radio" />学校通知</label></div>
            </li>
            <li>
                <p>通知班级：</p>
              
                <div @click="selectClass(index)"
                v-for="(item,index) in classList" 
                :key="index" 
                :class="{'on_bk':item.selected}">
                        {{item.GradeName}}{{item.ClassName}}
                </div>
            </li>

            <li>
                <p>通知标题：</p>
                <input v-model.trim="title" type="text" class="tit" placeholder="输入标题" >
            </li>
            <li>
                <p>通知内容：</p>
                <textarea v-model="content" placeholder="请输入内容" ></textarea>
            </li>
        </ul>
    </div>
    <div @click="comfirm" class="serch_ss">确定发布</div>
</div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import {addNotice} from '@/api/noticeApi'
export default {
    components:{
        headNav
    },
    computed:{
        classList(){
            return this.$store.state.user.classList
        }
    },
    data(){
        return {
            title:'',
            content:'',
           
        }
    },
    methods:{
        selectClass(index){
            
            if(this.$store.state.user.classList[index].selected){
                this.$store.state.user.classList[index].selected = false

            }else{
                this.$store.state.user.classList[index].selected = true
            }
            this.$store.state.user.classList.splice(index,1,this.$store.state.user.classList[index])
        },
        comfirm(){
            if(!this.title){
                this.$vux.toast.text('请填写标题', 'top')
                return
            }
            if(this.content.replace(/\s/g,'') == ''){
                this.$vux.toast.text('请填写内容', 'top')
                return
            }
            var selectedClass = []
            for(var item of this.classList){
                if(item.selected){
                    selectedClass.push(item)
                }
            }
            if(selectedClass.length == 0){
                this.$vux.toast.text('请选择班级', 'top')
                return
            }
            
            var param = {
                Title: this.title,
                Content: this.content,
                TeacherId: this.$store.state.user.teacherId,
                TeacherName:this.$store.state.user.realName,
                SchoolId: this.$store.state.user.schoolId,
                SchoolName: this.$store.state.user.schoolName,
                GradeId: selectedClass.map(item => {return item.GradeId}).join(),
                GradeName: selectedClass.map(item => {return item.GradeName}).join(),
                ClassId: selectedClass.map(item => {return item.ClassId}).join(),
                ClassName: selectedClass.map(item => {return item.ClassName}).join(),
                AnnounceFlag:1
            }
            
            addNotice(param).then(res => {
                
                res = JSON.parse(res)
                if(res.Code == 200){
                    this.$vux.toast.text('发布成功', 'top')
                    for(var item of this.$store.state.user.classList){
                        item.selected = false
                    }
                    this.$router.go(-1)
                }
            })
        }
    },
    mounted(){
      
    }
}
</script>
<style scoped src="@/assets/css/NoticeV2.css"></style>
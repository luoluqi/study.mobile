<template>
    <div>
        <div v-if="isShow">
            <div class="win"></div>
            <div class="classDetail">
                <div v-show="!loading" class="centent">
                    <div class="selTittle">选择播报对象</div> 
                     <div class="allStyle">
                         <div  @click="checkSchool" style="width: 2.4rem;">
                             <check-icon  :value.sync="allSchool"> 全校 </check-icon>
                         </div>
                    </div>
                    <div class="classConter">
                         <tree ref="tree"
                            :data="treeData" 
                            @unselect='unselect'
                            @select="select"
                            :props="{label: 'name', id:'id', children: 'children'}">
                        </tree>
                    </div>
                    <div class="caoBtn">
                        <div class="reset" @click="reset">重置</div>
                        <div class="confirm" @click="confirm">确定</div>
                    </div>
                </div>
                <div v-if="loading" class="centent">
                    <div class="selTittle"> 加载中...</div> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import tree from '@/components/treeForClass/tree'
import { CheckIcon } from 'vux'

export default {
    components:{
       tree,
       CheckIcon
    },
    data() {
        return {
            // remarkData:'123',
            treeData:[],
            classData:[],
            allSchool:false,
            loading: true
        }
    },
     props:{
        isShow:{
            type:Boolean,
            default:true
        }
    },
    mounted() {
        this.getGradList()
    },
    methods:{
        confirm(){
            this.$emit('hide')
            this.classData = this.$refs.tree.getSelectedList()
            for (var i = this.classData.length - 1; i >=0; i--) {
                if(this.classData[i].level == 0){
                    this.classData.splice(i, 1)
                }
            }
            // this.classData.forEach((obj,index) => {
            //     if(obj.level == 0){
            //       this.classData.splice(index,1)
            //    }
            // })
            if(this.allSchool){
                this.classData = []
                this.$store.state.broadcast.isSchool = 1
            }else{
                this.$store.state.broadcast.isSchool = 2
            }
            this.$emit('remarkData',this.classData)
        },
        reset(){
            this.classData = []
            this.allSchool = false
            this.$store.state.broadcast.isSchool = 0
            this.$refs.tree.allUnSelect()
        },
        unselect(){
            this.allSchool = false
        },
        select(){
            this.allSchool = this.$refs.tree.isAllSelected()
           
        },
        // 获取年级
         getGradList(){
            var prams = {
                schoolId:this.$store.getters['user/schoolId']
            }
            
            this.$store.dispatch('broadcast/GradesBySchoolId',prams).then(async (data) => {
                var list = data.data
               
                for(let item of list){
                  

                    var res = await this.getClassList(item.id)

                   item.children = res
                }
                this.treeData = list

                this.loading = false
            })
        },
        getClassList(gradeId) {
            return new Promise((resolve, reject) => {
                 var prams = {
                    schoolId:this.$store.getters['user/schoolId'],
                    gradeId:gradeId,
                    PageNum:1,
                    PageSize: 100
                }
               
                this.$store.dispatch('broadcast/ClassList',prams).then((data) => {
                    for(var item of data.items) {
                        item.name = item.gradeName + item.className
                        item.id = item.classId
                        item.children = []
                    }
                    resolve(data.items)
                })
            })
            
        },
        checkSchool(){
            if(this.allSchool){
                // 全校
                 this.$refs.tree.allSelect()
                 this.$store.state.broadcast.isSchool = 1
            }else{
                // 班级
                this.$refs.tree.allUnSelect()
                this.$store.state.broadcast.isSchool = 2
            }
        }
    }
}
</script>
<style  scoped>
.win{
    position: fixed;
    background: black;
    opacity: 0.2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.classDetail{
    position: absolute;
    left: 0.4rem;
    top: 2.15rem;
    background-color: #fff;
    width: 6.4rem;
    height: 8.50rem;
    background: rgba(255,255,255,1);
    border-radius: 10px;
    z-index: 1000;
}
.centent{
    margin: 0 0.6rem;
}
.selTittle{
    line-height: 1.1rem;
    text-align: center;
    font-size: 0.32rem;
    border-bottom: 1px solid #E6E6E6;
}
.classConter{
    height: 5.7rem;
    overflow: auto;
}
.caoBtn{
    border-top: 1px solid #E6E6E6;
    padding-top: 0.14rem;
}
.reset{
    width: 49%;
    font-size: 0.26rem;
    display: inline-block;
    text-align: center;
    border-right: 1px solid #E6E6E6;
    line-height: 0.5rem;
}
.confirm{
    width: 49%;
    font-size: 0.26rem;
    color: #128FEF;
    display: inline-block;
    text-align: center;
    line-height: 0.5rem;
}
/*  */
.arrow{
    cursor: pointer;
    display: inline-block;
    transition: transform .3s;
}
.arrowTransform{
    transform: rotate(90deg);
}
.selected{
    background: #2b85e4;
}
.allStyle{
    font-size: 0.3rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #E6E6E6;
}
</style>
<style>
.allStyle .weui-icon-success:before{
    color:#2b85e4 !important;
}
</style>

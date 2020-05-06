<template>
    <div>
        <selectTeacher @comfirm='comfirm'></selectTeacher>
    </div>
</template>
<script>
   

import selectTeacher from '@/components/selectTeacher'
export default {
    components:{
       selectTeacher
    },
    data(){
        return {
         
        }
    },

    methods:{
         getParam(){
            var search = location.search
            search = search.substring(1)
            var arr = search.split('&')
            var param = {}
            for(var item of arr){
                var list = item.split('=')
                param[list[0]] = list[1]
            }
            return param
        },
        comfirm () {
            if (this.$store.state.oa.addType == 1) {
                this.$store.commit('oa/addApprover', this.teacherList)
            } else {
                this.$store.commit('oa/addCopyMans', this.teacherList)
            }
            this.$router.go(-1)

        }
    },
    mounted(){
      var a = this.getParam()
    },
    computed: {
        addType () {
            return this.$store.state.oa.addType
        },
        teacherList () {
            return this.$store.state.selectTeacher.teacherList
        }
    }
}
</script>
<style scoped>
.aaa{height: 3rem;}
</style>
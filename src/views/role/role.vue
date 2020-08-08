<template>
    <div class="role-p">
       
            <div @click="changeRole('Teacher')"  class="role-item">
                <img src="@/assets/img/role/teacher.png" alt="" class="role-img">
            </div> 
            <div @click="changeRole('Parent')" class="role-item">
                <img src="@/assets/img/role/parent.png"  alt="" class="role-img">
            </div>
              
    </div>
</template>
<script>
import {setCookie} from '@/util/tool'
import {refreshToken} from '@/api/commonApi'
import cookie from '@/util/cookie'
export default {
    methods: {
        changeRole (role) {
            
            setCookie('roleCode', role, 0)
            this.$store.state.user.roleCode = role
             this.$store.state.user.isSchoolAdmin = false
            this.$store.state.user.reloadToken = true
            localStorage.clear()
             this.$router.push('/menu/index')
        },
        refreshToken () { 
        }
    },
    mounted () {

    }
}
</script>
<style scoped>
html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

body {
    font-family: 'Microsoft YaHei';
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

.role-p {
    background: url(../../assets/img/role/sel-bg.jpg) no-repeat;
    background-size: cover;
    height: 100%;
}

.role-item {
    height: 50%;
    width: 100%;
    text-align: center;
    display: block;
}

    .role-item::before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }

.role-img {
    width: 2.72rem;
    height: 1.12rem;
    display: inline-block;
    vertical-align: middle;
}
</style>

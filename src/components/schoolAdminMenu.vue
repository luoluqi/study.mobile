<template>
    <div>
         <div v-if="isSchoolAdmin" class="workbench workbenchim">
            <h2 class="workbenc_h2">
              <div>校管功能</div>
            </h2>
            <ul  class="menu-list">
                <!-- <li  class="menu-item" @click="toStudy('http://m.xueerqin.net/study/index.html#oaNotice/noticeList')">
                  <img class="menu-img" src="@/assets/t_notice.png">
                  <p class="menu-text">老师公告</p>
                </li>
                 <li  class="menu-item" @click="toStudy('http://m.xueerqin.net/study/index.html#classNotice2/manageList')">
                  <img class="menu-img" src="@/assets/p_notice.png">
                  <p class="menu-text">家长公告</p>
                </li> -->
                 <li  class="menu-item" @click="toStudy('http://m.xueerqin.net/study/index.html#/kitchen/index')">
                    <img class="menu-img" src="@/assets/kitchen.png">
                    <p class="menu-text">明厨亮灶</p>
                </li>

                <li  class="menu-item" @click="toStudy('http://m.xueerqin.net/study/index.html#/sos/schoolAdminSos')">
                    <img class="menu-img" src="@/assets/sos.png">
                    <p class="menu-text">SOS设置</p>
                </li>
                <li  class="menu-item" @click="toStudy('http://m.xueerqin.net/study/index.html#/broadcast/adminList')">
                    <img class="menu-img" src="@/assets/broad.png">
                    <p class="menu-text">语音广播</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {getCookiesObj, setCookie, getCookie} from '@/util/tool'
export default {
     computed: {
      isSchoolAdmin(){
        return this.$store.state.user.isSchoolAdmin
      }
    },
    methods: {
         toStudy(url){
            location.href = url
        }
    },
    mounted () {
      
    }
}
</script>
<style scoped>

    @import url('../style/Menu.css');

</style>
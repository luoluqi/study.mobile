<template>
    <div id="noticeDetail">
        <headNav title="通知详情"></headNav>
        <!--  -->
        <div class="detail-t">
            <div class="detail-s">
                <span>通知</span>
                <label>{{noticeDetail.Title}}</label>
            </div>
            <div class="detail-p">
                <span class="left">
                    <select @change="chooseGrade" v-model="gradeId">
                        <option value="">
                            请选择年级
                        </option>
                        <option v-for="(item,index) in gradeList" :key='index' :value="item.id">{{item.name}}</option>
                    </select>
                    <select @change="chooseClass" v-model="classId">
                        <option value="">
                            请选择班级
                        </option>
                        <option v-for="(item,index) in classList" :key='index' :value="item.classId">{{item.className}}</option>
                    </select>
                </span>
                <img v-if="noticeDetail.teacherImgurl" class="right" :src="noticeDetail.teacherImgurl" alt="">
                <img v-else class="right" src="@/assets/img/notice/head.png" alt="">
                <span class="right">{{noticeDetail.TeacherName}}</span>
            </div>
        </div>
        <!-- 类型 -->
        <div class="detail-c">
            <div class="detail-c-t">
                <ul>
                    <li @click="changeType(0)" style="width:30%" :class="{active:current==0}">已交回执({{readList.commitList ? readList.commitList.length:0}})<div></div></li>
                    <li @click="changeType(1)" style="width:40%" :class="{active:current==1}">已查看未提交({{readList.readList ? readList.readList.length:0}})<div></div></li>
                    <li @click="changeType(2)" style="width:30%" :class="{active:current==2}">未查看({{readList.unreadList ? readList.unreadList.length:0}})<div></div></li>
                </ul>
            </div>
            <!-- 已交回执 -->
            <div class="detail-c-c" v-if="current == 0">
                <div class="d-person">
                    <ul>
                        <li v-for="(item,index) in readList.commitList" :key="index">
                             <div class="left">
                                <div class="per-quan" :class="[colorList[index % colorList.length]]">{{item.StudentNames.substring(item.StudentNames.length-2,item.StudentNames.length)}}</div>
                                <div class="per-name">{{item.StudentNames}}</div>
                            </div>
                            <div class="right r-remark">
                                <span style="color:#B0B0B0">{{item.ConfirmDateTime | formatDateTime('YYYY-MM-DD HH:mm:ss')}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 已看未提交 -->
            <div class="detail-c-c" v-if="current == 1">
                <div class="d-person">
                    <ul>
                        <li v-for="(item,index) in readList.readList" :key="index">
                            <div class="left">
                                <div class="per-quan" :class="[colorList[index % colorList.length]]">{{item.StudentNames.substring(item.StudentNames.length-2,item.StudentNames.length)}}</div>
                                <div class="per-name">{{item.StudentNames}}</div>
                            </div>
                            <div v-if="noticeDetail.IsCommit != 1" class="right r-remark" style="color:#b0b0b0">
                                <span>已查看</span>
                                <img src="@/assets/img/homeWork/a-r.png" alt="">
                            </div>
                            <div v-if="noticeDetail.IsCommit == 1 && item.IsRemind != 1" @click="remind(item.ParentId,0)" class="right r-remark">
                                <span>去提醒</span>
                                <img src="@/assets/img/homeWork/a-r.png" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="remind" v-if="readList.readList.length>0 && noticeDetail.IsCommit == 1" @click="remind(null,0)" >一键提醒</div>
                <div class="remind2" v-if="readList.readList.length == 0">暂无需要提醒的数据</div>
            </div>
            <!-- 未查看 -->
            <div class="detail-c-c" v-if="current == 2">
                 <div class="d-person">
                    <ul>
                        <li v-for="(item,index) in readList.unreadList" :key="index">
                            <div class="left">
                                <div class="per-quan" :class="[colorList[index % colorList.length]]">{{item.StudentNames.substring(item.StudentNames.length-2,item.StudentNames.length)}}</div>
                                <div class="per-name">{{item.StudentNames}}</div>
                            </div>
                            <div v-if="item.IsRemind != 1" @click="remind(item.ParentId,1)" class="right r-remark">
                                <span>去提醒</span>
                                <img src="@/assets/img/homeWork/a-r.png" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="remind" v-if="readList.unreadList.length>0" @click="remind(null,1)" >一键提醒</div>
                <div class="remind2" v-if="readList.unreadList.length == 0">暂无需要提醒的数据</div>
            </div>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
export default {
    name:'noticeDetail',
     components:{
       headNav
    },
    data() {
        return {
            current: 0,
            colorList: ['c1','c2','c3','c4','c5','c6','c7','c8'],
            readList: [],
            gradeId: '',
            classId: '',
            gradeList: [],
            classList: []
        }
    },
    computed: {
        noticeDetail () {
            return this.$store.state.notice2.noticeDetail
        }
    },
    mounted(){
        console.log(this.noticeDetail)
        this.getReadList()
        this.getGrade()
    },
    methods:{
        // 选择年级
        chooseGrade () {
            this.classList = []
            this.classId = ''
            this.getReadList()
            if (!this.gradeId) return
            this.getClass()
        },
        // 选择班级
        chooseClass () {
            this.getReadList()
        },
        changeType(num){
            this.current = num
        },
        // 获取年级
        getGrade () {
            var params = {
                schoolId: this.$store.getters['user/schoolId']
            }
            this.$store.dispatch('notice2/GetGrade',params).then(
                res => {
                    this.gradeList = res
                }
            )
        },
        // 获取班级
        getClass () {
            var params = {
                schoolId: this.$store.getters['user/schoolId'],
                gradeId: this.gradeId,
                PageNum: 1,
                PageSize: 1000
            }
            this.$store.dispatch('notice2/GetClass',params).then(
                res => {
                    this.classList = res.items
                }
            )
        },
        // 获取已读和未读
        getReadList () {
            var params = {
                noticeId: this.noticeDetail.Id,
                gradeId: this.gradeId,
                classId: this.classId
            }
            this.$store.dispatch('notice2/GetReadListByManager', params).then(
                data => {
                    if (data.Code == 200) {
                        this.readList = data.Data
                    }
                }
            )
        },
         // 提醒
        remind (parentId, choice) {
             var prams = {
                noticeId: this.noticeDetail.Id,
                parentId: parentId,
                choice: choice
            }
            this.$store.dispatch('notice2/Remind', prams).then((data) => {
                if (data.Code == 200) {
                    this.$vux.toast.text('提醒成功', 'top')
                    this.getReadList()
                } else {
                    this.$vux.toast.text(data.Msg, 'top')
                }
            })
        }
    }
}
</script>
<style src='./css/detailSame.css' scoped></style>
<style scoped>
  .left select{
      font-size: 0.24rem;
      border: none;
  }
</style>
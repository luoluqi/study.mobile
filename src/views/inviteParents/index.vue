<template>
    <div class="main">
        <headNav title="添加学生家长"></headNav>
        <div class="bigBox">
            <div class="infoBox">
                <p>
                    <span class="labelName">
                        孩子姓名：
                    </span>
                    <span class="valName">
                        {{studentName}}
                    </span>
                </p>
                <div class="infoBox2">
                    <p class="spacel">
                        <span class="labelName2">
                            邀请的家长是孩子的：
                        </span>
                    </p>
                    <p class="parentsBox">
                        <span v-for="item in parentsList" :key="item" class="parentName" @click="selParents(item)" :class="{'active': item == theParentName}">
                            {{item}}
                        </span>
                    </p>
                </div>
                <p>
                    <span class="labelName2">
                        邀请家长的姓名：
                    </span>
                    <input ref="nameInput" placeholder="请输入家长姓名" :maxlength="15" @blur="inputBlur" v-model.trim="parentName" type="text">
                </p>
                <p>
                    <span class="labelName2">
                        邀请的家长手机：
                    </span>
                    <input ref="phoneInput" @input="listenPhone" placeholder="请输入家长手机号" @blur="inputBlur" v-model.trim="phoneNum" type="number">
                </p>
               <p class="errorMsg">
                   {{errorMsg}}
               </p>
            </div>
            <div class="remind" @click="send">
                保存并分享
            </div>
        </div>
    </div>
</template>>
<script>
import headNav from '@/components/headNav/headNav'
export default {
    name: 'invite',
    components: {
        headNav
    },
    data () {
        return {
            studentName: '',
            parentName: '',
            phoneNum: '',
            errorMsg: '',
            checkFlag: false,
            parentsList: ['爸爸', '妈妈', '爷爷', '奶奶', '外公', '外婆', '兄弟姐妹', '其他'],
            theParentName: ''
        }
    },
    methods: {
        inputBlur () {
            window.scrollTo(0, 0)
        },
        listenPhone () {
            if (!(/^1[3456789]\d{9}$/.test(this.phoneNum))) {
                this.errorMsg = '手机号码格式有误'
                this.checkFlag = false
            } else {
                this.errorMsg = ''
                this.checkFlag = true
            }
        },
        selParents (item) {
            this.theParentName = item
            this.parentName = this.studentName + this.theParentName
        },
        send () {
            if (!this.check() || !this.checkFlag) return
            this.setParentInfo()
        },
        setParentInfo () {
            var params = {
                studentId: this.$store.getters['user/studentId'],
                phone: this.phoneNum,
                parentName: this.parentName,
                relationShipName: this.theParentName
            }
            this.$store.dispatch('inviteParents/SetParentInfo', params).then(
                res => {
                    var studentInfo = this.$store.state.user
                    localStorage.isMine = true
                    // var  obj = {theParentName: this.theParentName, parentName: this.parentName, phoneNum: this.phoneNum, id: res.id, studentName: studentInfo.studentName, schoolName: studentInfo.schoolName, gradeName: studentInfo.gradeName, className: studentInfo.className, headImg: studentInfo.headImg}
                    // this.$store.commit('inviteParents/setInviteObj', obj)
                    
                  //  this.$router.push({path:'toSendParents', query: obj})

                    // http://m.xueerqin.net/#/inviteParents/index
                    var url = location.protocol + '//' + location.host + location.pathname + '?id=' + res.id + '#/inviteParents/toSendParents'
                    location.href = url
                }
            )
        },
        check () {
            if (!this.parentName) {
                this.$vux.toast.text('家长姓名不能为空')
                this.$refs.nameInput.focus()
                return false
            }
            if (!this.theParentName) {
                this.$vux.toast.text('请选择与家长的关系')
                return false
            }
            if (!this.phoneNum) {
                this.$vux.toast.text('请输入手机号码')
                return false
            }
            return true
        }
    },
    mounted () {
        this.studentName = this.$store.state.user.studentName
        this.errorMsg = ''
        this.checkFlag = false
    }
}
</script>
<style lang='less' scoped>
    input{
        color: #999;
        font-size: 0.28rem;
        border: 0.01rem solid #C0C0C0;
        border-radius: 0.08rem;
        padding: 0.16rem 0.1rem;
        width: 60%;
    }
    .bigBox{
        .infoBox{
            padding: 0.2rem 0.3rem;
            background: #fff;
            >p{
                margin: 0.3rem 0;
            }
            .labelName{
                color: #333333;
                font-size: 0.32rem;
            }
            .labelName2{
                color: #333333;
                font-size: 0.28rem;
            }
            .valName{
                font-size: 0.32rem;
                color: #999999;
            }
            .errorMsg{
                margin-top: 0.1rem;
                color: #FF3000;
                font-size: 0.28rem;
                padding-left: 36%;
            }
       
        }
        .infoBox2{
            margin-top: 0.24rem;
            // padding: 0.2rem 0.18rem;
             background: #fff;
            //  .spacel{
            //      padding-left: 0.12rem;
            //  }
            .labelName2{
                color: #333333;
                font-size: 0.28rem;
            }
            .parentName{
                display: inline-block;
                padding: 0.18rem 0.42rem;
                background: #f8f8f8;
                color: #666;
                border-radius: 0.05rem;
                font-size: 0.28rem;
                border-radius: 0.08rem;
                margin: 0.24rem 0.12rem 0 0.12rem;
            }
            .active{
                background: #E8F5FF;
                color: #128FEF;
            }
            // .parentsBox{
            //     padding: 0.24rem 0;
            // }
        }
        .remind{
            width:6.40rem;
            height:0.80rem;
            background:rgba(18,143,239,1);
            border-radius:0.08rem;
            line-height: 0.8rem;
            text-align: center;
            color: #ffffff;
            margin: 0.28rem auto;
            font-size: 0.32rem;
        }
    }
   
</style>
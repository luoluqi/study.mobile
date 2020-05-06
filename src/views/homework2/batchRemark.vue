<template>
    <div id="batchRemark">
        <headNav title="批量点评"></headNav>
        <div class="d-person">
            <ul>
                <li v-for="(item,index) in allStudent" :key="index">
                    <div class="left">
                        <div class="per-quan" :class="[colorList[index % colorList.length]]">{{item.studentName.substring(item.studentName.length-2,item.studentName.length)}}</div>
                        <div class="per-name">{{item.studentName}}</div>
                    </div>
                    <div class="right check">
                         <input type="checkbox" v-model="box5"  :value="item.StudentId" name="test" id="">
                    </div>
                </li>
            </ul>
        </div>
        <div class="remind" @click="sendRemark">发送点评</div>
         <!-- 点评弹窗 -->
        <remark-dialog @hide='hideReadDetail' @remarkData='remarkData' v-show="isReadDetail"></remark-dialog>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
import remarkDialog from './remarkDialog';
import { CheckIcon,Checklist } from 'vux'
export default {
    name: 'batchRemark',
     components:{
       headNav,
       remarkDialog,
       CheckIcon,
        Checklist
    },
    data() {
        return {
            box5:[],
            colorList:['c1','c2','c3','c4','c5','c6','c7','c8'],
            isReadDetail:false,
            dataRemark: '',
            check: false,
            allStudent:''
        }
    },
    mounted(){
          this.allStudent = this.$store.state.homework2.allStudent
        if(!this.$store.state.homework2.allStudent){
            this.allStudent = JSON.parse(localStorage.getItem('allStudent'))
        }
        console.log(this.allStudent)
    },
    methods: {
        sendRemark () {
            this.$store.commit('media/changeModel', false)
            this.isReadDetail = true
        },
         hideReadDetail(){
            this.isReadDetail = false
        },
        remarkData (data) {
             this.dataRemark = data
             console.log(this.box5)
             this.remakrConfirm()
        },
        getvalue(){
           
        },
        // 
        // 批量发送评价
        remakrConfirm(){
                    var pramsArr = []
                    for(var i =0 ;i<this.box5.length;i++){
                        var prams ={
                            HomeWorkId:this.allStudent[0].HomeWorkId,
                            StudentId:this.box5[i],
                            Content:this.dataRemark.remark,
                            Voices:this.dataRemark.voice,
                            VoiceSecond: this.dataRemark.VoiceSecond,
                            Level:this.dataRemark.ranking
                            
                        }
                        pramsArr.push(prams)
                    }
                    this.$store.dispatch('homework2/AddReview',pramsArr).then((data) => {
                        if(data.Code == 200){
                            this.$vux.toast.text('评价成功', 'top')
                            this.$router.go(-1)
                        }else{
                            this.$vux.toast.text(data.Msg, 'top')
                        }
                    })
        }
    }
}
</script>
<style  scoped>
.d-person{
      overflow: hidden;
      padding: 0.16rem 0.32rem;
      background-color: #ffffff;
    }
    .d-person li{
        line-height: 1rem;
        height: 1rem;
    }
    .per-quan{
        width:0.60rem;
        height:0.60rem;
        line-height: 0.6rem;
        text-align: center;
        border-radius: 0.6rem;
        float: left;
        margin-top: 0.22rem;
        margin-right: 0.1rem;
        font-size: 0.24rem;
        color: #ffffff;
    }
    .per-name{
        font-size: 0.32rem;
        color: #333333;
        float: left;
    }
    .left{
        float: left;
    }
    .right{
        float: right;
    }
    .c1{
        background-color: #3EA4F2;
    }
    .c2{
        background-color: #38D68A;
    }
    .c3{
        background-color: #79D754;
    }
    .c4{
        background-color: #7591E3;
    }
    .c5{
        background-color: #24CABD;
    }
    .c6{
        background-color: #F8C83F;
    }
    .c7{
        background-color: #A77CCC;
    }
    .c8{
        background-color: #3CB3D6;
    }
    .remind{
        width:6.40rem;
        height:0.80rem;
        background:rgba(18,143,239,1);
        border-radius:0.08rem;
        line-height: 0.8rem;
        text-align: center;
        color: #ffffff;
        margin: 0.3rem auto;
        font-size: 0.32rem;
    }
    .check{
        margin-left: 0.3rem;
    }
    .weui-icon-circle{
        font-size: 0.32rem !important;
    }
    .weui-icon-success{
        font-size: 0.32rem !important;
        color: #128FEF !important;
    }

 input[type="checkbox"] {
    width: 0.44rem;
    height: 0.44rem;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 0.44rem;
    position: relative;
}
 
input[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    border: 0.01rem solid #CACDCF
}
 
input[type="checkbox"]:checked::before {
    content: "\2713";
    background-color: #2196F3;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border: 0.01rem solid #2196F3;
    font-size: 0.44rem;
}
</style>
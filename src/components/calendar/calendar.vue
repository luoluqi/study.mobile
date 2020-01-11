<template>
    <div class="container">
        <div class="head">
            <div class="head-item">
                <img @click="prevYear" class="arrow" src="./img/left-arr.png" alt="">
                <div class="md-num">{{year}}</div>
                <img @click="nextYear" class="arrow" src="./img/right-arr.png" alt="">
            </div>

            <div class="head-item">
                <img @click="prevMonth" class="arrow" src="./img/left-arr.png" alt="">
                <div class="md-num">{{month + 1}}</div>
                <img @click="nextMonth" class="arrow" src="./img/right-arr.png" alt="">
            </div>
        </div>
        <div class="the-line"></div>
        <div class="cal-list">
            <div class="cal-item">日</div>
            <div class="cal-item">一</div>
            <div class="cal-item">二</div>
            <div class="cal-item">三</div>
            <div class="cal-item">四</div>
            <div class="cal-item">五</div>
            <div class="cal-item">六</div>
            <div @click="select(item.date)" v-for="(item,index) in list" :key="index" class="cal-item">
                <div class="cal-item-d" 
                :class="{normal:item.isNormal,late:item.isLate,lack:item.isLack,leave:item.isLeave,active:curDate == item.str}">
                    <span v-if="item.str == nowStr" class="cheng" :class="{bai:item.isNormal || item.isLate || item.isLack || item.isLeave}" >今</span>
                    <span v-else>{{item.num}}</span>
                </div>
              
            </div>
           <div class="chekType" v-if="isShow">
                <ul>
                    <li><i class="zheng"></i><span>正常</span></li>
                    <li><i></i><span>迟到、早退</span></li>
                    <li ><i class="kuang"></i><span>{{lackText}}</span></li>
                    <li><i class="qingjia"></i><span>请假</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:[
        "late",
        "lack",
        "leave",
        "normal",
        "activeDate",
        "lackText",
        "isShow"
       
    ],
    watch:{
        late:function(indexVal, oldVal){
          this.initDateList(new Date(this.year,this.month,1));
        },
        lack:function(indexVal, oldVal){
          this.initDateList(new Date(this.year,this.month,1));
        },
        leave:function(indexVal, oldVal){
          this.initDateList(new Date(this.year,this.month,1));
        },
         normal:function(indexVal, oldVal){
          this.initDateList(new Date(this.year,this.month,1));
        }
    },

    data(){
        return {
            list :[],
            now:{},
            nowStr:"",
            year:0,
            month:0,
            curDate:"",
            isTeacher: false
        }
    },

    methods:{
        initDateList(date){
            
            this.list = [];

            if(date){
              
                date = new Date(date.getFullYear(),date.getMonth(),1);
            }else{
                  date = new Date();
                date = new Date(date.getFullYear(),date.getMonth(),1);
            }
            
            var year = date.getFullYear();
            this.year = year;

            var month = date.getMonth();
            this.month = month

            var d = date.getDate();
            var day = date.getDay();
            var first = new Date(year,month,1);

            this.list.push(this.getItem(first));

            while(true){
               
                var time = first.getTime();
                time += 1000 * 60 * 60 * 24;

                var nextDate = new Date(time);

                
                if(nextDate.getMonth() == first.getMonth()){
                     this.list.push(this.getItem(nextDate));

                    first = nextDate;
                }else{
                    break;
                }
            }

        
            console.log("day:" + day);
            for(var i = 0;i<day;i++){
                this.list.unshift({

                });
            }

           

        },

        dateToStr(d){
              var year = d.getFullYear();
            var month = d.getMonth() >=9 ? d.getMonth() + 1 : '0' + ( d.getMonth() + 1);
            var date = d.getDate() >9 ? d.getDate() : '0' + d.getDate();
            var str = year + '-'+month+'-'+ date;

            return str;

        },

        getItem(d){
         
            return {
                num:d.getDate(),
                str:this.dateToStr(d),
                date:d,
                isLate:this.isLate(d),
                isLack:this.isLack(d),
                isLeave:this.isLeave(d),
                isNormal:this.isNormal(d)
            }
        },

        isNormal(d){
            var temp = new Date(d.getTime());
            // temp.setHours(18)

            if(this.normal.includes(this.dateToStr(d))){
                 return true;
            }else{
                  return false;
            }
           
            // if(!this.isLate(d) && !this.isLack(d) && !this.isLeave(d) && this.now.getTime() > temp.getTime()){
            //     return true;
            // }else{
            //     return false;
            // }
        },
        

        isLate(d){
            if(!this.late){
                return false
            }

            var flag = false;
            for(var item of this.late){
                
                var lateDate = new Date(item);
                var lateStr = lateDate.getFullYear()+"-"+lateDate.getMonth()+"-"+lateDate.getDate();
                var str = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
                if(lateStr == str){
                    flag = true;
                }
            }

            return flag;
        },

        isLack(d){
            if(!this.lack){
                return false
            }

            var flag = false;
            for(var item of this.lack){
                var lackDate = new Date(item);
                var lackStr = lackDate.getFullYear()+"-"+lackDate.getMonth()+"-"+lackDate.getDate();
                var str = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
                if(lackStr == str){
                    flag = true;
                }
            }

             return flag;
        },

        isLeave(d){
            if(!this.leave){
                return false
            }

            var flag = false;
            for(var item of this.leave){
                var leaveDate = new Date(item);
                var leaveStr = leaveDate.getFullYear()+"-"+leaveDate.getMonth()+"-"+leaveDate.getDate();
                var str = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
                if(leaveStr == str){
                    flag = true;
                }
            }

             return flag;
        },

        prevYear(){
            this.year --;

            this.initDateList(new Date(this.year,this.month,1));

            this.$emit('change',this.year,this.month);
        },

        nextYear(){
             this.year ++;

            this.initDateList(new Date(this.year,this.month,1));

             this.$emit('change',this.year,this.month);
        },

        prevMonth(){
            if(this.month == 0){
                this.month = 11;
                this.year --;
            }else{
                this.month --;
            }

            this.initDateList(new Date(this.year,this.month,1));

             this.$emit('change',this.year,this.month);

             var date = new Date(this.year,this.month,1)
             this.curDate = this.dateToStr(date)
        },

        nextMonth(){
             if(this.month == 11){
                this.month = 0;
                this.year ++;
            }else{
                this.month ++;
            }

            this.initDateList(new Date(this.year,this.month,1));

            this.$emit('change',this.year,this.month);

             var date = new Date(this.year,this.month,1)
             this.curDate = this.dateToStr(date)
        },

        select(d){
            // debugger
            var year = d.getFullYear();
            var month = d.getMonth() >=9 ? d.getMonth() + 1 : '0' + ( d.getMonth() + 1);
            var date = d.getDate() >9 ? d.getDate() : '0' + d.getDate();
            var str = year + '-'+month+'-'+ date;

            this.curDate = str;

            this.$emit('select',str);
        }
    },

    mounted(){
      
        this.now = new Date();
        this.nowStr = this.dateToStr(this.now);

        if(this.activeDate){
            this.curDate = this.activeDate
            this.initDateList(new Date(this.curDate));
       }else{
           this.initDateList();
       }

         

    }
}
</script>
<style scoped>
.container{
        margin: 0 auto;
    width: 6.26rem;
    height: 7.2rem;
    /* height: 5.9rem; */
    padding: 0.35rem 0.22rem;
    border-radius: 5px;
    /* -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,0.5); */
    /* box-shadow: 0 0 10px 0 rgba(0,0,0,0.5); */
    /* -webkit-box-sizing: border-box; */
    /* box-sizing: border-box; */
    background-color: #fff;
}
.head{
    display: flex;
    justify-content: space-between;
}
.head-item{
    display: inline-block;

}
.arrow{
    display: inline-block;
    vertical-align: middle;
    padding: 0 0.1rem;
    width: 0.28rem;
    height: 0.28rem;
}
.md-num{
    display: inline-block;
    width: 1.5rem;
    vertical-align: middle;
    text-align: center;
    font-size: 0.32rem;

}
.the-line{
    width: 6.3rem;
    margin: 0.3rem auto 0 auto;
    border-top: #e5e5e5 1px solid;
}
.cal-list{
    /* display: flex;
    justify-content: space-between;
    flex-wrap:wrap; */
}
.cal-item{
    width: 0.89rem;
    text-align: center;
    padding: 0.2rem 0;
    font-size: 0.28rem;
    float: left;
}
.foot{
    clear: both;
}


.chekType{
    overflow: hidden;
    width: 6rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    clear: both;
}
.chekType li{
    font-size: 0.24rem;
    float: left;
    color: #999999;
    margin-left: 0.5rem;

}
.chekType li i{
    width: 0.16rem;
    height: 0.16rem;
    border-radius: 0.16rem;
    background-color: #ffad32;
    display: inline-block;
    margin-right: 0.08rem
}
.kuang{
    background-color: #ff7070 !important;
}
.qingjia{
    background-color: #4bb0f4 !important;
}
.zheng{
    background-color: #f2f2f2 !important;
}

.cal-item-d{
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    line-height: 0.5rem;
    margin: 0 auto;
}
.bai{
   color: #fff !important;
}
.cheng{
    color: #ff8800
}
.normal{
    background: #f2f2f2;
    color: #333;
}
.late{
    background: #ffad32;
    color: #fff !important;
}
.lack{
    background: #ff7070;
    color: #fff !important;
}

.leave{
    background: #4bb0f4;
    color: #fff !important;
}
.active{
    background: #b6b6b6;
    color: #fff !important;
}

</style>

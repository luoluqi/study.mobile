<template>
    <div>
		<headNav title="错题统计"></headNav>
        <div class="ct-top">
			<div v-if="allWrongCount" class="ct-1">{{allWrongCount}}</div>
			<div v-else class="ct-1">0</div>


			<div  v-if="maxWrongSubject"  class="ct-2">{{maxWrongSubject}}</div>
			<div v-else class="ct-2">无</div>


			<div v-if="maxWrongQuestionChannelType" class="ct-3">{{maxWrongQuestionChannelType}}</div>
			<div  v-else class="ct-3">无</div>


		</div>
	<div class="ct-centen">
		<div v-for="(item,index) in list" :key="index" class="ct-c-list">
			<div class="ct-c-left">{{item.subjectName}}</div>
			<div class="ct-c-right">
				<div class="ct-c-right-t">
					<span>错题数：{{item.wrongAllCount}}</span>
					<a @click="toLook(item.subjectId,item.subjectName)" class="bof">查看模式</a>
					<a @click="toAnswer(item.subjectId,item.subjectName)" class="bof">答题模式</a>
				</div>
				<div class="today-num">今日更新数：{{item.todayWrongAllCount}}</div>
				<div class="ct-c-right-d">
					<ul>
						<li @click="selectQueType(index,num)" :class="{on:obj.isOn}" v-for="(obj,num) in item.channelTypeWrongCounts" :key="num">
							<div>{{obj.questionChannelType | channelType}}</div>
							{{obj.wrongCount}}<i></i>
						</li>
						
					</ul>
				</div>
			</div>
			<div style="clear:both;"></div>
		</div>

	</div>
	<!-- <script>
		$(function(){
			$(".ct-c-right-d li").click(function(){
				$(this).toggleClass("on")
			})
		})
	</script> -->
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import {login} from '@/api/loginApi'
import {getCount,getSubjectCount} from '@/api/wrongApi';

import {getAllChannelTypeList,getStudentDetail} from "@/api/studyApi"
import   cookie from '@/util/cookie'
import { debug } from 'util';
export default {
	components:{
      
        headNav
    },
    data(){
		return {
			allWrongCount:0,
			maxWrongQuestionChannelType:"",
			maxWrongSubject:"",
			list:[]
		}
	},

	methods:{
		selectQueType(index,num){
			
			if(this.list[index].channelTypeWrongCounts[num].questionChannelType == 0){
				this.$vux.toast.text('本模块当前版本暂不支持主观题展示', 'top')
				return;
			}

			var isOn = this.list[index].channelTypeWrongCounts[num].isOn;
			

			this.$set(this.list[index].channelTypeWrongCounts[num], 'isOn', !isOn)
		
		},

		toAnswer(subjectId,subjectName){
			this.setStore(subjectId,subjectName);

			var questionChannelTypes = this.$store.state.study.questionChannelTypes;
			if(questionChannelTypes.length == 0){
				this.$vux.toast.text('至少选择一个题型', 'top')
				return;
			}


			this.$router.push("answer");
		},

		toLook(subjectId,subjectName){
		
			this.setStore(subjectId,subjectName);
			
			var questionChannelTypes = this.$store.state.study.questionChannelTypes;
			if(questionChannelTypes.length == 0){
				this.$vux.toast.text('至少选择一个题型', 'top')
				return;
			}


			this.$store.state.study.isFromCount = true
			this.$router.push("list");
		},

		setStore(subjectId,subjectName){
			this.$store.state.study.subjectId = subjectId;
			this.$store.state.study.subjectName = subjectName;

			var arr = [];
			for(var subject of this.list){
				if(subject.subjectId == subjectId){
					for(var tp of subject.channelTypeWrongCounts){
						if(tp.isOn){
							arr.push(tp.questionChannelType);
						}
					}
				}
			}

			this.$store.state.study.questionChannelTypes = arr.sort(function(a,b){
				return a - b;
			})
		}
	},

	mounted(){
		
			// var realName = cookie.get("realName")
			// cookie.set("realName",encodeURI(realName));
		

			var studentId =  cookie.get("studentId")
			

		getAllChannelTypeList().then((data) => {
   
			this.$store.state.channelTypeList = data.data;
		});

		
	

		
		if(!studentId){
			studentId = "3314dd6a6e7c4b4eafab9a09ef8131ed"
			//studentId = "c2d76f626f804cf18f86438124e491f5"
			
		}
		getStudentDetail(studentId).then((data) => {
					
			
			var user = data.data;

		

		
			this.$store.state.user = Object.assign(this.$store.state.user,user);



		
			getCount(studentId).then((data) => {
				

				this.allWrongCount = data.data.allWrongCount;
				this.maxWrongQuestionChannelType = data.data.maxWrongQuestionChannelType;
				this.maxWrongSubject = data.data.maxWrongSubject;

			});


			getSubjectCount(studentId).then((data) => {
				console.log(data);
				this.list = data.data;

			
			});
			
			
		})

	
		
	}
}
</script>

<style scoped src="@/assets/css/new-yl119.css"></style>
<style scoped>

</style>
<template>
    <div>
		<headNav title="答题模式"></headNav>
        <div class="obj_ss">
	<p><span style="float:left;">当前题量：{{pageNum}}/{{total}}</span>
	<!-- <span style="float:right;margin-top: 0.1rem;">
		<mt-switch v-model="isDelete" ></mt-switch>
	</span> -->
	<!-- <span style="float:right;">答对即移除错题</span></p> -->
	<div class="ti_box">
		<div class="xueli">
			<span>学历：小学 </span>
			<span>年级：{{$store.state.user.gradeName}} </span>
			<span>科目：{{$store.state.study.subjectName}}</span>
		</div>
		<div class="tiDetail">
			<h1>题型：{{question.questionChannelType | channelType}}</h1>
			<div class="ss_s_z-h-d">
				<h2 v-html="question.questionText"></h2>
				<ul>
					<li v-for="(value,key) in question.options" :key="key">

						<input @change="changeAns($event,key,value)" 
							v-if="question.questionChannelType == 1" 
							:id="key + question.questionId" 
							:key="key + question.questionId"
							v-model="answer"
							class="color-input-bule no-show" type="radio" name="color-input-red" :value="key" />

						<input @change="changeAns($event,key,value)" 
							v-if="question.questionChannelType == 2" 
							:id="key + question.questionId" 
							:key="key + question.questionId"
							v-model="answer"
							class="color-input-bule no-show" type="checkbox" name="color-input-red" :value="key" />

						<input @change="changeAns($event,key,value)" 
							v-if="question.questionChannelType == 3" 
							:id="key + question.questionId" 
							:key="key + question.questionId"
							v-model="answer"
							class="color-input-bule no-show" type="radio" name="color-input-red"  :value="value" />
						
						<label :for="key + question.questionId"></label >
						<label :for="key + question.questionId" class="la-1" v-html="key+'．' + value"></label>	
					</li>
				</ul>
			</div>
		</div>
		<div class="btnXia">
			<span @click="prev" v-show="pageNum > 1" class="shangxia">上一题</span>
			<span @click="comfirm" class="queren">确认</span>
			<span @click="next" v-show="pageNum < total" class="shangxia">下一题</span>
		</div>
		<div v-show="isShowAnswer" class="analysis">
				<ul>
					<li>
						<span class="correct">【正确答案】</span>
						<p v-if="question.questionChannelType <= 3">{{question.answer}}</p>
						<p v-else><img :src="$store.state.imgSrc + question.answer" alt=""></p>
					</li>
					<li>
						<span class="kaodian">【考点】</span>
						<p><img :src="$store.state.imgSrc + question.knowledge" alt=""></p>
					</li>
					<li>
						<span class="jiexi">【解析】</span>
						<p><img :src="$store.state.imgSrc + question.explanation" alt=""></p>
					</li>
					<li>
						<span class="zhishi" style="line-height:0.57rem;">【知识点】</span>
						<p class="zhiList">
							<span v-for="(item,index) in question.pointNames" :key="index">{{item}}</span>
							
						</p>
					</li>
					<li>
						<span class="zhishi">【试题来源】</span>
						<p>{{question.questionSource}}</p>
					</li>
				</ul>
			</div>
	</div>
	
</div>
	<!-- <script>
		$(function(){
			$(".sc").click(function(){
				$(".t-c").show();
			})
		})
	</script> -->
    </div>
</template>
<script>

import headNav from '@/components/headNav/headNav'

import {getWrongList,delWrong} from '@/api/wrongApi';
import { Switch } from 'mint-ui';

export default {
	components :{
		[Switch.name]:Switch,
		headNav
	},
	 data(){
		return {
			pageNum:0,
			pageSize:1,
			total:0,

			question:{},

			isShowAnswer:false,

			answer:[],

			isDelete:false,
			delelteIds:[],


			answerMap:{}
		}
	},
	methods:{
		getList(){
			

			
			getWrongList({
				studentId:this.$store.state.user.studentId,
				subjectId:this.$store.state.study.subjectId,
				questionChannelTypes:this.$store.state.study.questionChannelTypes.toString(),
				pageNum:this.pageNum,
				pageSize:this.pageSize
			}).then((data) => {
				console.log(data);
				

				this.question = data.data.list[0];
				if(this.question.options){
					this.question.options = JSON.parse(this.question.options);
				}
				
				this.total = data.data.total;

				if(this.answerMap[this.question.questionWrongId]){
					this.answer = this.answerMap[this.question.questionWrongId];
				}else{
					this.answer = '';
				}
			});
		},

		next(){
			
			this.isShowAnswer= false;
			this.pageNum ++;
			this.getList();
		},

		prev(){
			
			this.isShowAnswer= false;
			this.pageNum --;
			this.getList();
		},
		comfirm(){
			
			if(this.pageNum >= this.total){
				 this.$vux.toast.text('此次所选题目已全部完成', 'top')
			}


			this.isShowAnswer= true;

			
			
			var answerStr = this.answer;
			switch(this.question.questionChannelType){
				case 1:
					
					break;
				case 2:
					answerStr = this.answer.join("");
					break;
				case 3:
				
					break;
			}
			if(answerStr == this.question.answer){
				if(this.isDelete){
			
					var isHave = this.delelteIds.includes(this.question.questionWrongId)
					if(!isHave){
						this.delelteIds.push(this.question.questionWrongId)
					}
					
				}
				
			}
		},

		changeAns(){
			
			this.answerMap[this.question.questionWrongId] = this.answer;

			switch(this.question.questionChannelType){
				case 1:
					
					break;
				case 2:
					
					break;
				case 3:
				
					break;
			}
			
		},

		delWrong(id){
			delWrong(id).then((data) => {
				console.log(data);
				if(data.status == 200){
					
				}
				
			});
		}
		
	},

	
	mounted(){
		this.next();
		
		this.$store.state.user.studentId;	
		this.$store.state.study.subjectId;
		this.$store.state.study.subjectName;
		this.$store.state.study.questionChannelTypes;
	},

	beforeDestroy(){
	
		for(var item of this.delelteIds){
			// this.delWrong(item);
		}
		
	}
}
</script>


<style scoped src="@/assets/css/new-yl119.css"></style>
<style scoped>

</style>

<template>
    <div id="scrollDiv">
		<headNav title="题目列表"></headNav>
        <div class="s_seach">
			<div class="s_search_btn"></div>
			<input v-model.trim="title" @blur="search" type="text" placeholder="搜索" />
		</div>
	<div class="list"   v-infinite-scroll="loadMore"
						infinite-scroll-disabled="loading"
						infinite-scroll-distance="10">

		<div v-for="(item,index) in list" :key="index" class="s_z-h-d">
			<h2 v-html="item.questionText"></h2>
			<ul>
				<li v-for="(value,key) in item.options" :key="key">
					<input v-if="item.questionChannelType == 1" :id="key + item.questionId" class="color-input-bule" type="radio" :name="item.questionId" value="#f0544d" />
					<input v-if="item.questionChannelType == 2" :id="key + item.questionId" class="color-input-bule" type="checkbox" :name="item.questionId" value="#f0544d" />
					<input v-if="item.questionChannelType == 3" :id="key + item.questionId" class="color-input-bule" type="radio" :name="item.questionId" value="#f0544d" />
					
					<label></label >
					<label :for="key + item.questionId" class="la-1" v-html="key+'．' + value"></label>	
				</li>
				
			</ul>
			<div  class="s_dx-1">
				<a @click="toDetail(item)" class="ck">查看</a>
				<a @click="delWrong(item)"  class="sc"></a>
			</div>
		</div>
	
	</div>
	<div v-if="isMore" class="the-more">正在加载更多...</div>
	<div  v-if="!isMore" class="the-more">没有更多了</div>
	<div class="t-c">
			<img src="img/jg-ico.png" />
			<p>确定将该题从错题本中删除？</p>
			<a>是</a><a>否</a>
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

import Vue from 'vue'
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

export default {
	name:"wrongList",
	components:{
      
        headNav
    },
    data(){
		return {
			isMore:true,

			pageNum:0,
			pageSize:10,

			list:[],

			scrollTop:0,

			title:""
		}
	},
	
	methods:{
		getList(){
			
			if(!this.isMore){
				return;
			}
			
			this.pageNum ++;
			var param = {
				studentId:this.$store.state.user.studentId,
				subjectId:this.$store.state.study.subjectId,
				questionChannelTypes:this.$store.state.study.questionChannelTypes.toString(),
				pageNum:this.pageNum,
				pageSize:this.pageSize
			};
			if(this.title){
				param.title = this.title;
			}
			getWrongList(param).then((data) => {
				console.log("list.getList...");
				console.log(data);
				
				if(data.data.list.length < this.pageSize){
					this.isMore = false;
				}
				var list = data.data.list;
				for(var item of list){
					if(item.options){
						item.options = JSON.parse(item.options);
					}
					
				}
				this.list =this.list.concat(list);
				
				
			});
		},
		loadMore(){
			this.getList();
		},

		search(){
			console.log("search........");
			console.log(this.title);
			this.pageNum = 0;
			this.isMore = true;
			this.list = [];
			this.getList();
		},

		toDetail(question){
			this.$store.state.study.question = question;
			this.$router.push("detail");
		},

		delWrong(question){
			
			
			this.$vux.confirm.show({
				content:"确定将该题从错题本中删除？",
				onCancel : () => {
					
				},
				onConfirm : () => {
					delWrong(question.questionWrongId).then((data) => {
						console.log(data);
						if(data.status == 200){
							Vue.$vux.toast.text('已删除', 'top')
							for(var i = 0;i<this.list.length;i++){
								if(this.list[i].questionWrongId == question.questionWrongId){
									this.list.splice(i,1);
								}
							}
						}
						
					});
				}
			})
		}

	},


	mounted(){
		
		console.log("mounted...");
		


			
	},
	activated(){
		
		if(this.$store.state.study.isFromCount){
			this.$store.state.study.isFromCount = false
			
			this.isMore = true;
			this.pageNum = 0;
			this.list = [];
			this.getList();

			let _this=this
			var div = document.getElementById("scrollDiv");
			div.addEventListener('scroll',function(e){
				let scrollTop = div.scrollTop  || div.pageYOffset
			

				_this.scrollTop = scrollTop;
				

			})
			
		}
		this.$store.state.study.isFromCount = false

		console.log("activated........" + this.scrollTop);
		var div = document.getElementById("scrollDiv");
			
		div.scrollTop = this.scrollTop;
		
			
	},
	deactivated(){
		console.log("deactivated........" + this.scrollTop);
	}
}
</script>

<style scoped src="@/assets/css/new-yl119.css"></style>
<style scoped>
.the-more{
	padding: 0.18rem 0;
	text-align: center;

	font-size: 0.28rem;
}
</style>
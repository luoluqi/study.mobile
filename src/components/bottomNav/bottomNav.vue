<template>
    <div id="bottom" style="">
        <div style="height: 1.1rem;"></div>
		<!--下导航-->
		<div class="bootom_nav">
			<ul>
				<a href="#/menu/index">
					<li @click="selectgao(1)"  :class="{selectgao:index == 1}">
						<i class="shou"></i>
						<h2>首页</h2>
					</li>
				</a>
				<a v-if="isTeacher == 'Parent'" href="#/vip/index">
					<li  @click="selectgao(2)" :class="{selectgao:index == 2}">
						<i class="vip"></i>
						<h2>套餐</h2>	
					</li>
				</a>
				<a v-if="isTeacher == 'Teacher'">
					<li  @click="selectgao(2)" :class="{selectgao:index == 2}">
						<i class="vip"></i>
						<h2>套餐</h2>	
					</li>
				</a>
				<a :href="'http://mappv2.xueerqin.net/common/iframe.shtml?url=http://mpoint.xueerqin.net/Home/Index?v=' + randomStr">
					<li  @click="selectgao(3)" :class="{selectgao:index == 3}">
						<i class="jifen"></i>
						<h2>积分兑换</h2>
					</li>
				</a>
				<a href="#/settings/Tsetup">
					<li  @click="selectgao(4)" :class="{selectgao:index == 4}">
						<i class="geren"></i>
						<h2>我的</h2>
					</li>
				</a>
			</ul>
		</div>
    </div>
</template>
<script>

export default {

	props:["index"],

    components: {
    
  },

  computed:{
	  randomStr(){
		  function randomNum(min = 0, max = 100, len = 0) {
			return Number((min + (max - min) * Math.random()).toFixed(len));
			}
			
		  let str = '';
			let list = '0123456789abcdefghijklmnopqrstuvwxyz';
			for (let i = 0; i < 8; i++) {
				let index = randomNum(0, 35);
				let word = list[index];
				if (isNaN(word) && randomNum() < 50) {
				word = word.toUpperCase();
				}
				str += word;
			}
			return str;

	  }
  },
  data(){
      return {
        isTeacher:''
      }
  },
  mounted(){
    this.isTeacher = this.getCookie('roleCode')
  },
  methods:{
    selectgao(sel){
	  
	  if(sel==2 && this.getCookie('roleCode') == 'Teacher'){
		  this.$vux.toast.text('功能暂未开放')
		  return
	  }
	//   this.index=sel;
	  this.$parent.index = sel
	},
	 getCookie(sName){
            var aCookie = document.cookie.split("; ");
            for (var i=0; i < aCookie.length; i++){
                var aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                return unescape(aCrumb[1]);
            }
            return null;
        }
  }
 
}
</script>
<style scoped src="./css/bottomNav.css">

</style>


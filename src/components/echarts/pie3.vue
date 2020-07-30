<template>
    <div class="con-cah">
        <chart
					:options="pie"
					:init-options="initOptions"
					ref="pie"
					autoresize
					/>

    </div>
</template>
<script>
import ECharts from '@/components/echarts/ECharts.vue'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'

import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'


export default {
    components:{
        chart:ECharts
    },
    props:{
        //[{name:"推荐量",color:"#34243",value:123},
	//{name:"阅读量",color:"#34243",value:123},
	//{name:"转发量",color:"#34243",value:123},
	//{name:"收藏量",color:"#34243",value:123}
	//]
        data: {
            type:Array,
            default:[]
        },
        title: {
            type: Number,
            default: 0
        }
    },
    watch:{
        data(newVal,oldVue){
           this.init()
        }
    },
    data(){
        return {
            initOptions: {
                renderer: 'canvas'
            },
            pie:{
                // title: {
                //     text: this.title,
                //     x: 'center',
                //     textStyle:{
                //         color: '#71e3fe',
                //         fontSize: 16
                //     },
                //     top:10
                // },
                tooltip: {
                    trigger: 'none',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                color: ['#128FEF', '#E6E6E6'],
                title: {
                    text: this.title + '%',
                    left:'center',
                    top:'center',
                    // padding:[24,0],
                    textStyle:{
                    color:'#031f2d',
                    fontSize: 18,
                    align:'center'
                    }
                },
                series: [{
                    "name": '',
                    "type": 'pie',
                    startAngle: 360,
                    "radius": ['50%', '70%'],
                    "avoidLabelOverlap": false,
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    "label": {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": this.title,
                        "name": '1'
                    }, {
                        "value": 100-this.title,
                        "name": '2'
                    }]
                }]
            }
        }
    },
    methods: {
        init() {
            // var list = []
            // for(var item of this.data){
            //     var value = item.value;
            //     var name = item.name;
            //     var color = item.color;
            //     list.push({
            //         value: item.value, 
            //         name: item.name ,
            //         itemStyle:{
            //             normal:{color:item.color}
                    
            //         }
            //     })
            // }
            // this.pie.series[0].data = list   
        }
    },
    mounted(){
              this.init()
    }
}
</script>
<style  scoped>
.con-cah{
    width: 100%;
    height: 100%;
}
</style>
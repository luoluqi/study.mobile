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
             type:String,
            default:''
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
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
            // legend: {
            //     orient : 'vertical',
            //     x : 'left',
            //     data:[]
            // },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true, 
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'center',
                                max: 1548
                            }
                        }
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'考勤情况',
                    type:'pie',
                    radius : ['50%', '70%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        // emphasis : {
                        //     label : {
                        //         show : true,
                        //         position : 'center',
                        //         textStyle : {
                        //             fontSize : '30',
                        //             fontWeight : 'bold'
                        //         }
                        //     }
                        // }
                    },
                    data:[
                        
                    ]
                }
            ]
            }
        }
    },
    methods: {
        init() {
            var list = []
            var listName = []
            for(var item of this.data){
                var value = item.value;
                var name = item.name;
                var color = item.color;
                list.push({
                    value: item.value, 
                    name: item.name ,
                    itemStyle:{
                        normal:{color:item.color}
                    
                    }
                })
                // listName.push(item.name)
            }
            this.pie.series[0].data = list  
            // this.pie.legend.data = listName   
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
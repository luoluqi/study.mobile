<template>
   
       
        <div class="item-p">
            <chart
            :options="bar"
            :init-options="initOptions"
            ref="bar"
            theme="ovilia-green"
            autoresize
            />
        </div>
       
  
</template>
<script>
import ECharts from '@/components/echarts/ECharts.vue'
import 'echarts/lib/chart/bar'

import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'



export default {
    components: {
        chart: ECharts
    },
    props:{
        //[{name:"推荐量",color:"#34243",value:123},
	//{name:"阅读量",color:"#34243",value:123},
	//{name:"转发量",color:"#34243",value:123},
	//{name:"收藏量",color:"#34243",value:123}
	//]
        data: {
            type: Array,
            default: []
        },
        title: {
            type: String,
            default: ''
        }
    },
    watch:{
        data (newVal, oldVue) {
           this.init()
        }
    },
    data () {
        return {
          
            bar:{
                title: {
                    text: '作业完成正确率',
                    x: 'center',
                    textStyle:{
                        color: '#000',
                        fontSize: 14
                    },
                    top: 0
                },
                color: ['#128FEF'],
                tooltip: {
                    show: false,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                // legend: {
                //     data: ['班级平均分', '学生成绩'],
                //     itemWidth: 20,
                //     itemHeight: 9,
                //     textStyle: {
                //         color: '#999',
                //         fontSize: 12
                //     },
                //     itemGap: 30
                // },
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '16%',
                    top:'20%',
                    containLabel: false
                },
                xAxis:
                    {
                        type: 'category',
                        data: [],
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ccc',
                                width: 2
                            }
                        }
                    }   
                ,
                yAxis: 
                    {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ccc',
                                width: 2
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        max: 100,
                        min: 0,
                        interval: 10000,
                        axisLabel: {
                            show: true,
                            formatter: '{value}%',
                            align: 'right',
                            margin: -30,
                            verticalAlign: 'bottom',
                            showMinLabel: false,
                            showMaxLabel: true,
                            textStyle: {
                                color: '#999',
                                fontSize: 12,
                            },
                            padding: [0,0,8,0]
                        }
                    }
                ,
                series: [
                    {
                        name: '班级平均分',
                        type: 'bar',
                        barWidth: '12',
                        barGap: '0%',
                        label: {
                            show: true,
                            position: 'outside',
                            color: '#000',
                            formatter: '{c}%'
                        },
                        data: [60, 90, 100]
                    }
                ]
            },
            
            initOptions: {
                renderer: 'canvas'
            },
        }
    },
    methods: {
        init() {
            var xAxisData = []
            var yOneData = []
            var yTwoData = []
            for(var item of this.data){
                xAxisData.push(item.subjectName)
                yOneData.push(item.subjecClassAvgScore)
                // yTwoData.push(item.score)
            }
            this.bar.series[0].data = yOneData   
            // this.bar.series[1].data = yTwoData   
            this.bar.xAxis.data = xAxisData
        }
    },
    mounted(){
        this.init()
    }
}
</script>
<style scoped>
.item-p{
    width: 100%;
    height: 100%;
}
</style>
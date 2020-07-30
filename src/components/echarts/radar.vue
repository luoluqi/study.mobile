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
import 'echarts/lib/chart/radar'
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
            type: Object,
            default: () => {}
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
                grid: {
                    left: '3%',
                    right: '3%',
                    bottom: '10%',
                    top:'3%',
                    containLabel: false
                },
                color:['#128FEF'],
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#000'
                        }
                    },
                    indicator: [
                        { name: '作文', max: 100},
                        { name: '听力测试', max: 100},
                        { name: '单词解析', max: 100},
                        { name: '阅读理解', max: 100},
                        { name: '语法', max: 100},
                    ],
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(250,250,250,0.3)','rgba(250,250,250,0.3)']
                        }
                    }
                },
                series: {
                    name: '科目能力',
                    type: 'radar',
                    areaStyle: {
                        color: '#128FEF',
                        opacity: 0.2
                    },
                    itemStyle: {
                        color: '#128FEF'
                    },
                    symbol: 'rect',
                    data: [
                        {
                            value: [98, 68, 98, 68, 98]
                        }
                    ]
                }
            },
            
            initOptions: {
                renderer: 'canvas'
            },
        }
    },
    methods: {
        init() {
            this.bar.radar.indicator = this.data.indicator
            this.bar.series.data = this.data.data
            // var xAxisData = []
            // var yOneData = []
            // var yTwoData = []
            // for(var item of this.data){
            //     xAxisData.push(item.subjectName)
            //     yOneData.push(item.subjecClassAvgScore)
            //     yTwoData.push(item.score)
            // }
            // this.bar.series[0].data = yOneData   
            // this.bar.series[1].data = yTwoData   
            // this.bar.xAxis.data = xAxisData
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
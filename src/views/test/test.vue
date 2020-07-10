<template>
  <div >1111111
    <tree  ref="tree"
          :data="treeData" 
         
          @select="select" 
          @unselect="unselect"
          :props="{label: 'name', id:'id', children: 'children'}">
          </tree>

          <div class="oper" @click="isAllSelected">是否全选</div>
          <div class="oper" @click="getSelectedList">获取选中</div>
          <div class="oper" @click="allSelect">allSelect</div>
          <div  class="oper" @click="allUnSelect">allUnSelect</div>
  </div>
</template>

<script>
import tree from '@/components/treeForClass/tree'

  export default {
    components: {
      tree
    },
    data() {
      return { 
        treeData: [
          {
            id: 11,
            name: '一年级',
            children: [
              {
                   id: 121,
                  name: '一班',
              },
              {
                   id: 121,
                  name: '二班',
              },
            ]
          },
           {
            id: 112,
            name: '二年级',
            children: [
                {
                   id: 121,
                  name: '一班',
              }
            ]
          },
           {
            id: 11,
            name: '3年级',
            children: [
              {
                   id: 121,
                  name: '一班',
              },
              {
                   id: 121,
                  name: '二班',
              },
              {
                   id: 121,
                  name: '3班',
              },
            ]
          },
        ]
      }
    },
    methods: { 
      select(node){
        console.log('select',node)
      },
      unselect(node){
        console.log('unselect',node)
      },
      isAllSelected(){
        var a  = this.$refs.tree.isAllSelected()
        console.log(a)
      },
      getSelectedList(){
        var a = this.$refs.tree.getSelectedList()
        console.log(a)
      },
      allSelect () {
        this.$refs.tree.allSelect()
      },
      allUnSelect(){
        this.$refs.tree.allUnSelect()
      }
    },
    mounted () {
  
    }
  }
</script>
<style scoped>
.oper{font-size: 0.5rem;padding: 0.2rem 0;}
</style>
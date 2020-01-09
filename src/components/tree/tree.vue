<template>
    <div>
        <tree-item 
        @select="select" 
        @unselect="unselect" 
        v-for="(item, index) in data" 
        :key="index"
        :data="item" 
        :props="props"
        :selectedData='selectedData'  ></tree-item>
    </div>
</template>
<script>
//  <tree 
//                 :data="treeData" 
//                 :selectedData="selectedMan" 
//                 @select="select" 
//                 @unselect="unselect"
//                 :props="{label: 'name', id:'loginUserId', children: 'children'}">
//                 </tree>

import treeItem from './tree-item'
export default {
    components: {
        treeItem
    },
    props: ['data', 'props', 'selectedData'],
    methods: {
        select (data) {
            this.$emit('select', data)
        },
        unselect (data) {
             this.$emit('unselect', data)
        }
    }
    
}
</script>
<style scoped>

</style>

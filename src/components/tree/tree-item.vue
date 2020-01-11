<template>
    <div class="tree-item">
       
        <div v-if="data.children" @click="open" class="tree-name">
            <div class="icon-p">
                <x-icon class="icon-color" v-show="!isOpen" type="ios-plus-outline" size="30"></x-icon>
              <x-icon v-show="isOpen" type="ios-minus-outline" size="30"></x-icon>
            </div>
            <div class="name-p">{{data.label}}</div>
        </div>
         <div  v-else class="tt-name" @click="select(data)" :class="{'selected': isSelected}">
            {{data.label}}
        </div>
        <div class="tree-list" :class="{'open': isOpen, 'close': !isOpen}" v-if="data.children">
            <tree-item 
            @select="selectHandler" 
            @unselect="unselectHandler"  
            v-for="(item, index) in data.children" 
            :key="index"
            :selectedData="selectedData" 
            :data="item" 
            :props="props"></tree-item>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'treeItem',
     props: ['data', 'props', 'selectedData'],
    data () {
        return {
            isOpen: false,
            isSelected: false
        }
    },
    methods: {
        open () {
            this.isOpen = !this.isOpen
        },
        select (data) {
            this.isSelected = !this.isSelected
            if (this.isSelected) {
                this.$emit('select', data)
            } else {
                this.$emit('unselect', data)
            }
        },
        selectHandler (data) {
            this.$emit('select', data)
        },
        unselectHandler (data) {
             this.$emit('unselect', data)
        }
    },
    mounted () {
        this.$set(this.data, 'label', this.data[this.props.label])
        // this.$set(this.data, 'isLeaf', this.data[this.props.isLeaf])
        this.$set(this.data, 'children', this.data[this.props.children])
      
        var flag = false
        for (var item of this.selectedData) {
            if (this.data[this.props.id] == item[this.props.id]) {
                this.isSelected = true
            }
        }
    }    
}
</script>
<style scoped>
.tree-item{
    padding: 0.2rem 0 0.2rem 0.4rem;
    background: #fff;
    font-size: 0.3rem;
    /* border-top: 1px solid #D9D9D9; */
}
.tree-list{
  transition: 0.5s;
  overflow: hidden;
}
.close{
    height: 0px;
     transition: 0.5s;
}
.open{
     transition: 0.5s;
     height: auto;
}
.icon-p{
    display: inline-block;
    vertical-align: middle;
     fill:#1AAD19;
}

.name-p{
    display: inline-block;
    vertical-align: middle;
}
.tt-name{
    padding: 0 0 0 0.2rem;
}
.selected{
    color: #1AAD19;
}
</style>

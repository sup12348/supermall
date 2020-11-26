<template>
  <div class="tab-control">
      <div class="tab-control-item" v-for="(item,index) in title " 
      :key="index" :class="{active:index == currentIndex}" @click="changeIndex(index)"> 
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0

        }

    },
    methods: {
        changeIndex(index) {
            this.currentIndex = index
            this.$emit("tabClick",index)


        }
    },
    props: {
        title: {
            type: Array,
            default(){
                return []
            }
        }
    }
  
}
</script>

<style>
.tab-control {
    top: 44px;
    display: flex;
    text-align: center;
}
.tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
}
.active {
    color: var(--color-high-text);
    
}
.active span {
    border-bottom: 1px solid var(--color-text);
    padding-bottom: 5px;


}
</style>
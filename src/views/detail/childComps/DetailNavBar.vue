<template>
   <NavBar>
       <div slot="left" class="back" @click="backClick"></div>
       <div slot="center" class="title">
           <div v-for="(item,index) in titles" :key="index" class="title-item" @click="titleClick(index)"
           :class="{active: index === currentIndex}" >
               {{item}}
           </div>
       </div>
   </NavBar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components: {
      NavBar
  },
  data() {
      return {
          titles: ['商品','参数','评论','推荐'],
          currentIndex: 0
      }
  },
  methods: {
      titleClick(index) {
          this.currentIndex = index
          this.$emit('titleClick',index)

      },
      backClick() {
          this.$router.back()
      }
  }

}
</script>

<style>
 .title {
     display: flex;
     font-size: 18px;
 }
 .title-item {
     flex: 1;
 }
 .active {
     color: red;
 }
 .back {
        width: 7px;
        height: 7px;
        border-top: 2px solid;
        border-left: 2px solid;
        transform: rotate(-45deg);
        margin-top: 18px;
        margin-left: 30px;

 }
</style>
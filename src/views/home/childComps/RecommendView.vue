<template>
  <div class="recommend">
      <div v-for="(item,index) in recommend" :key="index" class="recommend-item"> 
      <a :href="item.link">
          <img :src="item.image" alt="">
          <div class="title">{{item.title}}</div>
      </a>
  </div>
  </div>
</template>

<script>
export default {
  props: {
      recommend: {
          type: Array,
          data() {
              return []
          }

      }
  }
} 
</script>

<style>
.recommend {
    display: flex;
    width: 100%;
    font-size: 14px;
}
.recommend-item {
    flex: 1;
    border-bottom: 10px solid #eee;
    text-align: center;
}
.recommend-item img {
    width: 80px;
    height: 80px;
    padding: 10px 0;
}
.title {
    margin-bottom: 10px
}
</style>
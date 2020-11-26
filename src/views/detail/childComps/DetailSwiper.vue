<template>

    <Swiper class="detail-swiper">
      <SwiperItem v-for="item in topImages" :key="item">
          <img :src="item" alt="">
      </SwiperItem>
  </Swiper>

  
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        topImages: {
            type: Array,
            default() {
                return []
            }
        }
    }

}
</script>

<style>
.detail-swiper {
    height: 300px;
    overflow: hidden;
}
.detail-swiper img {
    width: 100%;
}
</style>
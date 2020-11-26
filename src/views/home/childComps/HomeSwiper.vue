<template>
     <Swiper>
        <SwiperItem v-for="(item,index) in banner" :key="index">
           <a :href="item.link">
             <img :src="item.image" alt="" @load="imageLoad">
           </a>
        </SwiperItem>
      </Swiper>
</template>

<script>
import {Swiper, SwiperItem } from 'components/common/swiper'
export default {
    props: {
        banner: {
            type: Array,
            default() {
                return []
            }

        }
    },
    data() {
        return {
            isLoad: false
        }

    },
    methods: {
        imageLoad() {
            //防止发出多次加载事件
            if(!this.isLoad) {
              this.$emit('swiperImageLoad')
              this.isLoad = true


            }
        }

    },
    
    components: {
        Swiper,
        SwiperItem
    }

}
</script>

<style>

</style>
<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    data(){
        return {
            scroll: null
        }
    },
    props: {
        probeType: {
            type:Number,
            default: 0

        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
        
    },
    mounted(){
        //创建bs实例
        this.scroll = new BScroll(this.$refs.wrapper,{
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
            
        })
        //监听滚动位置
        this.scroll.on('scroll', position => {
            this.$emit('scroll',position)
        })

        //监听上拉事件
        if(this.pullUpLoad) {
          this.scroll.on('pullingUp',() => {
            this.$emit('pullingUp')
        })
        }
        
        
    },
    
    methods: {
        scrollTo(x,y,time){
           this.scroll &&  this.scroll.scrollTo(x,y,time)
        },
        finishPullUp() {
           this.scroll && this.scroll.finishPullUp()
        },
        refresh() {
           this.scroll && this.scroll.refresh()
        },
        getSaveY() {
            return this.scroll ? this.scroll.y : 0
        }
    }

}
</script>

<style>

</style>
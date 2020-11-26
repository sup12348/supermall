<template>
  <div id='Home'>
      <nav-bar class="home-nav">
         <div slot="center">购物街</div>
       </nav-bar>
        <tab-control :title="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl1"
      class="tabControl"
      v-show="isTabFixed"/>
     
     <scroll class="content" 
             ref="scroll" 
             :probeType='3'
             @scroll='contentScroll'
             :pullUpLoad= 'true'
             @pullingUp='loadMore'>
        <HomeSwiper :banner="banner" @swiperImageLoad='swiperImageLoad'></HomeSwiper>
      <RecommendView :recommend="recommend"></RecommendView>
      <feature-view/>
      <tab-control :title="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl2"
       />
      <goods-list :goods="showGoods"/>
     </scroll>
     <back-top @click.native='backTop' v-show="isShowBackTop"/>
     <!-- 组件不能直接监听事件，需要在监听事件后加上.native -->
    
  </div>
</template>

<script>
//公共组件
import NavBar from 'components/common/navbar/NavBar'
import GoodsList from 'components/content/goods/GoodsList'
import TabControl from 'components/content/tabcontrol/TabControl'
import scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'


//业务组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

//引入函数
import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debouce} from 'common/untils'



export default {
  
components: {
  NavBar,
  TabControl,
  HomeSwiper,
  RecommendView,
  FeatureView,
  GoodsList,
  scroll,
  BackTop
  
},
data() {
  return {
    banner: [],
    recommend: [],
    goods: {
      'pop': {page: 0,list: []},
      'new': {page: 0,list: []},
      'sell': {page: 0,list: []}

    },
    currentType: 'pop',
    isShowBackTop: false,
    tabOffsetTop: 0,
    isTabFixed: false,
    saveY: 0
}
},
created() {
  this.getHomeMultidata(),

  this.getHomeGoods("pop")
  this.getHomeGoods("sell")
  this.getHomeGoods("new")
  

 

},
mounted() {
  const refresh = debouce(this.$refs.scroll.refresh,50)
   this.$bus.$on('homeImageLoad',() => {
    // this.$refs.scroll.refresh()

    refresh()
  })
},
computed: {
  showGoods() {
    return this.goods[this.currentType].list
  },
  
},
activated() {
    this.$refs.scroll.refresh()

    this.$refs.scroll.scrollTo(0,this.saveY,0)
    
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getSaveY()

  },

methods: {
  //监听事件方法
  tabClick(index){
    switch(index) {
      case 0:
        this.currentType = 'pop'
        break
         case 1:
        this.currentType = 'sell'
        break 
        case 2:
        this.currentType = 'new'
        break
        

    }
    this.$refs.tabControl1.currentIndex = index;
    this.$refs.tabControl2.currentIndex = index;

  },
  backTop() {
    // console.log(111);
    this.$refs.scroll.scrollTo(0,0,500)
  //  下载最新的BScroll有问题
},
  contentScroll(position){
    //判断backTop是否显示
    this.isShowBackTop = (-position.y) > 1000

    //2.决定tabControl是否吸顶（position: fixed）
    this.isTabFixed = (-position.y) > this.tabOffsetTop
  },
  loadMore(){
    this.getHomeGoods(this.currentType)
  },
  swiperImageLoad() {
    //所有的组件都有一个属性$el ， 用于获取组件里的元素
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
  },
 
  //网络请求相关方法
  getHomeMultidata() {
    getHomeMultidata() .then(res => {
    // console.log(res);
    // this.result = res
    this.banner = res.data.data.banner.list
    this.recommend = res.data.data.recommend.list

  })

  },
  getHomeGoods(type) {
    const page = this.goods[type].page + 1
    getHomeGoods(type,page) .then(res => {
      this.goods[type].list.push(...res.data.data.list)
      this.goods[type].page += 1
    this.$refs.scroll.finishPullUp()


    })

  }
}
}
</script>

<style scoped>
#home {
		position: relative;
		height: 100vh;
	}
	.home-nav {
		color: #fff;
		background-color: deeppink;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9;
	}

	.content {
		overflow: hidden;
		position: absolute;
		left: 0;
		right: 0;
		top: 44px;
		bottom: 49px;
	}
.tabControl {
  position: relative;
  top: 44px;
  z-index: 9;
  background-color: #fff;
  

}
/* .fixed {
  position: fixed;
  top: 44px;
  left: 0;

} */
</style>
<template>
  <div id="detail">

      <DetailNavBar class="detail-nav" @titleClick='titleClick' ref="navBar"></DetailNavBar>
      <Scroll class="contents" ref="scroll" @scroll="contentScroll" :probeType='3'>
          <DetailSwiper :top-images='topImages'/>
      <DetailBaseInfo  :goods='Goods' />
      <DetailShopInfo :shop='shop'/>
      <DetailGoodsInfo :detailInfo='detailInfo' @imageLoad='imageLoad'/>
      <DetailParamInfo ref="param" :paramInfo='paramInfo'/>
      <DetailCommentInfo ref="comment" :commentInfo='commentInfo'/>
      <GoodsList ref="recommend" :goods='recommend'/>
      </Scroll>
     <back-top @click.native='backTop' v-show="isShowBackTop"/>

      
      <DetailBotBar @addCart='addToCart'/>
      <Toast :message='message' :isShow='isShow'/>

  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBotBar from './childComps/DetailBotBar'



import Scroll from 'components/common/scroll/Scroll'
import Toast from 'components/common/toast/Toast'

import {getDetail,Goods,Shop,Param,getRecommend} from 'network/detail'
import {debouce} from 'common/untils'
import {backTopMixin} from 'common/mixin'
import { mapActions } from 'vuex'



export default {
    name: 'Detail',
    mixins: [backTopMixin],
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBotBar,
                

        GoodsList,
        

        Scroll,
        Toast
    },
    data() {
        return {
            iid: null,
            topImages: [],
            Goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommend: [],
            themeTopYs: [],
            getThemeTopY: null,
            positionY: 0,
            currentIndex: 0,
            message: '',
            isShow: false

            


        }
    },
    created() {
        //保存传入的iid
        this.iid = this.$route.params.iid

        //根据iid展示数据
        getDetail(this.iid) .then(res => {

            // console.log(res);
            const data = res.data.result
            this.topImages = data.itemInfo.topImages
            
            //保存商品信息
            this.Goods = new Goods(data.itemInfo,data.columns,data.shopInfo)

            //保存店铺信息
            this.shop = new Shop(data.shopInfo)

            //保存商品详细数据
            this.detailInfo = data.detailInfo

            //保存商品参数信息
            this.paramInfo = new Param(data.itemParams.info,data.itemParams.rule)

            //保存评价信息
           if(data.rate.cRate !== 0) {
               this.commentInfo = data.rate.list[0]
           } 

       

            
        })
        
        //请求推荐数据
        getRecommend() .then(res => {
            // console.log(res);
            this.recommend = res.data.data.list
       
        })
        this.getThemeTopY = debouce(() => {
             this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.param.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)

        },100)
      
        
      
        

       

 },
    updated() {
 
        
        
 },
    methods: {
        ...mapActions(['addCart']),
        imageLoad(){
            this.$refs.scroll.refresh()

               this.getThemeTopY()
            
        },

        
        titleClick(index) {
            // console.log(index);
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
        },
        contentScroll(position) {
            const positionY = -position.y
            // console.log(positionY);
            const length = this.themeTopYs.length
            // for(var i = 0 ; i < length ; i++) {
            //     if(this.currentIndex !== i &&(i < length - 1 && positionY >= this.themeTopYs[i] && positionY < 
            //     this.themeTopYs[i+1]) || (i == length - 1 && positionY >= this.themeTopYs[i])) {
            //         this.currentIndex = i ;
            //         this.$refs.navBar.currentIndex = this.currentIndex

            //     }
            // }
             for(var i = 0 ; i < length - 1 ; i++) {
                if(this.currentIndex !== i &&(i < length - 1 && positionY >= this.themeTopYs[i] && positionY < 
                this.themeTopYs[i+1])) {
                    this.currentIndex = i ;
                    this.$refs.navBar.currentIndex = this.currentIndex

                }
            }
            this.listenShowBackTop(position)



        },
        addToCart() {
            //获取购物车所需要的信息
            const product = {}
            product.topImages = this.topImages[0];
            product.title = this.Goods.title;
            product.desc = this.detailInfo.desc;
            product.price = this.Goods.lowNowPrice;
            product.iid = this.iid
            

            //将商品添加到购物车里
            // this.$store.dispatch('addCart',product).then(res => {
            //     console.log(res);
            // })
           
           
           this.addCart(product) .then(res => {
                // console.log(res);
                this.message = res
                this.isShow = true

                setTimeout(() => {
                    this.message = ''
                    this.isShow = false

                },1500)


            })
            
        }


    }

}
</script>

<style scoped>
#detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;

}
.detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.contents {
    /* 自动计算高度 */
    height: calc(100% - 93px);
}
</style>
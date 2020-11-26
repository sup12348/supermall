<template>
    <div id="cart"> 
        <NavBar class="nav-bar">
           <div slot="center"> 购物车({{length}})</div>
        </NavBar>
      <scroll class="content" ref="scroll">
        <cartList/>
        
        
        
      
        
      </scroll>
      <cartBottomBar/>
      
      
        
        
   
  </div>
 
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import cartList from './childComps/cartList'
import cartBottomBar from './childComps/cartBottomBar'
import Scroll from 'components/common/scroll/Scroll'

import {mapGetters} from 'vuex'

export default {
    components: {
        NavBar,
        cartList,
        Scroll,
        cartBottomBar
    },
    computed: {
        // length() {
        //     return this.$store.state.cartList.length
        // }
        //两种语法
        // ...mapGetters(['cartLength'])
        ...mapGetters({
            length: 'cartLength'
        })
    },
    activated() {
        this.$refs.scroll.refresh()
    }

}
</script>

<style scoped>
.nav-bar {
    background-color: deeppink;
    color: #fff;

}
#cart {
		height: 100vh;
}
	.content {
		height: calc(100% - 44px - 49px - 40px);
        overflow: hidden;
	}
</style>
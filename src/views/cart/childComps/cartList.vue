<template>
  <div class="cartList">
     <cart-list-item v-for="(item,index) in cartList" 
     :key="index" 
     :cartList='item'
     :isChecked="item.checked"/>
     
   
     
     
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import cartListItem from './cartListItem'

export default {
  
   computed: {
       ...mapGetters(['cartList'])
   },
   components: {
      cartListItem
   }
   
}
</script>

<style scoped>

</style>

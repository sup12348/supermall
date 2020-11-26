<template>
  <div class="goods-list">
   <goods-list-item v-for="(item,index) in goods"
   :goods-item="item" :key="index"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
 components: {
     GoodsListItem
 },
 props: {
     goods: {
         type: Array,
         default() {
             return []
         }
     }
 }
}
</script>

<style>
.goods-list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		padding: 0 6px;
	}
</style>
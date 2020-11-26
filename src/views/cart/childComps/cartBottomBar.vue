<template>
<div class="bottom-bar">
  <div class="check-content">  
				<div  class="check-button" :class="{check2: isChecked}" :isChecked="selectAll" @click="checkClick" ></div>
        <span class="all" >全选</span>

  </div>
  <div class="price">
    合计: ￥{{totalPrice}}
  </div>
  <div class="calculate">
    去结算({{checkLength}})
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      isChecked: false
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => {
         return item.checked 
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count

      },0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item => {
         return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.count
      },0)
      
      
    },
     selectAll() {

       this.isChecked = !(this.cartList.filter(item => !item.checked).length)
       return !(this.cartList.filter(item => !item.checked).length)
       

     }
  },
   methods: {
     checkClick(){
       this.isChecked = !this.isChecked
       if(this.selectAll) {
         this.cartList.forEach(item => item.checked = false)
       } else {
         this.cartList.forEach(item => item.checked = true)
       }

       
       
     }   
   }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  align-items: center;

  background-color: pink;

  
}
.check-content {
    height: 40px;
    background-color: pink;
    /* line-height: 40px; */
    display: flex;
    align-items: center;
    margin-right: 20px;
    width: 60px;
   
    
    
    
    
}
.price {
  flex: 1;
}
 


	.check-button {
      display: inline-block;
			width: 20px;
			height: 20px;
			overflow: hidden;
			border-radius: 100%;
			border: 1px solid blue;
      line-height: 20px;
      margin-right: 5px;
      
      
		}
    	.check2 {
			background: url(~assets/images/detail/check_active.png) no-repeat center;
			background-size: cover;


      
		}
    .calculate {
      height: 40px;
      width: 100px;
      background-color: red;
      line-height: 40px;
      color: #ccc;
      text-align: center;
    }
</style>
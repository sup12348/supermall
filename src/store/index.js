import Vue from 'vue'
import Vuex from 'vuex'

//安装插件
Vue.use(Vuex)

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
const state = {
    cartList: []

}

//创建store实例对象
const store = new Vuex.Store({
    state,
    //mutations唯一的目的是修改state中的状态，里面的每一个方法最好功能都单一

    mutations,
    actions,
    getters
})

export default store
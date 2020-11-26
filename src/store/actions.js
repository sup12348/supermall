import {
    ADD_COUNTER,
    ADD_TO_CART


} from './mutations-type'
export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            let oldProduct = null;
            for (let item of context.state.cartList) {
                if (item.iid == payload.iid) {
                    oldProduct = item
                }
            }
            if (oldProduct) {
                context.commit(ADD_COUNTER, oldProduct)
                resolve('商品的数量+1')
            } else {
                context.commit(ADD_TO_CART, payload)
                resolve('新增一个商品')
            }
        })

    }
}
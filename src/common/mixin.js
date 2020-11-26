import BackTop from 'components/content/backTop/BackTop'

export const backTopMixin = {
    components: {
        BackTop

    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backTop() {
            // console.log(111);
            this.$refs.scroll.scrollTo(0, 0, 500)
                //  下载最新的BScroll有问题
        },
        listenShowBackTop(position) {
            this.isShowBackTop = (-position.y) > 1000

        }
    },
}
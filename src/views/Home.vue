<template>
    <div class="home">
        首页
        <button @click="handleClick">点击</button>
        {{ storeCount }}
        {{ countDouble }}
        {{ countAdd(3) }}
        {{ obj }}

        <!--<input :value="msg" @input="handleInput"/>{{msg}}-->

        <!--双向绑定的计算属性-->
        <input v-model="msg"/>{{msg}}
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    // console.log(mapState(['count']));

    import {COUNT_INCREMENT, CHANGE_OBJ, UPDATE_MSG} from '../store/mutation-types';

    export default {
        name: "Home",
        data() {
            return {
                count: 100,
            }
        },
        // computed: {
        //     count() {
        //         return this.$store.state.count;
        //     }
        // }
        computed: {
            // ...mapState(['count']),
            //重命名
            ...mapState({
                storeCount: state => state.count
            }),

            ...mapGetters(['countAdd', 'countDouble']),

            //Mutation 需遵守 Vue 的响应规则
            ...mapState(['obj']),
            // ...mapState(['obj', 'msg']),

            //双向绑定的计算属性
            msg: {
                get() {
                    return this.$store.state.msg;
                },
                set(value) {
                    this.$store.commit(UPDATE_MSG, {value});
                },
            },
        },
        methods: {
            ...mapMutations(['countIncrement']),
            handleClick() {
                const num = Math.floor(Math.random() * 10);
                //常用提交方式
                // this.$store.commit('countIncrement', {num});

                //对象风格的提交方式
                // this.$store.commit({
                //     type: 'countIncrement',
                //     num,
                // })

                // this.countIncrement();

                //使用常量替代 Mutation 事件类型
                this.$store.commit({
                    // type: 'COUNT_INCREMENT',

                    //也可在当前组件中引入
                    type: COUNT_INCREMENT,
                    num,
                });

                //Mutation 需遵守 Vue 的响应规则
                this.$store.commit(CHANGE_OBJ);
            },

            //表单处理
            handleInput(e) {
                // console.log('xxx');
                this.$store.commit(UPDATE_MSG, {value: e.target.value});
            }
        }
    }
</script>

<style scoped>

</style>

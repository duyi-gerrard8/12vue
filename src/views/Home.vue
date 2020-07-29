<template>
    <div class="home">
        首页
        <button @click="handleClick">点击</button>
        {{ storeCount }}
        {{ countDouble }} {{ $store.getters['count/countDouble'] }}
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
            ...mapState('count', {
                storeCount: state => state.count
            }),

            ...mapGetters('count', ['countAdd', 'countDouble']),

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

                this.$store.dispatch('count/countIncrement', {num}).then(() => {
                    alert('count值已增加');
                })

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

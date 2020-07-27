<template>
    <div class="home">
        首页
        <button @click="$store.state.count++">点击</button>
        {{ storeCount }}
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    console.log(mapState(['count']));

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
            })
        }
    }
</script>

<style scoped>

</style>

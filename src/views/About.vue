<template>
    <div class="about">
        关于
        <div id="a">aaaaa</div>
        <router-link tag="div" class="link" to="/">回首页</router-link>
    </div>
</template>

<script>
    export default {
        name: "About",
        mounted() {
            // console.log(this.$route.params);

            //获取路由元信息
            // console.log(this.$route.meta.a);
        },

    }
</script>

<style scoped>
    #a {
        margin-top: 1000px;
    }

    .link {
        margin-top: 1000px;
    }
</style>

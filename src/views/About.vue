<template>
    <div class="about">关于</div>
</template>

<script>
    export default {
        name: "About",
        mounted() {
            // console.log(this.$route.params);

            //获取路由元信息
            console.log(this.$route.meta.a);
        },

    }
</script>

<style scoped>

</style>

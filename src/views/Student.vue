<template>
    <div class="student">学员展示</div>
</template>

<script>
    export default {
        name: "Student",
        beforeRouteEnter(to, from, next) {
            //此路由守卫的next参数可为一函数,当组件全挂载完毕可使用时，此函数执行,即在mounted之后执行
            next(vm => {
                console.log(vm.name)
            });
        },
        data() {
            return {
                name: 'student'
            }
        },


        beforeRouteUpdate(to, from, next) {
            console.log('update');
            next()
        },

        beforeRouteLeave(to, from, next) {
            console.log('beforeRouteLeave');
            next();
        }
    }
</script>

<style scoped>

</style>

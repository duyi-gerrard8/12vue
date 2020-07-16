<template>
    <div class="demo">
        <button @click="handleClick">click</button>
        <transition mode="in-out">
            <component :is="cmpName"></component>
        </transition>
    </div>
</template>

<script>
    import Demo1 from './BaseDemo5-1';
    import Demo2 from './BaseDemo5-2';
    export default {
        components: {
            Demo1,
            Demo2,
        },
        data() {
            return {
                keyName: 'world',
                cmpName: 'demo1',
            }
        },
        methods: {
            handleClick() {
                const isDemo1 = this.cmpName === 'demo1';
                this.cmpName = isDemo1 ? 'demo2' : 'demo1';
            },
        }
    }
</script>

<style scoped>
    .demo {
        margin-left: 100px;
    }

    button {
        display: block;
    }

    /*.box {*/
        /*display: inline-block;*/
        /*position: absolute;*/
        /*width: 150px;*/
        /*height: 30px;*/
        /*margin-top: 10px;*/
        /*line-height: 30px;*/
        /*text-align: center;*/
        /*background-color: grey;*/
        /*color: #fff;*/
    /*}*/

    .v-enter, .v-enter-to {
        opacity: 0;
        transform: translateX(80px);
    }

    .v-enter-active, .v-leave-active {
        transition: all 0.3s;
    }

    .v-enter-to {
        opacity: 1;
        transform: translateX(0px);
    }

    .v-leave {
        opacity: 1;
        transform: translateX(0px);
    }

    .v-leave-to {
        opacity: 0;
        transform: translateX(-80px);
    }

</style>

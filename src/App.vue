<template>
    <div id="app">
        <div class="nav-box">
            <router-link to="/home" @click="handleClick" tag="div" class="logo">渡一教育</router-link>
            <div class="nav-list">
                <router-link to="/home">首页</router-link>
                <router-link to="/learn">课程学习</router-link>
                <router-link to="/student">学员展示</router-link>
                <router-link to="/about">关于</router-link>
                <router-link to="/activity">社区</router-link>
            </div>
        </div>
        <div class="container">
            <transition>
                <router-view></router-view>
            </transition>
            <!--<router-view name="student"></router-view>-->
        </div>

    </div>
</template>

<script>

    export default {
        name: 'App',
        components: {},
        methods: {
            handleClick() {
                //push 等同于router-link to="/about"
                this.$router.push('/home');

                //replace
                // this.$router.replace('/home');

                //go
                // this.$router.go(-1);

                console.log(this.$route);
            },
        },
    }
</script>

<style>
    /*过渡动效*/
    .v-enter {
        transform: translateX(1000px);
    }

    .v-enter-active {
        transition: all 0.3s;
    }

    .v-enter-to {
        transform: translateX(0px);
    }

    #app {
        /*overflow-x: hidden;*/
    }

    .nav-box {
        display: flex;
        justify-content: space-between;
        height: 60px;
        line-height: 60px;
        background-color: #3385ff;
    }

    .logo {
        color: #fff;
    }

    .nav-list a {
        margin-left: 40px;
        color: #fff;
        text-decoration: none;
    }

    .nav-list a.router-link-active {
        font-weight: bold;
    }

    .container {
        margin-top: 60px;
    }

    .nav-box, .container {
        padding-left: 200px;
        padding-right: 200px;
    }
</style>

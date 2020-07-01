<template>
    <div>
        xxx
        {{ msg }}
        <p>我是app组建的p元素</p>
        <base-son/>
    </div>
</template>

<script>
    import baseSon from './son';
    export default {
        name: "app",
        components: {
            baseSon
        },
        data() {
            return {
                msg: 'hello world'
            }
        }
    }
</script>

<style scoped>
    div {
        background-color: red;
    }
</style>

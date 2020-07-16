<template>
    <div class="demo">
        <button @click="handleClick">click</button>
        <transition>
            <!--<div v-if="show" key="world">hello world</div>-->
            <!--<div v-else key="shanshan">hello shanshan</div>-->
            <div :key="keyName">hello {{ keyName }}</div>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                keyName: 'world'
            }
        },
        methods: {
            handleClick() {
                const isWorld = this.keyName === 'world';
                this.keyName = isWorld ? 'shanshan' : 'world';
            },
        }
    }
</script>

<style scoped>
    .v-enter, .v-enter-to {
        opacity: 0;
    }

    .v-enter-active, .v-leave-active {
        transition: all 0.3s;
    }

    .v-enter-to, .v-leave {
        opacity: 1;
    }

</style>

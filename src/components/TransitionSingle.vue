<!--<template>-->
    <!--<transition>-->
        <!--<slot></slot>-->
    <!--</transition>-->
<!--</template>-->

<script>
    export default {
        functional: true,
        render(h, content) {
            const {slots} = content;
            return (
                <transition name='single'>
                { slots().default }
                </transition>
            )
        },
    }
</script>

<style>
    .single-enter,
    .single-leave-to {
        opacity: 0;
    }

    .single-enter-active,
    .single-leave-active {
        transition: all 1s;
    }

    .single-enter-to,
    .single-leave {
        opacity: 1;
    }
</style>

<template>
    <div class="date-picker">
        <div class="picker-input">
            <span class="input-prefix">
                <i>xx</i>
            </span>
            <input type="text">
        </div>
        <div class="picker-panel">
            <div class="picker-arrow"></div>
            <div class="picker-body">
                <div class="picker-header">
                    <span class="picker-btn icon-prev-year"></span>
                    <span class="picker-btn icon-prev-month"></span>
                    <span class="picker-date">
                        2020年1月
                    </span>
                    <span class="picker-btn icon-next-month"></span>
                    <span class="picker-btn icon-next-year"></span>
                </div>
                <div class="picker-content">
                    <div class="picker-weeks">
                        <div
                                v-for="week in ['日','一','二','三','四','五','六']"
                                :key="week"
                        >{{ week }}
                        </div>
                    </div>
                    <div class="picker-days">
                        <div
                                v-for="date in 42" :key="date"
                        >{{ date }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DatePicker"
    }
</script>

<style scoped>

</style>

<template>
    <div class="date-picker">
        <div class="picker-input">
            <span class="input-prefix">
                <i class="iconfont icon-date"></i>
            </span>
            <input type="text">
        </div>
        <div class="picker-panel">
            <div class="picker-arrow"></div>
            <div class="picker-body">
                <div class="picker-header">
                    <span class="picker-btn iconfont icon-prev-year"></span>
                    <span class="picker-btn iconfont icon-prev-month"></span>
                    <span class="picker-date">
                        2020年1月
                    </span>
                    <span class="picker-btn iconfont icon-next-month"></span>
                    <span class="picker-btn iconfont icon-next-year"></span>
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
    @import "assets/font.css";

    .picker-input {
        position: relative;
    }

    .picker-input input {
        height: 40px;
        line-height: 40px;
        padding: 0 30px;
        background-color: #fff;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
    }

    .picker-input .input-prefix {
        position: absolute;
        left: 5px;
        width: 25px;
        height: 100%;
        line-height: 40px;
        text-align: center;
        color: #c0c4cc;
    }

    .picker-panel {
        position: relative;
        width: 322px;
        height: 329px;
        margin-top: 5px;
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        background-color: #fff;
    }

    .picker-panel .picker-arrow {
        position: absolute;
        top: -12px;
        left: 30px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-bottom-color: #ebeef5;
    }

    /*解决三角形只显示两条边的问题*/
    .picker-panel .picker-arrow::after {
        position: absolute;
        left: -6px;
        top: 1px;
        content: '';
        display: block;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-bottom-color: #fff;
        border-top-width: 0;
    }

    .picker-body {

    }

    .picker-header {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 15px;
        padding-bottom: 10px;
    }

    .picker-btn {
        margin-right: 5px;
        margin-left: 5px;
        font-size: 12px;
        color: #303133;
        cursor: pointer;
    }

    .picker-date {
        margin-left: 60px;
        margin-right: 60px;
        font-size: 14px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .picker-content {
        padding: 0 10px 10px 10px;
        color: #606266;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .picker-weeks {
        display: flex;
        justify-content: space-around;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ebeef5;
    }

    .picker-days {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .picker-days div {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 4px 6px;
        font-size: 12px;
        cursor: pointer;
    }

    .picker-days div:hover {
        color: #4091ff;
    }

    .picker-days div.is-today {
        color: #4091ff;
        font-weight: 700;
    }

    .picker-days div.is-select {
        color: #fff;
        background-color: #4091ff;
        border-radius: 50%;
    }

    .picker-days div.other-month {
        color: #c0c4cc;
    }
</style>

<template>
    <div class="date-picker" v-click-outside>
        <div class="picker-input">
            <span class="input-prefix">
                <i class="iconfont icon-date"></i>
            </span>
            <input
                    type="text"
                    :value="chooseDate"
            />
        </div>
        <div class="picker-panel" v-if="showPanel">
            <div class="picker-arrow"></div>
            <div class="picker-body">
                <div class="picker-header">
                    <span class="picker-btn iconfont icon-prev-year" @click="onChangeYear('prev')"></span>
                    <span class="picker-btn iconfont icon-prev-month" @click="onChangeMonth('prev')"></span>
                    <span class="picker-date">
                        {{ showDate.year}}年{{ showDate.month + 1 }}月
                    </span>
                    <span class="picker-btn iconfont icon-next-month" @click="onChangeMonth('next')"></span>
                    <span class="picker-btn iconfont icon-next-year" @click="onChangeYear('next')"></span>
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
                                v-for="date in showDay"
                                :key="date.getTime()"
                                :class="{
                                    'other-month': !isCur(date).month,
                                    'is-select': isCur(date).select,
                                    'is-today': isCur(date).today
                                }"
                                @click="onChooseDate(date)"
                        >{{ date.getDate() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        directives: {
            //自定义指令，处理选择器显示与隐藏
            'click-outside': {
                bind(el, binding, vnode) {
                    const vm = vnode.context;//组件实例
                    document.onclick = function (e) {
                        // console.log('xxx')
                        // console.log(el);
                        const dom = e.target;//触发事件的元素
                        const isElSon = el.contains(dom);//是否包含子元素
                        if (isElSon) {
                            if (!vm.showPanel) {
                                vm.changePanel(true);
                            }
                        } else {
                            if (vm.showPanel) {
                                vm.changePanel(false);
                            }
                        }
                    }
                },
            }
        },
        //在组件中使用v-model,
        model: {
            prop: 'date',
            event: 'choose-date',
        },
        props: {
            date: {
                type: Date,
                default() {
                    return new Date();
                },
            }
        },
        computed: {
            chooseDate() {
                const {year, month, day} = this.getYearMonthDay(this.date);

                return `${year}-${month + 1}-${day}`
            },
            //月视图显示的日期
            showDay() {
                const {year, month} = this.showDate;
                const firstDay = new Date(year, month, 1);//当前月份的第一天(每月1日)
                const week = firstDay.getDay();
                const startDay = firstDay - week * 24 * 60 * 60 * 1000;//月视图开始的日期
                // console.log(week);
                let arr = [];

                for (let i = 0; i < 42; i++) {
                    arr.push(new Date(startDay + i * 24 * 60 * 60 * 1000)); //当前日期的下一天
                }
                return arr;
            },
        },
        data() {
            return {
                showPanel: false,
                showDate: {
                    year: 0,
                    month: 0,
                    day: 0,
                },
            }
        },
        created() {
            this.getShowDate(this.date);
        },
        methods: {
            changePanel(flag) {
                this.showPanel = flag;
            },
            //选择器中显示的年月
            getShowDate(date) {
                const {year, month, day} = this.getYearMonthDay(date);

                this.showDate = {
                    year, month, day,
                }
            },
            getYearMonthDay(date) {
                const year = date.getFullYear();
                const month = date.getMonth();
                const day = date.getDate();
                return {
                    year, month, day,
                }
            },
            //判断当前日是否属于当前月份，date是视图中的每一天的日期对象
            isCur(date) {
                const chooseDate = new Date(this.chooseDate);//获得选择的日期对象

                const {year: showYear, month: showMonth} = this.showDate;//月视图中显示的年月
                const {year: chooseYear, month: chooseMonth, day: chooseDay} = this.getYearMonthDay(chooseDate);//获取选择的日期的年月日信息
                const {year: curYear, month: curMonth, day: curDay} = this.getYearMonthDay(new Date());//获取今天的日期
                const {year, month, day} = this.getYearMonthDay(date);//当前月是哪年哪月

                return {
                    //判断月视图中当前的日期是否与本年本月是同一个月
                    month: year === showYear && month === showMonth,
                    //判断月视图中显示的当前日期是否是自己选择的日期,用以添加选中日期高亮样式。
                    select: year === chooseYear && month === chooseMonth && day === chooseDay,
                    //判断是否是今天
                    today: year === curYear && month === curMonth && day === curDay
                }
            },

            //点击切换当前日期
            onChooseDate(date) {
                this.$emit('choose-date', date);
                this.changePanel(false);
                this.getShowDate(date);//此参数是选中的日期，传参后会更新当前的月视图为选中的日期所在的月份
            },

            //切换月份,方法1
            // onChangeMonth(type) {
            //     const moveMonth = type === 'prev' ? -1 : 1;
            //     const minMonth = 0;
            //     const maxMonth = 11;
            //     let {year, month} = this.showDate;
            //     month += moveMonth;
            //     if (month < minMonth) {
            //         month = maxMonth;
            //         year--;
            //     } else if (month > maxMonth) {
            //         month = minMonth;
            //         year++;
            //     }
            //     this.showDate.month = month;
            //     this.showDate.year = year;
            // },

            //切换月份,方法2:利用Date日期对象方法setMonth()
            onChangeMonth(type) {
                const { year, month, day } = this.showDate;
                const moveMonth = type === 'prev' ? -1 : 1;
                const showDate = new Date(year, month, day);
                showDate.setMonth(month + moveMonth);//设置月份
                const { year:showYear, month:showMonth } =this.getYearMonthDay(showDate);
                this.showDate.year = showYear;
                this.showDate.month = showMonth;
            },

            //切换年
            onChangeYear(type) {
                const moveYear = type === 'prev' ? -1 : 1;
                this.showDate.year += moveYear;
            }
        },
    }
</script>

<style scoped>
    @import "assets/font.css";

    .date-picker {
        display: inline-block;
    }

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
        position: absolute;
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

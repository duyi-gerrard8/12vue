import Vue from 'vue';
import Vuex from 'vuex';

import {COUNT_INCREMENT, CHANGE_OBJ, UPDATE_MSG} from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        count: 0,
        studentList: [],
        obj: {a: 1},
        msg: '',
    },
    getters: {
        countDouble(state) {
            return state.count * 2;
        },
        countAdd(state) {
            return function (num) {
                return state.count + num;
            }
        },

        //getters例:
        studentLength: state => state.studentList.length,
        studentJuveniles: state => state.studentList.filter(student => student.age < 18),
    },

    // mutations: {
    //     countIncrement (state, {num}) {
    //         state.count += num;
    //     }
    // },


    mutations: {
        //使用常量替代 Mutation 事件类型
        [COUNT_INCREMENT](state, {num}) {
            state.count += num;
        },

        //Mutation 需遵守 Vue 的响应规则
        [CHANGE_OBJ](state) {
            Vue.set(state.obj, 'b', 10);
            // state.obj = {...state.obj, b: 10}
        },

        //表单处理
        [UPDATE_MSG](state, {value}) {
            state.msg = value;
        }
    },

    actions: {
        countIncrement(context, payload) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit(COUNT_INCREMENT, payload);
                    resolve();
                }, 1000);
            });

        },
    },
});

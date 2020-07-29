import Vue from 'vue';
import Vuex from 'vuex';

import count from './modules/count';
import student from './modules/student';

import { CHANGE_OBJ, UPDATE_MSG } from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    //配置模块
    modules: {
        count,
        student,
    },
    state: {
        obj: {a: 1},
        msg: '',
    },

    mutations: {
        //Mutation 需遵守 Vue 的响应规则
        [CHANGE_OBJ](state) {
            Vue.set(state.obj, 'b', 10);
            // state.obj = {...state.obj, b: 10}
        },

        //表单处理
        [UPDATE_MSG](state, {value}) {
            state.msg = value;
        }
    }
});

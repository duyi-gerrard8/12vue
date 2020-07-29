import { COUNT_INCREMENT } from "../mutation-types";
import Vue from "vue";

export default {
    namespaced: true,
    state: {
        count: 0,
    },
    getters: {
        countDouble(state, getters, rootState) {
            return state.count * 2;
        },
        countAdd(state) {
            return function (num) {
                return state.count + num;
            }
        }
    },

    mutations: {
        //使用常量替代 Mutation 事件类型
        [COUNT_INCREMENT](state, {num}) {
            state.count += num;
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
}

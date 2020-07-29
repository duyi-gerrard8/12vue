import {CHANGE_OBJ, COUNT_INCREMENT, UPDATE_MSG} from "../mutation-types";
import Vue from "vue";

export default {
    state: {
        studentList: [],
    },
    getters: {
        //getters例:
        studentLength: state => state.studentList.length,
        studentJuveniles: state => state.studentList.filter(student => student.age < 18),
    },

}

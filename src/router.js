import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Hone';
// import Learn from './components/Learn';
// import Student from './components/Student';
// import About from './components/About';
// import Activity from './components/Activity';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/learn',
        component: () => import('./views/Learn'),
    },
    {
        path: '/student',
        component: () => import('./views/Student'),
    },
    {
        path: '/about',
        component: () => import('./views/About'),
    },
    {
        path: '/activity',
        component: () => import('./views/Activity'),
    },
];

export default new VueRouter({
    mode: 'history',
    routes: routes,
    // linkActiveClass: 'link-active',
    // linkExactActiveClass: 'link-exact',
});



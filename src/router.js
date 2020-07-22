import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Hone';
// import Learn from './components/Learn';
// import Student from './components/Student';
// import About from './components/About';
// import Activity from './components/Activity';

Vue.use(VueRouter);

const routes = [
    {//用重定向解决首页路径和标签类名问题
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Home,
        // alias: '/', //别名
    },
    {
        path: '/learn',
        // component: () => import('./views/Learn'),

        //命名视图
        //视图名字： 展示的组件
        components: {
            default: () => import('./views/Learn'),
            student: () => import('./views/Student')
        }
    },
    {
        path: '/student',
        component: () => import('./views/Student'),
    },
    {
        path: '/about',
        component: () => import('./views/About'),
        //路由独享守卫
        beforeEach(to, from, next) {
            console.log('beforeEach');
            next();
        },
    },
    {
        path: '/activity',
        component: () => import(/*webpackChunkName: 'academic'*/'./views/Activity'),
        //重定向
        // redirect: '/activity/academic',
        // redirect: {name: 'academic'},//用路由名字重定向
        redirect(to) {//函数形式的重定向
            // console.log(to);
            return {
                name: 'academic',
            }
        },
        children: [
            {
                path: 'academic',
                name: 'academic',
                component: () => import(/*webpackChunkName: 'academic'*/'./views/Academic'),


            },
            {
                path: 'personal',
                name: 'personal',
                component: () => import('./views/Personal'),
            },
            {
                path: 'download',
                name: 'download',
                component: () => import('./views/Download'),
            },
        ],
    },

    // {
    //     path: '/course:id',
    //     component: () => import('./views/About'),
    // },

    //路由组件传参
    //如果 props 被设置为 true，则route.params 将会被设置为组件属性。
    {
        path: '/question/:id',
        name: 'question',
        // props: true,
        props: route => ({
            name: route.name,
            id: route.params.id,
        }),
        component: () => import('./views/Question')
    }

];

const router = new VueRouter({
    mode: 'history',
    routes: routes,
    // linkActiveClass: 'link-active',
    // linkExactActiveClass: 'link-exact',
});

//导航守卫：全局前置守卫
router.beforeEach((to, from, next) => {
    // console.log(to);//去到哪
    // console.log(from);//从哪来

    console.log('beforeEach');
    next(); //能否跳转

    // if (to.path === '/student') {
    //     next('/about');
    // } else {
    //     next();
    // }

    // next(new Error('不让跳转'));

});

//全局解析守卫
router.beforeResolve((to, from, next) => {
    console.log('beforeResolve');
    next();
});

//全局后置钩子
router.afterEach((to, from) => {
    console.log('afterEach');
});

router.onError(err => {
    console.log(err.message)
});

export default router;

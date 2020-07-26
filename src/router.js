import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home';

import auth from './utils/auth';

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
            // student: () => import('./views/Student')
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

        //路由元信息.可利用它配置自定义的信息
        meta: {
            // a: 1,
            // b: 10,
            requiresLogin: true,
            backAsk: true,
        }
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
        meta: {
            requiresLogin: true,
            backAsk: true,
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
    },

    {
        path: '/login',
        component: () => import('./views/login'),
    }

];

const router = new VueRouter({
    mode: 'history',
    routes: routes,
    // linkActiveClass: 'link-active',
    // linkExactActiveClass: 'link-exact',

    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        console.log(savedPosition);
        if (savedPosition) {
            return savedPosition
        } else {
            if (to.hash) {
                return {selector: to.hash}
            } else {
                return {x: 0, y: 0}
            }
        }
        // return {
        //     x: 0,
        //     y: 0,
        // }
    },
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

//路由元信息应用例子
router.beforeEach((to, from, next) => {
    // console.log(to.meta.requiresLogin);
    // next();
    const isRequiresLogin = to.matched.some(item => item.meta.requiresLogin);
    console.log(isRequiresLogin);

    if (isRequiresLogin) {
        const isLogin = auth.isLogin();
        if (isLogin) {
            next();
        } else {
            const isToLogin = window.confirm('登录吗？？');
            isToLogin ? next('/login') : next(false);

            next(false);
        }
        next(false);
    } else {
        next();
    }

});

export default router;

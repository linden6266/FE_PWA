import { createRouter, createWebHistory } from 'vue-router'


const MenuApp = () => import('remote/bootstrap');
const guestpageApp = () => import('guestpage/main');
const groupcodeApp = () => import('groupcode/main');
const HomeView = () => import('remote/HomeView');
// const isPWA = process.env.VUE_APP_USE_PWA === 'true';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/menu', component: MenuApp },
    { path: "/groupcode", component: groupcodeApp },
    { path: '/', redirect: '/guestpage' },
    { path: '/guestpage', component: HomeView },
    { path: '/:code', component: guestpageApp },
  ]
})

export default router

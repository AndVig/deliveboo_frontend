import { createRouter, createWebHistory } from "vue-router";

import AppHomePage from './pages/AppHomePage.vue';
import AppMenuPage from './pages/AppMenuPage.vue';
import AppCarrelloPage from './pages/AppCarrelloPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHomePage
        },
        {
            path: '/menu',
            name: 'menu',
            component: AppMenuPage
        },
        {
            path: '/carrello',
            name: 'carrello',
            component: AppCarrelloPage
        },
    ]
});

export { router };
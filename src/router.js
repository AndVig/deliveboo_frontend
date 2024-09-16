import { createRouter, createWebHistory } from "vue-router";

import AppHomePage from "./pages/AppHomePage.vue";
import AppMenuPage from "./pages/AppMenuPage.vue";
import AppCarrelloPage from "./pages/AppCarrelloPage.vue";
import RestaurantDetails from "./pages/RestaurantDetails.vue";


import axios from "axios";

// Funzione per caricare gli slug dall'API e aggiungere le route dinamiche
async function addDynamicRoutes() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/restaurants");
    const slugs = response.slug;

    // slugs.forEach((slug) => {
    //   router.addRoute({
    //     path: `/${slug}`,
    //     name: `Slug-${slug}`,
    //     component: () => import("./views/DynamicPage.vue"),
    //     props: { slug },
    //   });
    // });

    // Forza un re-render del router
    router.go(router.currentRoute);
  } catch (error) {
    console.error("Errore nel caricamento degli slug:", error);
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHomePage,
    },
    {
      path: "/menu",
      name: "menu",
      component: AppMenuPage,
    },
    {
      path: "/carrello",
      name: "carrello",
      component: AppCarrelloPage,
    },
    // Rotta dinamica con parametro
    {
      path: "/restaurant/:slug",
      name: "RestaurantDetails",
      component: RestaurantDetails,
      props: true,
    },
    // Rotta catch-all per 404
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("./pages/NotFound.vue"),
    },
  ],
});

export { router };

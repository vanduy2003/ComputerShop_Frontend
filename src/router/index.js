import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/Home/HomePage.vue";
import ProductDetailPage from "../views/Product/ProductDetailPage.vue";
import NewPage from "@/views/New/NewPage.vue";
import ListCategoryPage from "@/views/Category/ListCategoryPage.vue";

const routes = [
        { path: "/", component: HomePage },
        { path: "/products/:id", component: ProductDetailPage },
        { path: "/new/:id", component: NewPage },
        { path: "/category/:id", component: ListCategoryPage },
    ],
    scrollBehavior = () => ({ top: 0 });

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior,
});

export default router;

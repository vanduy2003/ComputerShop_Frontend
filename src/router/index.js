import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";

// Import các trang
import HomePage from "../views/Home/HomePage.vue";
import ProductDetailPage from "../views/Product/ProductDetailPage.vue";
import CartsPage from "@/views/Cart/CartsPage.vue";
import NewPage from "@/views/New/NewPage.vue";
import ListCategoryPage from "@/views/Category/ListCategoryPage.vue";
import CartsConfirmPage from "@/views/Cart/CartsConfirmPage.vue";
import BuySuccessPage from "@/views/Cart/BuySuccessPage.vue";
import PageError from "@/views/PageError.vue";
import AdminDashboardPage from "@/views/Manager/AdminDashboardPage.vue";
import ProductManage from "@/components/manager/ProductManager/ProductManage.vue";
import AddProduct from "@/components/manager/ProductManager/AddProduct.vue";

const routes = [
    { path: "/", component: HomePage },
    { path: "/products/:id", component: ProductDetailPage },
    { path: "/new/:id", component: NewPage },
    { path: "/category/:id", component: ListCategoryPage },
    { path: "/me/cart", component: CartsPage },
    { path: "/me/cart/cart-confirm-buy", component: CartsConfirmPage },
    { path: "/me/cart/buy-success/:id", component: BuySuccessPage },

    // 🚀 Các route admin (chỉ dành cho admin)
    {
        path: "/admin/dashboard",
        component: AdminDashboardPage,
        meta: { requiresAdmin: true },
    },

    {
        path: "/admin/products-list-manage",
        component: ProductManage,
        meta: { requiresAdmin: true }, // ✅ Bổ sung meta.requiresAdmin
    },

    {
        path: "/admin/products/add-product",
        component: AddProduct,
        props: () => ({ isEdit: false }), // ✅ Tránh lỗi undefined
        meta: { requiresAdmin: true },
    },
    {
        path: "/admin/products/edit/:id",
        component: AddProduct,
        props: (route) => ({ isEdit: true, id: route.params.id }), // ✅ Truyền ID vào component
        meta: { requiresAdmin: true },
    },

    // 🚨 Route bắt tất cả các đường dẫn không hợp lệ
    { path: "/:pathMatch(.*)*", component: PageError },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ top: 0 }), // ✅ Cuộn lên đầu trang khi chuyển route
});

// 🚀 Middleware kiểm tra quyền admin trước khi vào trang admin
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();

    // Nếu chưa có thông tin user, gọi API để lấy
    if (!userStore.user) {
        await userStore.fetchUser();
    }

    // Nếu vào trang admin mà không phải admin → Chuyển về trang chính
    if (to.meta.requiresAdmin && !userStore.isAdmin) {
        next("/"); // ✅ Chuyển về trang Home
    } else {
        next();
    }
});

export default router;

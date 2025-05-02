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
import CategoryManager from "@/components/manager/CategoryManager/CategoryManager.vue";
import OrderManager from "@/components/manager/OrderManager/OrderManage.vue";
import OrderDetail from "@/components/manager/OrderManager/OrderDetail.vue";
import SupplierManage from "@/components/manager/SupplierManager/SupplierManage.vue";
import NewManager from "@/components/manager/NewManager/NewManager.vue";
import FormNew from "@/components/manager/NewManager/FormNew.vue";
import UserManager from "@/components/manager/UserManager/UserManager.vue";
import OrderPage from "@/views/Order/OrderPage.vue";
import OrderCliendDetail from "@/components/content/OrderStatus/OrderDetail.vue";
import ContactShop from "@/components/content/contact/ContactShop.vue";
import ComponentManager from "@/components/manager/ComponentManager/ComponentManager.vue";
import FavoriteProduct from "@/components/content/favorite/FavoriteProduct.vue";
import CompareDetail from "@/components/content/social/CompareDetail.vue";
import UserProfilePage from "@/components/content/contact/UserProfilePage.vue";

const routes = [
    // 🚀 Các route phổ biến
    { path: "/", component: HomePage },
    // 🚀 Route chi tiết sản phẩm
    { path: "/products/:id", component: ProductDetailPage },
    // 🚀 Route tin tức
    { path: "/new/:id", component: NewPage },
    // 🚀 Route danh mục
    { path: "/category/:id", component: ListCategoryPage },
    // 🚀 Route giỏ hàng
    { path: "/me/cart", component: CartsPage },
    // 🚀 Route xác nhận mua hàng
    { path: "/me/cart/cart-confirm-buy", component: CartsConfirmPage },
    // 🚀 Route mua hàng thành công
    { path: "/me/cart/buy-success/:id", component: BuySuccessPage },
    // 🚀 Route đơn hàng
    { path: "/me/list-order", component: OrderPage },
    // 🚀 Route chi tiết đơn hàng
    { path: "/me/order/order-detail/:id", component: OrderCliendDetail },
    // 🚀 Route liên hệ
    { path: "/contact", component: ContactShop },
    // 🚀 Route yêu thích
    { path: "/me/favorite", component: FavoriteProduct },
    // 🚀 Route so sánh sản phẩm
    { path: "/compare", component: CompareDetail },
    // 🚀 Route thông tin cá nhân
    { path: "/me/user-profile", component: UserProfilePage },

    // 🚀 Các route admin (chỉ dành cho admin)
    {
        path: "/admin/dashboard",
        component: AdminDashboardPage,
        meta: { requiresAdmin: true },
    },
    // 🚨 Route quản lý sản phẩm
    {
        path: "/admin/products-list-manage",
        component: ProductManage,
        meta: { requiresAdmin: true }, // ✅ Bổ sung meta.requiresAdmin
    },
    // 🚨 Route thêm mới sản phẩm
    {
        path: "/admin/products/add-product",
        component: AddProduct,
        props: () => ({ isEdit: false }), // ✅ Tránh lỗi undefined
        meta: { requiresAdmin: true },
    },
    // 🚨 Route chỉnh sửa sản phẩm
    {
        path: "/admin/products/edit/:id",
        component: AddProduct,
        props: (route) => ({ isEdit: true, id: route.params.id }), // ✅ Truyền ID vào component
        meta: { requiresAdmin: true },
    },
    // 🚨 Route quản lý danh mục
    {
        path: "/admin/category-list-manage",
        component: CategoryManager,
        meta: { requiresAdmin: true }, // ✅ Bổ sung meta.requiresAdmin
    },
    // 🚨 Route quản lý đơn hàng
    {
        path: "/admin/order-list-manage",
        component: OrderManager,
        meta: { requiresAdmin: true }, // ✅ Bổ sung meta.requiresAdmin
    },
    // 🚨 Route chi tiết đơn hàng
    {
        path: "/admin/order-detail/:id",
        component: OrderDetail,
        props: (route) => ({ orderId: route.params.id }), // ✅ Truyền ID vào component
        meta: { requiresAdmin: true },
    },
    // 🚨 Route quản lý nhà cung cấp
    {
        path: "/admin/supplier-list-manage",
        component: SupplierManage,
        meta: { requiresAdmin: true }, // ✅ Bổ sung meta.requiresAdmin
    },
    // 🚨 Route quản lý tin tức
    {
        path: "/admin/new-list-manage",
        component: NewManager,
        meta: { requiresAdmin: true }, // ✅ Bổ sung meta.requiresAdmin
    },
    // 🚨 Route thêm mới tin tức
    {
        path: "/admin/news/add-new",
        component: FormNew,
        props: () => ({ isEdit: false }), // ✅ Tránh lỗi undefined
        meta: { requiresAdmin: true },
    },
    // 🚨 Route chỉnh sửa tin tức
    {
        path: "/admin/news/edit/:id",
        component: FormNew,
        props: (route) => ({ isEdit: true, id: route.params.id }), // ✅ Tránh lỗi undefined
        meta: { requiresAdmin: true },
    },
    // 🚨 Route quản lý người dùng
    {
        path: "/admin/user-list-manage",
        component: UserManager,
        meta: { requiresAdmin: true }, // ✅ Bổ sung meta.requiresAdmin
    },
    // 🚀 Route quản lý componen
    {
        path: "/admin/component-list-manage",
        component: ComponentManager,
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

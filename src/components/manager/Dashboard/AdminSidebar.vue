<template>

    <div class="sidebar">
        <v-navigation-drawer expand-on-hover v-model="drawer" app color="black" :width="300">
            <!-- Logo -->
            <v-list-item>
                <v-list-item-avatar class="d-block mt-2 cursor-pointer" @click="navigate('/admin/dashboard')">
                    <v-img src="https://i.imgur.com/AGkTeSa.png"></v-img>
                </v-list-item-avatar>
            </v-list-item>

            <v-divider></v-divider>

            <!-- Menu Items -->

            <v-list nav dense class="sidebar-menu">

                <v-list-item link>
                    <div class="d-flex align-center" @click="navigate('/admin/dashboard')">
                        <v-icon class="mr-2">mdi mdi-home-analytics</v-icon>
                        <v-list-item-title class="fs-6 fw-semibold">Trang chủ</v-list-item-title>
                    </div>
                </v-list-item>

                <v-list-group v-for="(group, index) in menuItems" :key="index">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">
                            <div class="d-flex align-center">
                                <v-icon class="mr-2">{{ group.icon }}</v-icon>
                                <v-list-item-title class="fs-6 fw-semibold">{{ group.title }}</v-list-item-title>
                            </div>
                        </v-list-item>
                    </template>

                    <v-list-item v-for="(item, i) in group.children" :key="i" link @click="navigate(item.route)">
                        <v-list-item-title class="pl-5 fs-6">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
    </div>

</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const drawer = ref(true);

const menuItems = ref([
    {
        title: "Quản Lý Sản Phẩm",
        icon: "mdi mdi-package-variant-closed",

        children: [
            { title: "Danh sách sản phẩm", route: "/admin/products-list-manage" },
            { title: "Thêm sản phẩm", route: "/admin/products/add-product" },
        ],
    },
    {
        title: "Quản Lý Đơn Hàng",
        icon: "mdi mdi-cart",

        children: [
            { title: "Danh sách đơn hàng", route: "/admin/order-list-manage" },
        ],
    },
    {
        title: "Quản Lý Danh Mục",
        icon: "mdi mdi-format-list-bulleted",

        children: [
            { title: "Danh sách danh mục", route: "/admin/category-list-manage" },
        ],
    },
    {
        title: "Quản Lý Nhà Cung Cấp",
        icon: "mdi mdi-truck",

        children: [
            { title: "Danh sách nhà cung cấp", route: "/admin/supplier-list-manage" },
        ],
    },
    {
        title: "Quản Lý Tin Tức",
        icon: "mdi mdi-new-box",
        children: [
            { title: "Danh sách tin tức", route: "/admin/new-list-manage" },
            { title: "Thêm tin tức", route: "/admin/news/add-new" },
        ]
    },
    {
        title: "Quản Lý Linh Kiện",
        icon: "mdi mdi-cog",
        children: [
            { title: "Danh sách linh kiện", route: "/admin/component-list-manage" },
        ]
    },

    {
        title: "Thống Kê", icon: "mdi mdi-chart-bar", children: [
            { title: "Thống kê sản phẩm", route: "/admin/statistics/products" },
            { title: "Thống kê đơn hàng", route: "/admin/statistics/orders" },
        ]
    },

    {
        title: "Quản Lý Khách Hàng",
        icon: "mdi mdi-account-group",

        children: [
            { title: "Danh sách khách hàng", route: "/admin/user-list-manage" },
        ],
    },

]);



const navigate = (route) => {
    if (route) router.push(route);
};
</script>

<style scoped>
.v-list-item {
    color: white;
}

.v-list-item:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>
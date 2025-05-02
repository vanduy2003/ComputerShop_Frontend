<template>
    <div>
        <div class="banner-top" style="width: 100%; margin: 0 auto;background: #ff6300;">
            <a href="/ad.php?id=308" class="item" style="display:block;">
                <img class="lazy loaded" width="1600" height="35" alt="" style="display:block; margin: 0 auto;"
                    src="https://www.tncstore.vn/media/banner/14_08-f958cee856ddbb947dbd1e0f9065cbf1.png">
            </a>
        </div>

        <div class="header" :class="{ sticky: isSticky }">
            <!-- Header Top -->
            <div class="header-top">
                <div class="container">
                    <div class="d-flex justify-content-end">
                        <router-link to="#" class="item d-flex align-items-center">
                            <i class="mdi mdi-store"></i>
                            <span class="hover-txt">Tất cả sản phẩm</span>
                        </router-link>
                        <router-link to="#" class="item d-flex align-items-center">
                            <i class="mdi mdi-phone-in-talk-outline"></i>
                            <span class="hover-txt">(086) 830.2123</span>
                        </router-link>
                        <a href="mailto:cskh@tncstore.vn" class="item d-flex align-items-center">
                            <i class="mdi mdi-email"></i>
                            <span class="hover-txt">cskh@tncstore.vn</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Header Mid -->
            <div class="header-mid">
                <div class="container">
                    <div class="content-header-mid d-flex align-items-center">
                        <!-- Logo -->
                        <router-link to="/" class="logo me-5">
                            <img src="https://i.imgur.com/AGkTeSa.png" alt="logo" width="160px" height="58px" />
                        </router-link>

                        <!-- Search Form -->
                        <div class="form__input">
                            <div class="search-form-container">
                                <input type="text" class="text_search" placeholder="Nhập sản phẩm cần tìm..."
                                    v-model="searchQuery" />
                                <button type="submit" class="submit-search">
                                    <i class="mdi mdi-magnify"></i> Tìm kiếm
                                </button>
                            </div>
                        </div>
                        <!-- Danh sách sản phẩm -->
                        <div class="autocomplete-suggestions" v-if="filteredProducts.length > 0">
                            <div class="content-suggestions">
                                <router-link :to="`/products/${product.productId}`" v-for="product in filteredProducts"
                                    @click="clearSearch" :key="product.productId"
                                    class=" d-flex align-items-center justify-space-between item">
                                    <div class="info fw-semibold ">
                                        <p class="line-clamp-1 fs-6 text-dark mb-0">{{ product.name }}</p>
                                        <span class="price mb-0 mt-1 me-5">{{
                                            Number(product.priceNew).toLocaleString("vi-VN")
                                            }}đ</span>
                                        <del class="text-secondary mb-0 mt-1">{{
                                            Number(product.priceOld).toLocaleString("vi-VN")
                                            }}đ</del>
                                    </div>
                                    <img :src="product.imageUrl" alt="" class="" />
                                </router-link>
                            </div>
                            <a href="tim?scat_id=0&amp;q=pc" class="more-all" id="click_search"><span
                                    class="hover-txt">Xem
                                    tất cả <span id="total-pro">1130</span> sản phẩm</span></a>
                        </div>

                        <!-- Header Right -->
                        <div class="header-mid-right d-flex align-items-center">
                            <!-- Tài khoản -->
                            <v-menu v-if="isLoggedIn" open-on-hover transition="scale-transition">
                                <template v-slot:activator="{ props }">
                                    <a class="item account d-flex align-items-center" aria-expanded="true"
                                        v-bind="props">
                                        <img :src="user.avatar ||
                                            'https://cdn-icons-png.flaticon.com/512/219/219983.png'
                                            " alt="avatar" class="avatar" />
                                        <span class="hover-txt">{{ user.username }}</span>
                                    </a>
                                </template>

                                <v-list class="custom-menu">
                                    <router-link class="text-black" to="/me/user-profile">
                                        <v-list-item>
                                            <div class="d-flex align-center">
                                                <v-icon class="mr-2">mdi mdi-account-circle</v-icon>
                                                <v-list-item-title class="fs-6 fw-semibold">Thông tin tài
                                                    khoản</v-list-item-title>
                                            </div>
                                        </v-list-item>
                                    </router-link>


                                    <router-link class="text-black" to="/me/list-order">
                                        <v-list-item>
                                            <div class="d-flex align-center">
                                                <v-icon class="mr-2">mdi mdi-cart</v-icon>
                                                <v-list-item-title class="fs-6 fw-semibold">Đơn hàng</v-list-item-title>
                                            </div>
                                        </v-list-item>
                                    </router-link>

                                    <router-link class="text-black" to="/me/favorite">
                                        <v-list-item>
                                            <div class="d-flex align-center">
                                                <v-icon class="mr-2">mdi mdi-heart-outline</v-icon>
                                                <v-list-item-title class="fs-6 fw-semibold">Yêu
                                                    thích</v-list-item-title>
                                            </div>
                                        </v-list-item>
                                    </router-link>


                                    <v-list-item @click="logout" class="logout-item">
                                        <div class="d-flex align-center">
                                            <v-icon class="mr-2">mdi mdi-logout</v-icon>
                                            <v-list-item-title class="fs-6 fw-semibold">Đăng Xuất</v-list-item-title>
                                        </div>
                                    </v-list-item>

                                </v-list>
                            </v-menu>

                            <!-- Hiển thị đăng nhập nếu chưa đăng nhập -->
                            <a v-else class="item account d-flex align-items-center" href="#"
                                @click.prevent="openLoginDialog">
                                <i class="mdi mdi-account"></i>
                                <span class="hover-txt">Tài khoản</span>
                            </a>

                            <!-- Giỏ hàng -->
                            <div class="item box-cart d-flex align-items-center cursor-pointer">
                                <i class="mdi mdi-cart-plus"></i>
                                <span class="counter-cart">{{ countItems }}</span>

                                <div v-if="cart.length > 0" class="header-cart-hover loaded">
                                    <div class="cart-items-holder">
                                        <div class="cart-item d-flex align-items-center" v-for="item in cart"
                                            :key="item.cartId">
                                            <router-link :to="`/products/${item.productId}`"
                                                class="cart-img w-25 h-25 me-3 d-block">
                                                <img :src="item.imageUrl" alt="{{ item.name }}" class="w-100" />
                                            </router-link>
                                            <div class="cart-mid">
                                                <router-link :to="`/products/${item.productId}`"
                                                    class="name fw-semibold mb-1 line-clamp-2">{{
                                                        item.name }}</router-link>
                                                <div class="d-flex align-items-center">
                                                    <b class="price me-3">{{
                                                        Number(item.priceNew).toLocaleString("vi-VN")
                                                        }}đ</b>
                                                    <del class="old-price">{{
                                                        Number(item.priceNew).toLocaleString("vi-VN")
                                                        }}đ</del>
                                                </div>
                                            </div>
                                            <div class="cart-right">
                                                <div class="unit-detail-amount-control d-flex">
                                                    <input type="text" size="7" :value="item.quantity" readonly />

                                                    <div class="d-flex flex-column">
                                                        <a @click="increaseQuantity(item.cartId)"> <i
                                                                class="mdi mdi-plus text-dark"></i></a>
                                                        <a @click="decreaseQuantity(item.cartId)"> <i
                                                                class="mdi mdi-minus text-dark"></i></a>
                                                    </div>
                                                </div>
                                                <a href="#"
                                                    class="remove text-center d-block text-secondary fs-6 fw-semibold mt-1"
                                                    @click="removeFromCart(item.cartId)">Xoá</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="cart-price-hover">
                                        <div class="d-flex align-items-center justify-space-between fs-6">
                                            <p class="mb-0 fw-semibold">Tổng chi phí</p>
                                            <b class="red text-18 font-600 js-total-cart-price">{{
                                                Number(totalCartPrice).toLocaleString("vi-VN") }}đ</b>
                                        </div>
                                        <div class="bnt-cart d-flex mt-3">
                                            <router-link to="/me/cart" class="btn-goCart">Xem giỏ hàng</router-link>
                                            <a href="/me/cart/cart-confirm-buy" class="btn-goCart cart-2">Mua hàng</a>
                                        </div>
                                    </div>
                                </div>

                                <div v-else class="header-cart-hover empty">
                                    <div class="empty-cart">
                                        <img src="https://bizweb.dktcdn.net/100/427/804/themes/832400/assets/empty-cart.png?1722190080232"
                                            alt="empty-cart" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Header Bottom -->
                <div class="header-bottom">
                    <div class="container">
                        <div class="header-bottom-content d-flex">
                            <!-- header-menu -->
                            <div class="header-menu">
                                <div class="title-header d-flex justify-content-center align-items-center">
                                    <i class="mdi mdi-menu"></i>
                                    <span class="hover-txt">Danh mục sản phẩm</span>
                                    <i class="mdi mdi-chevron-down"></i>
                                </div>
                                <div class="menu_holder">
                                    <div class="item">
                                        <!-- Mục chính -->
                                        <router-link to="" class="item-cate d-flex align-items-center">
                                            <p class="cat-title">Xây dựng cấu hình PC</p>
                                            <span class="box-right">
                                                <i class="mdi mdi-chevron-right"></i>
                                            </span>
                                        </router-link>

                                        <!-- Menu Hover -->
                                        <div class="menu-hover">
                                            <div class="d-flex flex-wrap">
                                                <!-- Danh sách mục con -->
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Gaming Workstation
                                                        PC</router-link>
                                                </div>
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Pro
                                                        Creator</router-link>
                                                </div>
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Pro
                                                        Ductivity</router-link>
                                                </div>
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Pro VR</router-link>
                                                </div>
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Pro Audio</router-link>
                                                </div>
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">PC Cao
                                                        Cấp</router-link>
                                                </div>
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Mini PC</router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <router-link :to="`/category/1`" class="item-cate d-flex align-items-center">
                                            <p class="cat-title">PC Gaming</p>
                                            <span class="box-right">
                                                <i class="mdi mdi-chevron-right"></i>
                                            </span>
                                        </router-link>
                                    </div>
                                    <div class="item">
                                        <router-link to="/category/8" class="item-cate d-flex align-items-center">
                                            <p class="cat-title">PC Đồ Họa</p>
                                            <span class="box-right">
                                                <i class="mdi mdi-chevron-right"></i>
                                            </span>
                                        </router-link>
                                    </div>
                                    <div class="item">
                                        <router-link to="!" class="item-cate d-flex align-items-center">
                                            <p class="cat-title">PC AI</p>
                                            <span class="box-right">
                                                <i class="mdi mdi-chevron-right"></i>
                                            </span>
                                        </router-link>
                                    </div>
                                    <div class="item">
                                        <router-link to="/category/8" class="item-cate d-flex align-items-center">
                                            <p class="cat-title">PC Văn Phòng</p>
                                            <span class="box-right">
                                                <i class="mdi mdi-chevron-right"></i>
                                            </span>
                                        </router-link>

                                        <div class="menu-hover">
                                            <div class="d-flex flex-wrap">
                                                <div class="item-holder me-5"
                                                    v-for="product in filteredPcOfficeProducts"
                                                    :key="product.productId">
                                                    <router-link :to="`/products/${product.productId}`"
                                                        class="title-holder">{{
                                                            product.name }}
                                                    </router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <router-link to="/category/2" class="item-cate d-flex align-items-center">
                                            <p class="cat-title">Màn Hình Máy Tính</p>
                                            <span class="box-right">
                                                <i class="mdi mdi-chevron-right"></i>
                                            </span>
                                        </router-link>

                                        <div class="menu-hover">
                                            <div class="d-flex flex-wrap">
                                                <div class="item-holder ms-3" v-for="product in filteredMonitorProducts"
                                                    :key="product.productId">
                                                    <router-link :to="`/products/${product.productId}`"
                                                        class="title-holder">{{
                                                            product.name }}</router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <router-link to="/category/4" class="item-cate d-flex align-items-center">
                                            <p class="cat-title">Máy chơi game - Console</p>
                                            <span class="box-right">
                                                <i class="mdi mdi-chevron-right"></i>
                                            </span>
                                        </router-link>

                                        <div class="menu-hover">
                                            <div class="d-flex flex-wrap">
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Máy PS5 - PlayStation
                                                        5</router-link>
                                                </div>

                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Pc
                                                        Handheld</router-link>
                                                </div>

                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Đĩa Game
                                                        PS5</router-link>
                                                </div>

                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Phụ Kiện
                                                        Playstation</router-link>
                                                </div>

                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Máy chơi game
                                                        Nintendo</router-link>
                                                </div>

                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Đĩa Game Nintendo
                                                        Switch</router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <router-link to="!" class="item-cate d-flex align-items-center">
                                            <p class="cat-title">Tay Cầm Chơi Game</p>
                                            <span class="box-right">
                                                <i class="mdi mdi-chevron-right"></i>
                                            </span>
                                        </router-link>

                                        <div class="menu-hover">
                                            <div class="d-flex flex-wrap">
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Tay Cầm
                                                        PS5</router-link>
                                                </div>
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Tay Cầm
                                                        Xbox</router-link>
                                                </div>
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Tay Cầm
                                                        Razer</router-link>
                                                </div>
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">Tay Cầm
                                                        Asus</router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <router-link to="!" class="item-cate d-flex align-items-center">
                                            <p class="cat-title">VGA - Card Màn Hình</p>
                                            <span class="box-right">
                                                <i class="mdi mdi-chevron-right"></i>
                                            </span>
                                        </router-link>

                                        <div class="menu-hover">
                                            <div class="d-flex flex-wrap">
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">VGA Nvidia RTX 3060 /
                                                        RTX
                                                        3060Ti</router-link>
                                                </div>
                                                <div class="item-holder">
                                                    <router-link to="!" class="title-holder">VGA Nvidia RTX 4060 /
                                                        4060Ti</router-link>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- header-bottom-right -->
                            <div class="header-bottom-right d-flex align-items-center">
                                <router-link to="/Xaydungcauhinhpc" class="item">
                                    <span class="txt" alt="Build PC Gaming"> Xây dựng cấu hình PC </span>
                                </router-link>
                                <router-link to="/category/1" class="item">
                                    <span class="txt" alt="PC Gaming"> PC gaming </span>
                                </router-link>
                                <router-link to="/category/2" class="item">
                                    <span class="txt" alt="Màn hình Gaming"> Màn hình gaming </span>
                                </router-link>
                                <router-link to="/category/7" class="item">
                                    <span class="txt" alt="Laptop NHập khẩu"> Laptop Nhập Khẩu </span>
                                </router-link>
                                <router-link to="/category/3" class="item">
                                    <span class="txt">Gaming Gear</span>
                                </router-link>
                                <router-link to="/category/4" class="item">
                                    <span class="txt">PC Handheld</span>
                                </router-link>
                                <router-link to="/category/4" class="item">
                                    <span class="txt">Khuyến mãi</span>
                                </router-link>
                                <router-link to="/category/8" class="item">
                                    <span class="txt">PC Văn Phòng</span>
                                </router-link>
                                <router-link to="/mayin" class="item">
                                    <span class="txt">Máy in</span>
                                </router-link>
                                <router-link to="/contact" class="item">
                                    <span class="txt">Liên hệ</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dùng component LoadingOverlay -->
                <LoadingOverlay :isLoading="isLoading" />

                <!-- Dialogs -->
                <v-dialog v-model="isLoginDialog">
                    <v-card>
                        <LoginApp @switchToRegister="switchToRegister" @switchToForgot="switchToForgot"
                            @closeForm="closeDialog" />
                    </v-card>
                </v-dialog>

                <v-dialog v-model="isRegisterDialog">
                    <v-card>
                        <RegisterApp @switchToForgot="switchToForgot" @switchToLogin="switchToLogin"
                            @closeForm="closeDialog" />
                    </v-card>
                </v-dialog>

                <v-dialog v-model="isForgotPassDialog">
                    <v-card>
                        <ForgotPass @switchToLogin="switchToLogin" @closeForm="closeDialog" />
                    </v-card>
                </v-dialog>
            </div>
        </div>
    </div>

</template>

<script>


import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import LoginApp from "@/components/Form/LoginApp.vue";
import RegisterApp from "@/components/Form/RegisterApp.vue";
import ForgotPass from "@/components/Form/ForgotPass.vue";
import LoadingOverlay from "@/components/content/common/LoadingOverlay.vue";
import { useToast } from "vue-toastification";
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";
import { useRouter } from "vue-router";


export default {
    components: {
        LoginApp,
        RegisterApp,
        ForgotPass,
        LoadingOverlay,
    },
    setup() {
        const userStore = useUserStore();
        const cartStore = useCartStore();
        const productStore = useProductStore();
        const { user, isLoggedIn } = storeToRefs(userStore);
        const { cart, countItems, totalCartPrice } = storeToRefs(cartStore);
        const { products } = storeToRefs(productStore);
        const toast = useToast();
        const router = useRouter();

        // State
        const isLoginDialog = ref(false);
        const isRegisterDialog = ref(false);
        const isForgotPassDialog = ref(false);
        const isSticky = ref(false);
        const isMenuOpen = ref(false);
        const isLoading = ref(false);
        const searchQuery = ref(""); // Lưu từ khóa tìm kiếm



        // Sticky Header
        const handleScroll = () => {
            isSticky.value = window.scrollY > 500;
        };

        onMounted(() => {
            window.addEventListener("scroll", handleScroll);
            userStore.fetchUser(); // 🌟 Gọi fetchUser khi load trang
        });

        // 🔥 Theo dõi user, nếu user thay đổi -> cập nhật giỏ hàng
        watch(
            () => userStore.user,
            (newUser) => {
                if (newUser) {
                    cartStore.fetchCart();
                } else {
                    cartStore.cart = []; // Xóa giỏ hàng khi user logout
                }
            }
        );

        onUnmounted(() => {
            window.removeEventListener("scroll", handleScroll);
        });

        // Functions
        const openLoginDialog = () => {
            isLoginDialog.value = true;
        };

        const switchToLogin = () => {
            isLoginDialog.value = true;
            isRegisterDialog.value = false;
            isForgotPassDialog.value = false;
        };

        const switchToRegister = () => {
            isLoginDialog.value = false;
            isRegisterDialog.value = true;
            isForgotPassDialog.value = false; // Đảm bảo đóng form quên mật khẩu
        };

        const switchToForgot = () => {
            isLoginDialog.value = false;
            isRegisterDialog.value = false;
            isForgotPassDialog.value = true;
        };

        // Đóng dialog
        const closeDialog = () => {
            isLoginDialog.value = false;
            isRegisterDialog.value = false;
            isForgotPassDialog.value = false;
        };

        // Đăng xuất
        const logout = async () => {
            try {
                const result = await userStore.logout(); // Thực hiện logout (có thể gọi API nếu cần)
                isMenuOpen.value = false; // Đóng menu
                if (result) {
                    toast.success("Đăng xuất thành công!");
                    router.push("/"); // Chuyển hướng về trang chủ sau khi đăng xuất
                } else {
                    console.error("Đăng xuất thất bại!");
                }
            } catch (error) {
                console.error("Lỗi khi đăng xuất:", error);
                toast.error("Đăng xuất thất bại, vui lòng thử lại!");

            }
        };


        // Mở / đóng menu
        const toggleMenu = () => {
            isMenuOpen.value = !isMenuOpen.value;
        };

        // Xóa sản phẩm khỏi giỏ hàng
        const removeFromCart = (cartId) => {
            cartStore.removeFromCart(cartId);
        };

        // Tăng giảm số lượng sản phẩm
        const decreaseQuantity = (cartId) => {
            cartStore.decreaseQuantity(cartId);
        };

        // Tăng giảm số lượng sản phẩm
        const increaseQuantity = (cartId) => {
            cartStore.increaseQuantity(cartId);
        };

        // Tìm kiếm sản phẩm
        const filteredPcOfficeProducts = computed(() => {
            return products.value.filter((product) => product.categoryId === 8);
        });

        const filteredMonitorProducts = computed(() => {
            return products.value.filter((product) => product.categoryId === 2);
        });

        const filteredProducts = computed(() => {
            if (!searchQuery.value) return [];
            return products.value.filter((product) => product.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
        });

        // Hàm xóa searchQuery khi chọn sản phẩm
        const clearSearch = () => {
            searchQuery.value = "";
        };

        return {
            user,
            cart,
            products,
            countItems,
            isLoggedIn,
            isLoginDialog,
            isRegisterDialog,
            isForgotPassDialog,
            isSticky,
            isMenuOpen,
            isLoading,
            totalCartPrice,
            searchQuery,
            filteredProducts,
            openLoginDialog,
            switchToLogin,
            switchToRegister,
            closeDialog,
            switchToForgot,
            logout,
            toggleMenu,
            removeFromCart,
            decreaseQuantity,
            increaseQuantity,
            clearSearch,
            filteredPcOfficeProducts,
            filteredMonitorProducts,
        };
    },
};
</script>

<style scoped>
.autocomplete-suggestions {
    border: 1px solid #ccc;
    background: #FFF;
    width: calc(100% - 260px - 220px);
    z-index: 999;
    position: absolute;
    top: 65px;
    left: 208px;
}

.autocomplete-suggestions .more-all {
    height: 40px;
    display: block;
    text-align: center;
    line-height: 40px;
}

.content-suggestions {
    padding: 0 12px;
    max-height: 405px;
    overflow: auto;
}

.content-suggestions .item {
    padding: 10px 15px;
    border-bottom: 1px solid #EDEDED;
}

.content-suggestions .item img {
    width: 65px;
    display: block;
}

.content-suggestions .item .price {
    font-weight: 600;
    color: #FB4E4E;
    line-height: 20px;
}


.cart-price-hover {
    border-top: 1px solid var(--Grey, #ccc);
}

.cart-price-hover b.red {
    color: red;
}

.cart-price-hover p {
    font-weight: 600;
}

.cart-price-hover .btn-goCart {
    width: 50%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-right: 16px;
    font-size: 16px;
    color: #5c5c5c;
}

.cart-price-hover .btn-goCart:hover {
    background: var(--Blue, #3278f6);
    color: #fff;
    font-weight: bold;
}

.cart-price-hover .btn-goCart.cart-2 {
    margin-right: 0;
    background: var(--Blue, #3278f6);
    color: #fff;
}

.cart-price-hover .btn-goCart.cart-2:hover {
    background: white;
    color: var(--Blue, #3278f6);
    font-weight: bold;
    border: 1px solid var(--Blue, #3278f6);
}

.header-cart-hover {
    overflow: hidden;
    padding: 15px;
    transition: 0.2s all;
    position: absolute;
    top: calc(100% + 30px);
    right: 0;
    z-index: 9;
    background: #fff;
    opacity: 0;
    visibility: hidden;
    width: 520px;
    text-align: left;
    box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.16);
    border: 1px solid #ccc;
}



.header .header-mid-right .box-cart:hover .header-cart-hover {
    transition: 0.2s all;
    top: 103%;
    opacity: 1;
    visibility: visible;
}

.header .cart-items-holder {
    overflow: auto;
    max-height: 400px;
    padding-right: 20px;
}

.cart-price-hover {
    border-top: 1px solid var(--Grey, #ccc);
    padding-top: 24px;
}

.header-cart-hover .cart-item .cart-mid {
    width: calc(100% - 100px - 70px - 32px);
    margin-right: 16px;
}

.header-cart-hover .cart-item .cart-mid .price {
    color: #fb4e4e;
}

.header-cart-hover .cart-item .cart-mid .old-price {
    color: #8d94ac;
}

.unit-detail-amount-control input {
    width: 40px;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
}

.header-cart-hover .cart-item .unit-detail-amount-control a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 30px;
    text-align: center;
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}

/* 🎨 Style cho menu */
.custom-menu {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    min-width: 180px;
    padding: 5px 0;
    text-align: center;
}

/* Hover effect */
.v-list-item:hover {
    background: #4b9fff;
    color: #fff;
}

/* Style nút đăng xuất */
.logout-item {
    color: red;
    font-weight: bold;
}

.logout-item:hover {
    background: #ff0000;
}

/* 🎨 Style cho avatar */
.avatar {
    width: 37px;
    height: 37px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 5px;
}

.header {
    width: 100%;
    transition: top 0.3s ease-in-out;
    top: -50px;
}

.header.sticky {
    position: fixed;
    top: 0;
    z-index: 1000;
}

/* header-top */
.header .header-top {
    background: #3278f6;
    padding: 7px 0;
}

.header .header-top .item span {
    font-weight: 600;
    color: #fff;
    font-size: 15px;
}

.header .header-top .item {
    border-right: 2px solid #0e5a9d;
    padding: 0 15px;
}

.header .header-top .item i {
    margin-right: 5px;
    color: #fff;
}

.hover-txt {
    position: relative;
}

.hover-txt::before {
    position: absolute;
    content: "";
    width: 0;
    height: 1px;
    bottom: -1px;
    left: 0;
    transition: 0.5s;
    background: #fff;
}

.hover-txt:hover::before {
    width: 100%;
    transition: 0.5s;
}

.header .header-top .item:last-child {
    border-right: none;
    padding-right: 0;
}

/* header-mid */
.header .header-mid {
    background: #29324e;
    transition: 0.3s all;
}

.header .content-header-mid {
    width: 100%;
    position: relative;
    padding: 8px 0;
}

.form__input {
    width: calc(100% - 260px - 200px);
    position: relative;
    background: #fff;
}

.form__input .searh-form-container {
    float: left;
    width: 100%;
    height: 45px;
    padding: 5px 0;
    display: flex;
    align-items: center;
}

.form__input .title-select {
    position: relative;
    font-size: 16px;
    font-weight: bold;
    background-color: white;
    border: none;
}

.form__input .title-select::before {
    content: "";
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 25px;
    background: #aba8a8;
}

.form__input .text_search {
    border: 0;
    padding: 0 5px 0 30px;
    width: calc(100% - 150px);
    height: 100%;
    outline: none;
    font-size: 16px;
}

.form__input .submit-search {
    width: 150px;
    height: 45px;
    background: #3278f6;
    border: none;
    color: #fff;
    font-size: 15px;
    position: relative;
    z-index: 999;
    overflow: hidden;
    gap: 10px;
}

.form__input .submit-search::before {
    position: absolute;
    content: "";
    background: #193c7b;
    width: 0;
    left: 0;
    height: 45px;
    -webkit-clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);
    clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);
    z-index: -1;
    transition: 0.4s;
}

.form__input .submit-search:hover::before {
    width: 150%;
    top: 0;
}

.header .header-mid-right {
    margin-left: 10px;
    max-width: 320px;
    position: relative;
}

.header .header-mid-right .item {
    text-align: center;
    padding: 0 20px;
    border-right: 2px solid #ccc;
}

.header .header-mid-right .item:last-child {
    border-right: none;
}

.header .header-mid-right .item span {
    font-weight: 700;
    margin-left: 5px;
    color: #fff;
}

.header .header-mid-right .item i {
    font-size: 20px;
    color: #fff;
}

.header .header-mid-right .box-cart {
    background: #3e4b75;
    margin-left: 18px;
    padding: 3px 10px;
    display: flex;
    align-items: center;
}

.header .header-mid-right .counter-cart {
    width: 24px;
    height: 24px;
    background: #fb4e4e;
    color: #fff;
    font-size: 14px;
    line-height: 24px;
    margin-left: 7px !important;
    display: block;
    border-radius: 5px;
}

.header .header-mid-right .box-cart:hover {
    background: #000;
}

/* header-bottom */
.header .header-bottom {
    background: #29324e;
    padding: 0px 10px 5px;
}

.header .header-menu .title-header {
    color: #fff;
    width: 203px;
    height: 40px;
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
}

.header .header-menu {
    position: relative;
}

.header .header-menu .title i {
    margin: 0 7px;
    font-size: 14px;
}

.header .header-menu .menu_holder {
    position: absolute;
    top: 100%;
    left: 0;
    width: 300px;
    z-index: 99;
    visibility: hidden;
    background: #3e4b75;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
}

.header .header-menu:hover .menu_holder {
    visibility: visible;
}

.header .header-menu .menu_holder .item {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #8d94ac;
}

.header .header-menu .menu_holder .item-cate {
    padding: 16px 0;
    font-size: 14px;
    width: 100%;
    color: #fff;
}

.header .header-menu .menu_holder .item-cate .cat-title {
    width: calc(100% - 45px);
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    margin: 15px 10px;
}

.header .header-menu .menu_holder .item-cate .box-right {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-top: 2px;
}

.header .header-menu .menu_holder .item:hover .box-right {
    background: #3278f6;
    -webkit-clip-path: polygon(30% 0%, 100% 0, 100% 100%, 0% 100%);
    clip-path: polygon(30% 0%, 100% 0, 100% 100%, 0% 100%);
}

.header .header-menu .menu_holder .item:hover .cat-title {
    font-weight: 600;
}

.header .header-menu .menu_holder .item .menu-hover {
    background: #fff;
    border: solid 1px #dedede;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 300px;
    width: 900px;
    height: 100%;
    overflow: auto;
    color: #000 !important;
    padding: 24px;
    visibility: hidden;
    opacity: 0;
    transform: translate(20px, 0);
    transition: opacity 0.7s, transform 0.7s;
}

.header .header-menu .menu_holder .item:hover .menu-hover {
    visibility: visible;
    opacity: 1;
    transform: translate(0, 0);
}

.header .header-menu .menu_holder .item .menu-hover .item-holder {
    width: 33.3333333333%;
    margin-bottom: 24px;
}

.header .header-menu .menu_holder .item .menu-hover .title-holder {
    color: #29324e;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 16px;
    display: block;
    line-height: 28px;
}

.header .header-menu .menu_holder .item .menu-hover .holder-last a {
    color: #29324e;
}

/* header-bottom-right */
.header .header-bottom-right {
    width: calc(100% - 200px);
    height: 40px;
}

.header .header-bottom-right .item {
    position: relative;
    padding: 0 10px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    text-transform: capitalize;
    border-left: 2px solid #545b71;
}

.header .header-bottom-right .item .txt::before {
    position: absolute;
    content: "";
    width: 0;
    height: 1px;
    bottom: -3px;
    left: 8px;
    transition: 0.5s;
    background: #fff;
}

.header .header-bottom-right .item .txt:hover::before {
    width: 90%;
    transition: 0.5s;
}
</style>

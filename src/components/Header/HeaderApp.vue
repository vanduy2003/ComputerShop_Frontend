<template>
    <div class="header" :class="{ sticky: isStickyd }">
        <!-- Herder top -->
        <div class="header-top">
            <div class="container">
                <div class="d-flex align-items justify-content-end">
                    <router-link :to="dsvs" class="item d-flex align-items">
                        <i class="mdi mdi-store"></i>
                        <span class="hover-txt">Tất cả sản phẩm</span>
                    </router-link>
                    <router-link :to="dfdsf" class="item d-flex align-items">
                        <i class="mdi mdi-phone-in-talk-outline"></i>
                        <span class="hover-txt">(086) 830.2123</span>
                    </router-link>
                    <router-link href="mailto:cskh @tncstore.vn" class="item d-flex align-items">
                        <i class="mdi mdi-email"></i>
                        <span class="hover-txt">cskh@tncstore.vn</span>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- Herder mid -->
        <div class="header-mid">
            <div class="container">
                <div class="content-header-mid d-flex align-items-center">
                    <!-- Logo -->
                    <router-link to="/" class="logo me-5">
                        <img src="https://i.imgur.com/AGkTeSa.png" alt="logo" width="160px" height="58px" />
                    </router-link>
                    <!-- Search Form -->
                    <div class="form__input">
                        <div class="searh-form-container">
                            <div class="btn-group z-10">
                                <router-link to="#" type="button" class="btn title-select dropdown-toggle py-2"
                                    data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                    Tất cả danh mục
                                </router-link>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                                    <li><router-link class="dropdown-item" href="#">Xây dựng cấu hình PC</router-link>
                                    </li>
                                    <li><router-link class="dropdown-item" href="#">PC Gaming</router-link></li>
                                    <li><router-link class="dropdown-item" href="#">PC Đồ Họa</router-link></li>
                                    <li><router-link class="dropdown-item" href="#">PC AI</router-link></li>
                                    <li><router-link class="dropdown-item" href="#">PC Văn Phòng</router-link></li>
                                    <li><router-link class="dropdown-item" href="#">Màn Hình Máy Tính</router-link></li>
                                </ul>
                            </div>
                            <input type="text" id="js-global-seach" class="text_search" name="q"
                                placeholder="Nhập sản phẩm cần tìm..." autocomplete="off" v-model="searchQuery" />
                            <button type="submit"
                                class="submit-search d-flex justify-content-center align-items-center g-2"
                                @click.prevent="handleSearch">
                                <span>Tìm kiếm</span>
                                <i class="mdi mdi-magnify fs-5"></i>
                            </button>
                        </div>
                    </div>
                    <!-- Header Right -->
                    <div class="header-mid-right d-flex align-items-center">
                        <a class="item account d-flex align-items-center" href="#" @click.prevent="handleAccountClick">

                            <div v-if="user.userId">
                                <img :src="user.avatar" alt="avatar" width="35px" height="35px"
                                    class="avatar rounded-circle object-fit-cover" />
                                <span class="hover-txt">{{ user.username }}</span>
                            </div>
                            <div v-else @click="openLoginDialog">
                                <i class="mdi mdi-account"></i>
                                <span class="hover-txt">Tài khoản</span>
                            </div>

                        </a>
                        <!-- <router-link v-if="user.userId" href="#" @click.prevent="logout" class="item logout">
                            <i class="mdi mdi-logout"></i>
                            <span class="hover-txt">Đăng xuất</span>
                        </router-link > -->
                        <router-link to="#" class="item box-cart d-flex align-items-center" id="js-header-cart">
                            <i class="mdi mdi-cart-plus"></i>
                            <span class="counter-cart js-cart-counter">0</span>
                        </router-link>
                    </div>

                </div>
            </div>
        </div>

        <!-- Herder bottom -->
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
                        <div class="height-hover"></div>
                        <div class="menu_holder">
                            <div class="item">
                                <!-- Mục chính -->
                                <router-link :to="dsvs" class="item-cate d-flex align-items-center">
                                    <p class="cat-title">Xây dựng cấu hình PC</p>
                                    <span class="box-right">
                                        <i class="mdi mdi-chevron-right"></i>
                                    </span>
                                </router-link>

                                <!-- Menu Hover -->
                                <div class="menu-hover">
                                    <div class="list-holder d-flex flex-wrap">
                                        <!-- Danh sách mục con -->
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Gaming
                                                Workstation PC</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Pro Creator</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Pro Ductivity</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Pro VR</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Pro Audio</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">PC Cao Cấp</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Mini PC</router-link>
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
                                <router-link :to="dsvs" class="item-cate d-flex align-items-center">
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
                                    <div class="list-holder d-flex flex-wrap">
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Máy Tính Văn
                                                Phòng TNC</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Máy Tính Để Bàn
                                                DELL</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Máy Tính Để Bàn
                                                HP</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Máy Tính Để Bàn
                                                ASUS</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Máy Tính Intel
                                                NUC</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">PC Dành Cho Học Sinh -
                                                Sinh Viên</router-link>
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
                                    <div class="list-holder d-flex flex-wrap">
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn Hình
                                                Gaming</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn Hình Gaming
                                                Giá Rẻ</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn Hình HP</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn Hình DELL</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn Hình
                                                Viewsonic</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn Hình Đồ Họa</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn Hình ACER</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn Hình ASUS</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn Hình LG</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn Hình MSI</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn Hình Văn
                                                Phòng</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn Hình HKC</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn hình Philips</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn hình Aoc</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Màn Hình Gigabyte</router-link>
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
                                    <div class="list-holder d-flex flex-wrap">
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Máy PS5 -
                                                PlayStation 5</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Pc Handheld</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Đĩa Game PS5</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Phụ Kiện
                                                Playstation</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Máy chơi game
                                                Nintendo</router-link>
                                        </div>

                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Đĩa Game Nintendo
                                                Switch</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <router-link :to="dsvs" class="item-cate d-flex align-items-center">
                                    <p class="cat-title">Tay Cầm Chơi Game</p>
                                    <span class="box-right">
                                        <i class="mdi mdi-chevron-right"></i>
                                    </span>
                                </router-link>

                                <div class="menu-hover">
                                    <div class="list-holder d-flex flex-wrap">
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Tay Cầm
                                                PS5</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Tay Cầm Xbox</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Tay Cầm Razer</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">Tay Cầm Asus</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <router-link :to="dsvs" class="item-cate d-flex align-items-center">
                                    <p class="cat-title">VGA - Card Màn Hình</p>
                                    <span class="box-right">
                                        <i class="mdi mdi-chevron-right"></i>
                                    </span>
                                </router-link>

                                <div class="menu-hover">
                                    <div class="list-holder d-flex flex-wrap">
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA Nvidia
                                                RTX 3060 / RTX 3060Ti</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA Nvidia RTX
                                                4060 / 4060Ti</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA Nvidia RTX 4070 /
                                                4070 Super / 4070Ti</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA Nvidia RTX 4080 / 4080
                                                Super</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA Nvidia RTX
                                                4090</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA Nvidia RTX
                                                3050</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA ASUS</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA MSI</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA Gigabyte</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA Colorful</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA Inno3D</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA Galax</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA Leadtek</router-link>
                                        </div>
                                        <div class="item-holder">
                                            <router-link :to="dsvs" class="title-holder">VGA Palit</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- header-bottom-right -->
                    <div class="header-bottom-right d-flex align-items-center">
                        <router-link :to="dsvs" class="item">
                            <span class="txt" alt="Build PC Gaming">
                                Xây dựng cấu hình PC
                            </span>
                        </router-link>
                        <router-link to="/category/1" class="item">
                            <span class="txt" alt="PC Gaming">
                                PC gaming
                            </span>
                        </router-link>
                        <router-link to="/category/2" class="item">
                            <span class="txt" alt="Màn hình Gaming">
                                Màn hình gaming
                            </span>
                        </router-link>
                        <router-link to="/category/7" class="item">
                            <span class="txt" alt="Laptop NHập khẩu">
                                Laptop Nhập Khẩu
                            </span>
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
                        <router-link :to="dsvs" class="item">
                            <span class="txt">RTX 4060</span>
                        </router-link>
                        <router-link :to="dsvs" class="item">
                            <span class="txt">Máy in</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dialog Đăng nhập -->
        <v-dialog v-model="isLoginDialog">
            <v-card>
                <LoginApp @switchToForgot="switchToForgot" @closeForm="closeDialog" @switchToRegister="switchToRegister"
                    @loginSuccess="loginSuccess" />
            </v-card>
        </v-dialog>
        <!-- Dialog Đăng ký -->
        <v-dialog v-model="isRegisterDialog">
            <v-card>
                <RegisterApp @switchToLogin="switchToLogin" @switchToForgot="switchToForgot" @closeForm="closeDialog" />
            </v-card>
        </v-dialog>

        <!-- Dialog Quên mật khẩu -->
        <v-dialog v-model="isForgotPassDialog">
            <v-card>
                <ForgotPass @switchToLogin="switchToLogin" @closeForm="closeDialog" />
            </v-card>
        </v-dialog>

    </div>

</template>

<script>
import LoginApp from '@/components/Form/LoginApp.vue';
import RegisterApp from '../Form/RegisterApp.vue';
import ForgotPass from '../Form/ForgotPass.vue';
// import axios from 'axios';

export default {
    components: {
        LoginApp,
        RegisterApp,
        ForgotPass,
    },
    data() {
        return {
            isLoginDialog: false,
            isRegisterDialog: false,
            isForgotPassDialog: false,
            isSticky: false,
            user: {},
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);

    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.isSticky = window.scrollY > 500;
        },
        openLoginDialog() {
            this.isLoginDialog = true;
        },
        switchToLogin() {
            this.isLoginDialog = true;
            this.isRegisterDialog = false;
            this.isForgotPassDialog = false;
        },
        switchToRegister() {
            this.isLoginDialog = false;
            this.isRegisterDialog = true;
            this.isForgotPassDialog = false;
        },
        switchToForgot() {
            this.isLoginDialog = false;
            this.isRegisterDialog = false;
            this.isForgotPassDialog = true;
        },
        closeDialog() {
            this.isLoginDialog = false;
            this.isRegisterDialog = false;
            this.isForgotPassDialog = false;
        },

        loginSuccess(user) {
            this.user = user;
            this.isLoginDialog = false;
        },


    }
};
</script>


<style scoped>
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
    transition: .5s;
    background: #fff;
}

.hover-txt:hover::before {
    width: 100%;
    transition: .5s;
}

.header .header-top .item:last-child {
    border-right: none;
    padding-right: 0;
}

/* header-mid */
.header .header-mid {
    background: #29324e;
    transition: .3s all;
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
    width: calc(100% - 200px);
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
    transition: .4s;
}

.form__input .submit-search:hover::before {
    width: 150%;
}

.header .header-mid-right {
    margin-left: 30px;
    width: 230px;
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
    background: #3E4B75;
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
    transition: opacity 0.7s, transform .7s;
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
    font-size: 18px;
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
    transition: .5s;
    background: #fff;
}

.header .header-bottom-right .item .txt:hover::before {
    width: 90%;
    transition: .5s;
}
</style>

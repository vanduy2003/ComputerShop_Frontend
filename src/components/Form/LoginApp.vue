<template>
    <div class="form scrollable">
        <!-- Login Form -->
        <div class="login-form">
            <div class="form-content">
                <header class="header-login">
                    <a href="https://fullstack.edu.vn" target="_top">
                        <img width="100px" src="./TNC.png" alt="logo" class="_logo_m3d3f_5" />
                    </a>
                    <h1 class="fw-bold fs-3 lh-sm my-3">Đăng nhập vào TNC</h1>
                    <p class="text-danger" style="width: 400px; margin: 0 auto">
                        Mỗi người nên sử dụng riêng một tài khoản, tài khoản
                        nhiều người sử dụng chung sẽ bị khóa.
                    </p>
                    <!-- <button class="_back_m3d3f_50"><i class="mdi mdi-chevron-left fs-5"></i>Quay lại</button> -->
                    <button class="btn-back" @click="closeForm">
                        <span>×</span>
                    </button>
                </header>
                <main class="_main_1unxg_8">
                    <div class="_content_1unxg_12">
                        <form @submit.prevent="handleLogin">
                            <div class="_wrapper_juilt_1">
                                <div class="_wrapper_1fn2z_1">
                                    <label class="fw-semibold mb-2 ms-2">Tên đăng nhập</label>
                                    <div class="_inputWrap_1fn2z_49">
                                        <input type="email" v-model="data.email" placeholder="Email hoặc Username"
                                            autocomplete="email" />
                                    </div>
                                </div>
                            </div>
                            <div class="_wrapper_juilt_1">
                                <div class="_wrapper_1fn2z_1">
                                    <div class="_inputWrap_1fn2z_49">
                                        <input type="password" v-model="data.password" placeholder="Mật khẩu"
                                            value="" />
                                    </div>
                                </div>
                            </div>
                            <div class="_wrapper_juilt_1">
                                <div class="_wrapper_1l2og_1">
                                    <input type="checkbox" id="remember" name="remember" class="_input_1l2og_8"
                                        checked="" /><label class="_label_1l2og_11" for="remember"><span
                                            for="remember">Ghi nhớ đăng nhập</span></label>
                                </div>
                            </div>
                            <button type="submit" class="_wrapper_5cl6z_1 mt-3">
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                    <p class="desc lh-lg pt-3 px-4 mb-0">
                        Bạn chưa có tài khoản?
                        <span @click="switchToRegister">Đăng ký</span>
                    </p>

                    <span class="_forgotPassword_1unxg_31 cursor-pointer" @click="switchToForgot">Quên mật khẩu?</span>
                    <div class="social">
                        <p class="desc lh-lg pt-3 px-4 mb-1">
                            Hoặc đăng nhập bằng
                        </p>
                        <div class="social-login d-flex justify-content-center gap-2">
                            <a href="" class="btn-social btn-facebook bg-primary"><i
                                    class="mdi mdi-facebook"></i>Facebook</a>
                            <a href="" class="btn-social btn-google bg-danger"><i class="mdi mdi-google"></i>Google</a>
                            <a href="" class="btn-social btn-github bg-secondary"><i
                                    class="mdi mdi-github"></i>Github</a>
                        </div>
                    </div>
                    <p class="text-desc mx-auto px-4 py-3">
                        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn
                        đồng ý với
                        <a href="https://fullstack.edu.vn/terms" target="_blank" class="text-decoration-underline">điều
                            khoản sử dụng</a>
                        của chúng tôi.
                    </p>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            data: {
                email: "",
                password: "",
            },
            user: {},
            errorMessage: "",
        };
    },

    methods: {
        closeForm() {
            this.$emit("closeForm"); // Ẩn form đăng nhập
        },
        switchToRegister() {
            this.$emit("switchToRegister");
        },
        switchToForgot() {
            this.$emit("switchToForgot");
        },

        async handleLogin() {
            try {
                const response = await axios.post(
                    "http://localhost:3000/api/v1/auth/login",
                    this.data,
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    console.log("Đăng nhập thành công, chuyển hướng...");
                    this.$emit("loginSuccess", response.data.user);
                    this.$emit("closeForm");
                }
            } catch (error) {
                console.error("Lỗi đăng nhập:", error);
                this.errorMessage =
                    error.response?.data?.message || "Đăng nhập thất bại!";
            }
        }

    },
};
</script>

<style>
.social-login a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 115px;
    height: 40px;
    color: #fff;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    gap: 10px;
}

.social-login a i {
    font-size: 20px;
}

.v-overlay__content {
    max-width: 530px !important;
}

.main {
    background: #f1f1f1;
    min-height: 100vh;
    display: flex;
    justify-content: center;
}

.form {
    margin: 0;
    padding: 10px;
    min-height: 100px;
    text-align: center;
    background: #fff;
    border-radius: 2px;
    align-self: center;
}

._back_m3d3f_50 {
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    padding: 20px;
    font-size: 16px;
    opacity: 0.7;
    transition: opacity 0.2s;
}

._back_m3d3f_50:hover {
    opacity: 1;
}

._content_1unxg_12 {
    display: flex;
    flex-direction: column;
    max-width: 360px;
    margin: 0 auto;
}

._wrapper_juilt_1 {
    width: 100%;
    margin-top: 10px;
    overflow: hidden;
}

._wrapper_1fn2z_1 {
    text-align: left;
    color: #292929;
    width: 100%;
}

._inputWrap_1fn2z_49 {
    position: relative;
    background: #fff;
    border: 1.5px solid #d9d9d9;
    border-radius: 44px;
    overflow: hidden;
    height: 44px;
    display: flex;
}

._inputWrap_1fn2z_49 input {
    display: block;
    width: 100%;
    padding: 12px 42px 12px 20px;
    border: none;
    outline: none;
    font-size: 16px;
    background-color: transparent;
}

._inputWrap_1fn2z_49:focus-within {
    border-color: #00ffff;
}

._wrapper_1l2og_1 {
    display: flex;
    flex-direction: column;
    padding-bottom: 8px;
    text-align: left;
}

._input_1l2og_8 {
    display: none;
}

._label_1l2og_11 {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 0 0 26px;
    margin-left: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0.9;
}

._input_1l2og_8:checked+._label_1l2og_11:before {
    background-color: #1dbfaf;
}

._label_1l2og_11:before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #1dbfaf;
    border-radius: 4px;
    cursor: pointer;
}

._label_1l2og_11:before,
._label_1l2og_11:after {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(calc(-50% + 4px));
}

._input_1l2og_8:checked+._label_1l2og_11:after {
    content: "";
    display: inline-block;
    width: 5px;
    height: 10px;
    left: 5px;
    margin-top: -2px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

._wrapper_5cl6z_1 {
    border-radius: 999px;
    color: #fff;
    background-image: linear-gradient(70.06deg, #2cccff -5%, #22dfbf 106%);
    width: 100%;

    padding: 10px 20px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: opacity 0.25s;
}

._wrapper_5cl6z_1:hover {
    opacity: 0.8;
}

.desc span {
    font-weight: 600;
    color: #ff6308;
    text-decoration: underline;
    cursor: pointer;
}

._forgotPassword_1unxg_31 {
    display: inline-block;
    color: #ff6308;
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
}

.text-desc {
    color: #666;
    font-size: 12px;
    width: min(400px, 100%);
}

.btn-back {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #333;
    background: #16182308;
    font-size: 28px;
    cursor: pointer;
}

.btn-back:hover {
    background: #1618230d;
}

/* Style cho thanh cuộn */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-thumb {
    background-color: #fb4e4e;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #da3c3c;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.scrollable {
    max-height: 630px;
    /* Chiều cao tối đa để kích hoạt thanh cuộn */
    overflow-y: auto;
    overflow-x: hidden;
    /* Ẩn thanh cuộn ngang */
}
</style>

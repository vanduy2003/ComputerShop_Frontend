<template>
    <div class="form scrollable">
        <!-- Register Form -->
        <div class="register-form ">
            <div class="form-content">
                <header class="header-login">
                    <a href="https://fullstack.edu.vn" target="_top">
                        <img width="100px" src="./TNC.png" alt="logo" class="_logo_m3d3f_5">
                    </a>
                    <h1 class="fw-bold fs-3 lh-sm my-3">Đăng ký tài khoản TNC</h1>
                    <p class="text-danger" style="width: 400px; margin: 0 auto;">Mỗi người nên sử dụng riêng một tài
                        khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa.
                    </p>
                    <button class="_back_m3d3f_50" @click="switchToLogin()"><i
                            class="mdi mdi-chevron-left fs-5"></i>Quaylại</button>
                    <button class="btn-back" @click="closeForm()"><span>×</span></button>
                </header>
                <main class="_main_1unxg_8">
                    <div class="_content_1unxg_12">
                        <form>
                            <div class="_wrapper_juilt_1">
                                <div class="_wrapper_1fn2z_1">
                                    <label class="fw-semibold mb-2 ms-2">Tên của bạn?</label>
                                    <div class="_inputWrap_1fn2z_49"><input name="username"
                                            placeholder="Họ và tên của bạn" maxlength="50" spellcheck="false" value="">
                                    </div>
                                </div>
                            </div>
                            <div class="_wrapper_juilt_1">
                                <div class="_wrapper_1fn2z_1">
                                    <label class="fw-semibold mb-2 ms-2">Email hoặc số điện thoại</label>
                                    <div class="_inputWrap_1fn2z_49"><input name="username"
                                            placeholder="Email hoặc SDT của bạn" maxlength="50" spellcheck="false"
                                            value="">
                                    </div>
                                </div>
                            </div>
                            <div class="_wrapper_juilt_1">
                                <div class="_wrapper_1fn2z_1">
                                    <div class="_inputWrap_1fn2z_49"><input type="password" name="password"
                                            placeholder="Mật khẩu" spellcheck="false" value="">
                                    </div>
                                </div>
                            </div>
                            <div class="_wrapper_juilt_1">
                                <div class="_wrapper_1fn2z_1 d-flex justify-content-between">
                                    <label class="fw-semibold mb-2 ms-2">Nhập mã xác nhận</label>
                                    <span class="fw-semibold me-2 text-primary pe-auto cursor-pointer">Gửi mã</span>
                                </div>
                                <v-otp-input class="p-0" :length="5" variant="solo-filled "></v-otp-input>
                            </div>

                            <button type="submit" disabled="" class="_wrapper_5cl6z_1 mt-3">
                                Đăng ký tài khoản
                            </button>
                        </form>
                    </div>
                    <p class="desc lh-lg pt-3 px-4 mb-0">Bạn đã có tài khoản? <span @click="switchToLogin">Đăng
                            nhập</span>
                    </p>
                    <span class="_forgotPassword_1unxg_31 cursor-pointer" @click="switchToForgot">Quên mật
                        khẩu?</span>
                    <div class="social">
                        <p class="desc lh-lg pt-3 px-4 mb-1">Hoặc đăng ký bằng</p>
                        <div class="social-login d-flex justify-content-center gap-2">
                            <a href="/auth/facebook" class="btn-social btn-facebook bg-primary"><i
                                    class="mdi mdi-facebook"></i>Facebook</a>
                            <a href="/auth/google" class="btn-social btn-google bg-danger"><i
                                    class="mdi mdi-google"></i>Google</a>
                            <a href="/auth/github" class="btn-social btn-github bg-secondary"><i
                                    class="mdi mdi-github"></i>Github</a>
                        </div>
                    </div>
                    <p class="text-desc mx-auto px-4 py-3">Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn
                        đồng ý với <a href="https://fullstack.edu.vn/terms" target="_blank"
                            class="text-decoration-underline">điều khoản sử dụng</a> của
                        chúng tôi.
                    </p>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeForm() {
            this.$emit("closeForm");
        },
        switchToLogin() {
            this.$emit("switchToLogin");
        },
        switchToForgot() {
            this.$emit("switchToForgot");
        }
    }

}
</script>

<style>
.v-otp-input__content {
    height: 50px !important;
    padding: 0.5rem;
    margin: 0 auto;
}
</style>
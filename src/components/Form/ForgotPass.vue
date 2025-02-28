<template>
    <div class="form scrollable">
        <!-- Forgot Form -->
        <div class="forgot-form">
            <div class="form-content">
                <header class="header-login">
                    <a href="https://fullstack.edu.vn" target="_top">
                        <img width="100px" src="./TNC.png" alt="logo" class="_logo_m3d3f_5">
                    </a>
                    <h1 class="fw-bold fs-3 lh-sm my-3">Quên mật khẩu?</h1>
                    <p class="text-danger" style="width: 400px; margin: 0 auto;">Nhập email hoặc SDT của bạn và
                        chúng tôi sẽ gửi cho bạn mã khôi phục mật khẩu.</p>
                    <button class="_back_m3d3f_50" @click="switchToLogin()"><i
                            class="mdi mdi-chevron-left fs-5"></i>Quay lại</button>
                    <button class="btn-back" @click="closeForm"><span>×</span></button>
                </header>
                <main class="_main_1unxg_8">
                    <div class="_content_1unxg_12">
                        <form>
                            <div class="_wrapper_juilt_1">
                                <div class="_wrapper_1fn2z_1">
                                    <label class="fw-semibold mb-2 ms-2">Tên đăng nhập</label>
                                    <div class="_inputWrap_1fn2z_49"><input name="username"
                                            placeholder="Email hoặc Số điện thoại" maxlength="50" spellcheck="false"
                                            value=""></div>
                                </div>
                            </div>
                            <div class="_wrapper_juilt_1">
                                <div class="_wrapper_1fn2z_1">
                                    <div class="_labelGroup_1fn2z_10"></div>
                                    <div class="_inputWrap_1fn2z_49 disabled"><input disabled="" name="code"
                                            placeholder="Nhập mã xác nhận" value="">
                                        <div class="rightBtn"><span>Gửi mã</span></div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" disabled="" class="_wrapper_5cl6z_1 mt-3">Lấy lại mật khẩu</button>
                        </form>
                    </div>


                    <p class="text-desc mx-auto px-4 py-3">Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý
                        với <a href="https://fullstack.edu.vn/terms" target="_blank"
                            class="text-decoration-underline">điều khoản sử dụng</a> của chúng tôi.</p>
                </main>
            </div>
        </div>
        <!-- ForgotPass Form -->


    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogRegister: false,
        }
    },
    methods: {
        closeForm() {
            this.$emit('close-form');
        },
        switchToLogin() {
            this.$emit('switchToLogin');
        }

    }
}
</script>

<style scoped>
.disabled {
    background-color: #16182329;
}

.rightBtn {
    color: #fff;
    background: #f05123 linear-gradient(to right bottom, #ff8f26, #f05123);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    min-width: 124px;
    cursor: pointer;
    border-radius: 44px;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
}
</style>
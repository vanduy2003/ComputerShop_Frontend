<template>
    <div class="form scrollable">
        <div class="forgot-form">
            <div class="form-content">
                <header class="header-login">
                    <a href="https://fullstack.edu.vn" target="_top">
                        <img width="100px" src="https://i.imgur.com/J3svmnM.png" alt="logo" class="_logo_m3d3f_5">
                    </a>
                    <h1 class="fw-bold fs-3 lh-sm my-3">Quên mật khẩu?</h1>
                    <p class="text-danger" style="width: 400px; margin: 0 auto;">
                        Nhập email hoặc SDT của bạn và chúng tôi sẽ gửi cho bạn mã khôi phục mật khẩu.
                    </p>
                    <button class="_back_m3d3f_50" @click="switchToLogin">
                        <i class="mdi mdi-chevron-left fs-5"></i> Quay lại
                    </button>
                    <button class="btn-back" @click="closeForm"><span>×</span></button>
                </header>
                <main class="_main_1unxg_8">
                    <div class="_content_1unxg_12">
                        <form @submit.prevent="resetPassword">
                            <div class="wrapper">
                                <div class="wrapper_item">
                                    <label class="fw-semibold mb-2 ms-2">Email</label>
                                    <div class="inputWrap">
                                        <input type="email" v-model="formData.email" placeholder="Nhập email của bạn">
                                    </div>
                                </div>
                            </div>
                            <div class="wrapper">
                                <div class="wrapper_item d-flex justify-content-between">
                                    <label class="fw-semibold mb-2 ms-2">Nhập mã xác nhận</label>
                                    <span class="fw-semibold me-2 text-primary cursor-pointer"
                                        @click="sendVerificationCode" v-if="!isCodeSent">
                                        Gửi mã
                                    </span>
                                    <span class="fw-semibold me-2 text-success" v-if="isCodeSent && !isVerified">
                                        Đã gửi mã!
                                    </span>
                                    <span class="fw-semibold me-2 text-success" v-if="isVerified">
                                        ✅ Đã xác thực
                                    </span>
                                </div>
                                <v-otp-input v-if="isCodeSent" v-model="verificationCode" :length="5" />
                                <button type="button" @click="verifyCode" class="btn btn-primary mt-2"
                                    v-if="isCodeSent && !isVerified">
                                    Xác nhận mã
                                </button>
                            </div>

                            <div class="wrapper" v-if="isVerified">
                                <div class="wrapper_item">
                                    <label class="fw-semibold mb-2 ms-2">Mật khẩu mới</label>
                                    <div class="inputWrap">
                                        <input v-model="formData.newPassword" type="password"
                                            placeholder="Nhập mật khẩu mới">
                                    </div>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary mt-2" v-if="isVerified">
                                Đặt lại mật khẩu
                            </button>
                        </form>
                    </div>
                    <p class="text-desc mx-auto px-4 py-3">
                        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
                        <a href="https://fullstack.edu.vn/terms" target="_blank" class="text-decoration-underline">
                            điều khoản sử dụng
                        </a> của chúng tôi.
                    </p>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
    setup(_, { emit }) {
        const formData = reactive({
            email: "",
            newPassword: "",
        });

        const toast = useToast(); // Sử dụng toast

        const verificationCode = ref("");
        const isCodeSent = ref(false);
        const isVerified = ref(false);

        const closeForm = () => {
            emit('close-form');
        };

        const switchToLogin = () => {
            emit('switchToLogin');
        };

        // Gửi mã xác nhận
        const sendVerificationCode = async () => {
            if (!formData.email) {
                toast.error("Vui lòng nhập email!");
                return;
            }

            try {
                const response = await axios.post("http://localhost:3000/api/v1/auth/sendResetPasswordCode", {
                    email: formData.email,
                });

                toast.success(response.data.message);
                isCodeSent.value = true;
            } catch (error) {
                toast.error(error.response?.data?.message || "Lỗi server");
            }
        };


        // Xác thực mã
        const verifyCode = async () => {
            if (!verificationCode.value) {
                toast.error("Vui lòng nhập mã xác nhận!");
                return;
            }

            try {
                const response = await axios.post("http://localhost:3000/api/v1/auth/verifyResetCode", {
                    email: formData.email,
                    code: verificationCode.value,
                });

                toast.success(response.data.message);
                isVerified.value = true;
            } catch (error) {
                toast.error(error.response?.data?.message || "Lỗi server");
            }
        };

        // Đặt lại mật khẩu
        const resetPassword = async () => {
            if (!isVerified.value) {
                toast.error("Bạn cần xác thực email trước!");
                return;
            }

            if (!formData.newPassword) {
                toast.error("Vui lòng nhập mật khẩu mới!");
                return;
            }

            try {
                const response = await axios.post("http://localhost:3000/api/v1/auth/resetPassword", {
                    email: formData.email,
                    newPassword: formData.newPassword,
                });

                toast.success(response.data.message);
                switchToLogin();
            } catch (error) {
                toast.error(error.response?.data?.message || "Lỗi server");
            }
        };

        return {
            formData,
            verificationCode,
            isCodeSent,
            isVerified,
            closeForm,
            switchToLogin,
            sendVerificationCode,
            verifyCode,
            resetPassword,
        };
    }
};
</script>

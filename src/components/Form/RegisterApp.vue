<template>
    <div class="form scrollable">
        <!-- Register Form -->
        <div class="register-form ">
            <div class="form-content">
                <header class="header-login">
                    <a href="https://fullstack.edu.vn" target="_top">
                        <img width="100px" src="https://i.imgur.com/J3svmnM.png" alt="logo" class="_logo_m3d3f_5">
                    </a>
                    <h1 class="fw-bold fs-3 lh-sm my-3">Đăng ký tài khoản TNC</h1>
                    <p class="text-danger" style="width: 400px; margin: 0 auto;">Mỗi người nên sử dụng riêng một tài
                        khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa.
                    </p>
                    <button class="_back_m3d3f_50" @click="switchToLogin()"><i
                            class="mdi mdi-chevron-left fs-5"></i>Quay lại</button>
                    <button class="btn-back" @click="closeForm()">
                        <span>×</span>
                    </button>
                </header>
                <main class="_main_1unxg_8">
                    <div class="_content_1unxg_12">
                        <form @submit.prevent="handleRegister">
                            <div class="wrapper">
                                <div class="wrapper_item">
                                    <label class="fw-semibold mb-2 ms-2">Tên của bạn?</label>
                                    <div class="inputWrap"><input v-model="formData.username"
                                            placeholder="Họ và tên của bạn">
                                    </div>
                                </div>
                            </div>
                            <div class="wrapper">
                                <div class="wrapper_item">
                                    <label class="fw-semibold mb-2 ms-2">Email hoặc số điện thoại</label>
                                    <div class="inputWrap"><input v-model="formData.email" type="email"
                                            placeholder="Email hoặc SDT của bạn">
                                    </div>
                                </div>
                            </div>
                            <div class="wrapper">
                                <div class="wrapper_item">
                                    <div class="inputWrap"><input v-model="formData.password" type="password"
                                            placeholder="Mật khẩu">
                                    </div>
                                </div>
                            </div>
                            <div class="wrapper">
                                <div class="wrapper_item d-flex justify-content-between">
                                    <label class="fw-semibold mb-2 ms-2">Nhập mã xác nhận</label>
                                    <span class="fw-semibold me-2 text-primary pe-auto cursor-pointer"
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
                                <v-otp-input v-if="isCodeSent" v-model="verificationCode" :length="5" :inputStyle="{
                                    height: '50px',
                                    padding: '0.5rem',
                                    margin: '0 auto'
                                }" />
                                <button type="button" @click="verifyCode" class="btn btn-primary mt-2"
                                    v-if="isCodeSent && !isVerified">
                                    Xác nhận mã
                                </button>
                            </div>


                            <button type="submit" class="btnLogin mt-3">
                                Đăng ký tài khoản
                            </button>
                        </form>
                    </div>
                    <p class="desc lh-lg pt-3 px-4 mb-0">Bạn đã có tài khoản? <span @click="switchToLogin">Đăng
                            nhập</span>
                    </p>
                    <span class="forgotPassword cursor-pointer" @click="switchToForgot">Quên mật
                        khẩu?</span>
                    <div class="social">
                        <p class="desc lh-lg pt-3 px-4 mb-1">Hoặc đăng ký bằng</p>
                        <div class="social-login d-flex justify-content-center gap-2">
                            <button @click="loginWithGoogle" class=" btn-google bg-primary">
                                <i class="mdi mdi-facebook"></i> Facebook
                            </button>
                            <button @click="loginWithGoogle" class=" btn-google bg-danger">
                                <i class="mdi mdi-google"></i> Google
                            </button>
                            <button @click="loginWithGoogle" class=" btn-google bg-secondary">
                                <i class="mdi mdi-github"></i> Github
                            </button>
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
import { ref, reactive } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { signInWithPopup } from "firebase/auth";
import { useUserStore } from "@/stores/userStore";
import { auth, provider } from "@/firebase/firebaseConfig";

export default {
    setup(_, { emit }) {
        const toast = useToast();
        const userStore = useUserStore();

        const formData = reactive({
            username: "",
            email: "",
            password: "",
        });

        const verificationCode = ref("");
        const isVerified = ref(false);
        const isCodeSent = ref(false);
        const message = ref("");
        const isLoading = ref(false); // Trạng thái loading

        const closeForm = () => emit("closeForm");
        const switchToLogin = () => emit("switchToLogin");
        const switchToForgot = () => emit("switchToForgot");

        // Đăng ký tài khoản
        const handleRegister = async () => {
            if (!formData.username || !formData.email || !formData.password) {
                toast.error("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            if (!isVerified.value) {
                toast.error("Bạn cần xác thực email trước khi đăng ký!");
                return;
            }

            try {
                const response = await axios.post("http://localhost:3000/api/v1/auth/register", formData);
                toast.success("Đăng ký thành công!");
                message.value = response.data.message;
                switchToLogin(); // Chuyển sang form đăng nhập
            } catch (error) {
                toast.error(error.response?.data?.message || "Lỗi server");
            }
        };

        // Gửi mã xác nhận
        const sendVerificationCode = async () => {
            if (!formData.email) {
                toast.error("Vui lòng nhập email!");
                return;
            }

            try {
                const response = await axios.post("http://localhost:3000/api/v1/auth/send-verification-code", {
                    email: formData.email,
                });

                toast.success(response.data.message);
                isCodeSent.value = true;
            } catch (error) {
                toast.error(error.response?.data?.message || "Lỗi server");
            }
        };

        // Xác nhận mã
        const verifyCode = async () => {
            if (!verificationCode.value) {
                toast.error("Vui lòng nhập mã xác nhận!");
                return;
            }

            try {
                const response = await axios.post("http://localhost:3000/api/v1/auth/verify-code", {
                    email: formData.email,
                    code: verificationCode.value,
                });

                isVerified.value = true; // Cập nhật trạng thái trước khi hiển thị thông báo
                message.value = response.data.message;
                toast.success("Xác nhận thành công!");
            } catch (error) {
                toast.error(error.response?.data?.message || "Lỗi server");
            }
        };

        // Đăng nhập bằng Google
        const loginWithGoogle = async () => {
            try {
                isLoading.value = true; // Hiển thị loading

                const result = await signInWithPopup(auth, provider);
                const firebaseUser = result.user; // Lấy thông tin user từ Firebase

                // Gửi dữ liệu lên userStore
                await userStore.loginWithGoogle(firebaseUser);

                toast.success("Đăng nhập bằng Google thành công!");

                // Đóng form sau khi đăng nhập
                setTimeout(() => {
                    isLoading.value = false;
                    closeForm();
                }, 2000);
            } catch (error) {
                isLoading.value = false;
                console.error("Lỗi đăng nhập Google:", error);
                toast.error("Đăng nhập Google thất bại!");
            }
        };

        return {
            formData,
            verificationCode,
            isVerified,
            isCodeSent,
            message,
            closeForm,
            switchToLogin,
            switchToForgot,
            handleRegister,
            sendVerificationCode,
            verifyCode,
            loginWithGoogle,
        };
    }
};
</script>


<style>
.v-otp-input__content {
    height: 50px !important;
    padding: 0.5rem;
    margin: 0 auto;
}
</style>
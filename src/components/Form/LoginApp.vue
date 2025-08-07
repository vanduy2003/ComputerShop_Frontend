<template>
    <div class="form scrollable">
        <div class="login-form">
            <div class="form-content">
                <header class="header-login">
                    <a href="https://fullstack.edu.vn">
                        <img width="100px" src="https://i.imgur.com/J3svmnM.png" alt="logo" />
                    </a>
                    <h1 class="fw-bold fs-3 lh-sm my-3">Đăng nhập vào TNC</h1>
                    <p class="text-danger" style="width: 400px; margin: 0 auto">
                        Mỗi người nên sử dụng riêng một tài khoản, tài khoản
                        nhiều người sử dụng chung sẽ bị khóa.
                    </p>
                    <button class="btn-back" @click="closeForm">
                        <span>×</span>
                    </button>
                </header>
                <main>
                    <div class="_content_1unxg_12">
                        <form @submit.prevent="handleLogin">
                            <div class="wrapper">
                                <div class="wrapper_item">
                                    <label class="fw-semibold mb-2 ms-2">Tên đăng nhập</label>
                                    <div class="inputWrap">
                                        <input type="email" v-model="email" placeholder="Email hoặc Username"
                                            autocomplete="email" />
                                    </div>
                                </div>
                            </div>
                            <div class="wrapper">
                                <div class="wrapper_item">
                                    <div class="inputWrap">
                                        <input type="password" v-model="password" placeholder="Mật khẩu" />
                                    </div>
                                </div>
                            </div>
                            <div class="wrapper">
                                <div class="_wrapper_1l2og_1">
                                    <input type="checkbox" id="remember" v-model="rememberMe" class="_input_1l2og_8" />
                                    <label class="labelInput" for="remember">Ghi nhớ đăng nhập</label>
                                </div>
                            </div>

                            <button type="submit" class="btnLogin mt-3">
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                    <p class="desc lh-lg pt-3 px-4 mb-0">
                        Bạn chưa có tài khoản? <span @click="switchToRegister">Đăng ký</span>
                    </p>
                    <span class="forgotPassword cursor-pointer" @click="switchToForgot">Quên mật khẩu?</span>

                    <div class="social">
                        <p class="desc lh-lg pt-3 px-4 mb-1">
                            Hoặc đăng nhập bằng
                        </p>
                        <div class="social-login d-flex justify-content-center gap-2">
                            <button @click="loginWithFacebook" class=" btn-google bg-primary">
                                <i class="mdi mdi-facebook"></i> Facebook
                            </button>
                            <button @click="loginWithGoogle" class=" btn-google bg-danger">
                                <i class="mdi mdi-google"></i> Google
                            </button>
                            <button @click="loginWithGithub" class=" btn-google bg-secondary">
                                <i class="mdi mdi-github"></i> Github
                            </button>
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
            <!-- Dùng component LoadingOverlay -->
            <LoadingOverlay :isLoading="isLoading" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useToast } from "vue-toastification";
import LoadingOverlay from "@/components/content/common/LoadingOverlay.vue";
import { auth, provider } from "@/firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";




export default {
    components: { LoadingOverlay },
    setup(_, { emit }) {
        const userStore = useUserStore();
        const email = ref("");
        const password = ref("");
        const rememberMe = ref(false);
        const isLoading = ref(false);
        const toast = useToast();
        const router = useRouter();


        // Lấy thông tin từ LocalStorage khi component được mount
        onMounted(() => {
            const savedEmail = localStorage.getItem("savedEmail");
            const savedPassword = localStorage.getItem("savedPassword");
            if (savedEmail && savedPassword) {
                email.value = savedEmail;
                password.value = savedPassword;
                rememberMe.value = true; // Đánh dấu checkbox nếu đã lưu
            }
        });

        const closeForm = () => emit("closeForm");
        const switchToRegister = () => emit("switchToRegister");
        const switchToForgot = () => emit("switchToForgot");

        const handleLogin = async () => {
            if (!email.value || !password.value) {
                toast.error("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            isLoading.value = true; // Hiển thị loading

            const success = await userStore.login({
                email: email.value,
                password: password.value,
            });

            if (success) {
                // Kiểm tra vai trò của user
                if (userStore.user.role === "admin") {
                    toast.info("Đăng nhập với quyền Admin!");
                    setTimeout(() => {
                        isLoading.value = false;
                        closeForm();
                        router.push("/admin/dashboard"); // Điều hướng đến trang admin
                    }, 2000);
                } else {
                    toast.success("Đăng nhập thành công!");
                    setTimeout(() => {
                        isLoading.value = false;
                        closeForm();
                    }, 2000);
                }

                // Nếu người dùng chọn "Ghi nhớ đăng nhập", lưu vào LocalStorage
                if (rememberMe.value) {
                    localStorage.setItem("savedEmail", email.value);
                    localStorage.setItem("savedPassword", password.value);
                } else {
                    localStorage.removeItem("savedEmail");
                    localStorage.removeItem("savedPassword");
                }


            } else {
                isLoading.value = false;
                toast.error("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!");
            }
        };


        // Hàm đăng nhập bằng Google
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

        const loginWithFacebook = () => {
            toast.info("Chức năng này đang được phát triển! Vui lòng quay lại sau.");
        }

        const loginWithGithub = () => {
            toast.info("Chức năng này đang được phát triển! Vui lòng quay lại sau.");
        }

        return {
            email,
            password,
            rememberMe,
            isLoading,
            closeForm,
            switchToRegister,
            switchToForgot,
            handleLogin,
            loginWithGoogle,
            loginWithFacebook,
            loginWithGithub,
        };
    },
};
</script>


<style>
.social-login button {
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

.wrapper {
    width: 100%;
    margin-top: 10px;
    overflow: hidden;
}

.wrapper_item {
    text-align: left;
    color: #292929;
    width: 100%;
}

.inputWrap {
    position: relative;
    background: #fff;
    border: 1.5px solid #d9d9d9;
    border-radius: 44px;
    overflow: hidden;
    height: 44px;
    display: flex;
}

.inputWrap input {
    display: block;
    width: 100%;
    padding: 12px 42px 12px 20px;
    border: none;
    outline: none;
    font-size: 16px;
    background-color: transparent;
}

.inputWrap:focus-within {
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

.labelInput {
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

._input_1l2og_8:checked+.labelInput:before {
    background-color: #1dbfaf;
}

.labelInput:before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #1dbfaf;
    border-radius: 4px;
    cursor: pointer;
}

.labelInput:before,
.labelInput:after {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(calc(-50% + 4px));
}

._input_1l2og_8:checked+.labelInput:after {
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

.btnLogin {
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

.btnLogin:hover {
    opacity: 0.8;
}

.desc span {
    font-weight: 600;
    color: #ff6308;
    text-decoration: underline;
    cursor: pointer;
}

.forgotPassword {
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
    max-height: 100vh;
    /* Chiều cao tối đa để kích hoạt thanh cuộn */
    overflow-y: auto;
    overflow-x: hidden;
    /* Ẩn thanh cuộn ngang */
}
</style>

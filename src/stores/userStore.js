import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import dayjs from "dayjs";

export const useUserStore = defineStore("user", () => {
    const users = ref([]);
    const user = ref(null);
    const isLoggedIn = computed(() => !!user.value);
    const isAdmin = computed(() => user.value?.role === "admin"); // ✅ Kiểm tra role

    // Hàm login
    const login = async (credentials) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/auth/login",
                credentials,
                { withCredentials: true }
            );
            user.value = response.data.user;
            return true;
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            return false;
        }
    };

    // Hàm login bằng Google
    const loginWithGoogle = async (firebaseUser) => {
        try {
            const googleUser = {
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
            };

            const response = await axios.post(
                "http://localhost:3000/api/v1/auth/google-login",
                googleUser,
                { withCredentials: true }
            );

            user.value = response.data.user;
        } catch (error) {
            console.error("Lỗi đăng nhập Google:", error);
        }
    };

    // Hàm lấy thông tin user từ API (dành cho reload trang)
    const fetchUser = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/auth/me",
                { withCredentials: true }
            );

            user.value = response.data;
        } catch (error) {
            console.error("Không thể lấy thông tin user:", error);
            user.value = null;
        }
    };

    // Hàm logout
    const logout = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/v1/auth/logout",
                {},
                { withCredentials: true }
            );

            user.value = null;
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
        }
    };

    const getAllUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/data/users",
                { withCredentials: true }
            );
            users.value = response.data.map((user) => ({
                ...user,
                updatedAt: dayjs(user.updatedAt).format("DD/MM/YYYY, HH:mm"),
            }));
        } catch (error) {
            console.error("Lỗi lấy danh sách người dùng:", error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(
                `http://localhost:3000/api/v1/data/delete-user/${userId}`,
                { withCredentials: true }
            );
            users.value = users.value.filter((user) => user.userId !== userId);
        } catch (error) {
            console.error("Lỗi xóa người dùng:", error);
        }
    };

    return {
        user,
        isLoggedIn,
        isAdmin,
        users,
        login,
        loginWithGoogle,
        fetchUser,
        logout,
        getAllUsers,
        deleteUser,
    };
});

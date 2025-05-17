<template>
    <div class="navbar-admin">
        <v-app-bar app color="black" elevation="1">
            <!-- Ô tìm kiếm -->
            <v-text-field variant="solo-filled" density="compact" placeholder="Search ..." hide-details
                class="search-bar ms-4" prepend-inner-icon="mdi-magnify"></v-text-field>

            <v-spacer></v-spacer>

            <!-- Biểu tượng -->
            <v-btn icon>
                <v-icon>mdi-email-outline</v-icon>
            </v-btn>


            <v-btn icon>
                <v-icon>mdi-bell-outline</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-layers-outline</v-icon>
            </v-btn>

            <!-- Avatar và tên người dùng -->
            <v-menu offset-y>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" class="user-btn">
                        <v-avatar size="32">
                            <v-img :src="user.avatar" />
                        </v-avatar>
                        <span class="ml-2">Hi, <strong>{{ user.username }}</strong></span>
                    </v-btn>
                </template>

                <v-list class="ps-0 bg-black text-white">
                    <v-list-item class="px-3" link>
                        <router-link to="/me/user-profile">
                            <div class="d-flex align-center text-white">
                                <v-icon class="mr-2">mdi mdi-file-account-outline</v-icon>
                                <v-list-item-title class="fs-6 fw-semibold">Trang Cá Nhân</v-list-item-title>
                            </div>
                        </router-link>

                    </v-list-item>
                    <v-list-item class="px-3" link @click="logout">
                        <div class="d-flex align-center">
                            <v-icon class="mr-2">mdi mdi-logout</v-icon>
                            <v-list-item-title class="fs-6 fw-semibold">Đăng Xuất</v-list-item-title>
                        </div>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <LoadingOverlay :isLoading="isLoading" />
    </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import LoadingOverlay from "@/components/content/common/LoadingOverlay.vue";
import { ref } from "vue";
import { useToast } from "vue-toastification";

export default {
    name: "AdminNavbar",
    components: {
        LoadingOverlay,
    },
    setup() {
        const { user } = useUserStore();
        const userStore = useUserStore();
        const router = useRouter(); // Sử dụng router để chuyển hướng
        const toast = useToast();
        const isLoading = ref(false);

        const logout = async () => {
            const result = await userStore.logout();
            if (result) {
                toast.success("Đăng xuất thành công");
                router.push("/"); // Chuyển hướng đến trang đăng nhập
            } else {
                console.log("Đăng xuất không thành công");
            }
        }

        return {
            user,
            isLoading,
            logout
        }
    }
}   
</script>

<style>
.search-bar {
    max-width: 250px;
}

.user-btn {
    text-transform: none;
}

.navbar-admin .v-list-item:hover {
    background-color: #333 !important;
    /* Màu tối khi hover */
    color: white !important;
    /* Giữ màu chữ trắng */
}

.v-toolbar__content {
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.54);
}

.v-navigation-drawer__content {
    box-shadow: 5px 0px 5px 2px rgba(0, 0, 0, 0.54);
}
</style>
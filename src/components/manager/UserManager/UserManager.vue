<template>
    <div class="manage wrappers">
        <AdminSidebar />
        <AdminNavbar />
        <div class="content p-4">
            <h1 class="title text-white">Danh sách người dùng </h1>


            <!-- Table -->
            <v-card>
                <template v-slot:text>
                    <v-text-field v-model="search" label="Tìm kiếm" prepend-inner-icon="mdi-magnify" variant="outlined"
                        hide-details single-line></v-text-field>
                </template>

                <v-data-table :headers="headers" :items="users" :search="search" class="elevation-1">


                    <template v-slot:[`item.avatar`]="{ item }">
                        <v-img :src="item.avatar || 'https://cdn-icons-png.flaticon.com/512/219/219983.png'" cover
                            width="80" aspect-ratio="1" class="rounded-circle"></v-img>
                    </template>

                    <template v-slot:[`item.username`]="{ item }">
                        <div class="d-flex justify-center text-center">{{ item.username }}</div>
                    </template>

                    <template v-slot:[`item.email`]="{ item }">
                        <div class="d-flex justify-center text-center">{{ item.email }}</div>
                    </template>

                    <template v-slot:[`item.phone`]="{ item }">
                        <div class="d-flex justify-center text-center">{{ item.phone || "Đang cập nhật" }}</div>
                    </template>

                    <template v-slot:[`item.address`]="{ item }">
                        <div class="d-flex justify-center text-center">{{ item.address || "Đang cập nhật" }}</div>
                    </template>

                    <template v-slot:[`item.role`]="{ item }">
                        <div class="d-flex justify-center text-center">{{ item.role === "admin" ? "Quản trị viên" :
                            "Khách hàng" }}</div>
                    </template>

                    <template v-slot:[`item.updatedAt`]="{ item }">
                        <div class="d-flex justify-center text-center">{{ item.updatedAt }}
                        </div>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <div class="d-flex justify-center text-center">
                            <button class="btn-delete" @click="removeUser(item.userId)">
                                <v-icon>mdi-delete</v-icon>
                            </button>
                        </div>

                    </template>
                </v-data-table>
            </v-card>

        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import AdminNavbar from '../Dashboard/AdminNavbar.vue'
import AdminSidebar from '../Dashboard/AdminSidebar.vue'
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';


export default {
    components: {
        AdminNavbar,
        AdminSidebar
    },

    setup() {
        const search = ref('');
        const userStore = useUserStore();
        const { users, user } = storeToRefs(userStore);
        const toast = useToast();



        onMounted(async () => {
            await userStore.getAllUsers();
        })

        const headers = [
            { title: 'ID', value: 'userId' },
            { title: 'Họ tên', value: 'username' },
            { title: 'Avatar', value: 'avatar' },
            { title: 'Email', value: 'email' },
            { title: 'Điện thoại', value: 'phone' },
            { title: 'Địa chỉ', value: 'address' },
            { title: 'Vai trò', value: 'role' },
            { title: 'Cập nhật', value: 'updatedAt' },
            { title: 'Hành động', value: 'actions', sortable: false }
        ];

        const removeUser = async (userId) => {
            if (userId === user.value.userId) {
                return toast.error("Không thể xóa tài khoản của chính mình");
            }

            try {
                const result = await userStore.deleteUser(userId);
                if (result) {
                    toast.success("Xóa người dùng thành công");
                } else {
                    console.error("Xóa người dùng thất bại");
                }
            } catch (error) {
                toast.error("Xóa người dùng thất bại");
            }
        }

        return {
            search,
            users,
            headers,
            removeUser
        }
    }
}
</script>

<style></style>
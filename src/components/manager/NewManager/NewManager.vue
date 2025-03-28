<template>
    <div class="manage wrappers">
        <AdminSidebar />
        <AdminNavbar />
        <div class=" content p-4">
            <h1 class="title text-white">Danh sách bài viết</h1>
            <div class="btn-controll d-flex justify-content-end">
                <button class="btn-creat mb-1 p-2 fs-6">
                    <router-link to="/admin/news/add-new" class="text-white">
                        <v-icon>mdi mdi-package-variant-closed</v-icon>
                        <span>Thêm bài viết</span>
                    </router-link>
                </button>
                <button class="mb-1 ms-2">
                    <div class="btn-controll">
                        <v-select v-model="selectedNew" :items="newOptions" item-title="label" item-value="value"
                            class="custom-select" density="compact" variant="solo-filled" hide-details="true" />
                    </div>
                </button>
            </div>
            <v-card>
                <template v-slot:text>
                    <v-text-field v-model="search" label="Tìm kiếm" prepend-inner-icon="mdi-magnify" variant="outlined"
                        hide-details single-line></v-text-field>
                </template>

                <v-data-table :headers="headers" :items="filteredNew" :search="search" class="elevation-1">

                    <!-- Hiển thị ảnh -->
                    <template v-slot:[`item.thumbnail`]="{ item }">
                        <v-img :src="item.thumbnail" cover width="100"></v-img>
                    </template>

                    <!-- Hiển thị tên bài viết -->
                    <template v-slot:[`item.username`]="{ item }">
                        <div class="d-flex justify-center">{{ item.username }}</div>
                    </template>

                    <!-- Hiển thị giá -->
                    <template v-slot:[`item.priceNew`]="{ item }">
                        <div class="d-flex justify-center">{{ Number(item.priceNew).toLocaleString("vi-VN") }}</div>
                    </template>

                    <!-- Hiển thị loại -->
                    <template v-slot:[`item.type`]="{ item }">
                        <div class="d-flex justify-center">{{ item.type === "new" ? "Tin tức" : "Channel" }}</div>
                    </template>

                    <!-- Hiển thị cập nhật -->
                    <template v-slot:[`item.updatedAt`]="{ item }">
                        <div class="d-flex justify-center text-center">{{ item.updatedAt }}</div>
                    </template>

                    <!-- Hiển thị nhà cung cấp -->
                    <template v-slot:[`item.supplierName`]="{ item }">
                        <div class="d-flex justify-center text-center">{{ item.supplierName }}</div>
                    </template>

                    <!-- Hiển thị các hành động -->
                    <template v-slot:[`item.actions`]="{ item }">
                        <button class="btn-update mb-1" fab small>
                            <router-link :to="`/admin/news/edit/${item.newId}`" class="text-white">
                                <v-icon>mdi-pencil</v-icon>
                            </router-link>
                        </button>
                        <button class="btn-delete" fab small @click="removeNew(item.newId)">
                            <v-icon>mdi-delete</v-icon>
                        </button>
                    </template>
                </v-data-table>
            </v-card>

        </div>
    </div>

</template>

<script>
import { storeToRefs } from 'pinia';
import AdminNavbar from '../Dashboard/AdminNavbar.vue';
import AdminSidebar from '../Dashboard/AdminSidebar.vue';
import { useNewStore } from '@/stores/newStore';
import { onMounted, ref, computed, onActivated } from 'vue';
import { useToast } from 'vue-toastification';


export default {
    name: 'ProductManagePage',
    components: {
        AdminNavbar,
        AdminSidebar
    },

    setup() {
        const newStore = useNewStore();
        const { news } = storeToRefs(newStore);

        const search = ref('');
        const toast = useToast();
        const selectedNew = ref(null);

        const filteredNew = computed(() => {
            if (!selectedNew.value) {
                return news.value;
            }
            return news.value.filter((product) =>
                product.type.trim() === selectedNew.value.trim()
            );
        });


        onMounted(() => {
            newStore.fetchNews(); // Tải danh sách bài viết khi trang được tải
        })

        onActivated(() => {
            newStore.fetchNews(); // Tải lại danh sách bài viết khi trang được kích hoạt
        });



        const headers = [
            { title: 'ID', value: 'newId' },
            { title: 'Tên bài viết', value: 'title' },
            { title: 'Ảnh', value: 'thumbnail' },
            { title: 'Mô tả', value: 'description' },
            { title: 'Tác giả', value: 'username' },
            { title: 'Thể loại', value: 'type' },
            { title: 'Cập nhật', value: 'updatedAt' },
            { title: 'Actions', value: 'actions', sortable: false },
        ];

        // Hàm xóa bài viết
        const removeNew = async (id) => {
            const confirmed = confirm("Bạn có chắc chắn muốn xóa bài viết này?");
            if (!confirmed) return;

            const success = await newStore.deleteNews(id);
            if (success) {
                toast.success("Xóa bài viết thành công!");
            } else {
                toast.error("Lỗi khi xóa bài viết!");
            }
        };

        const newOptions = [
            { label: 'Tất cả bài viết', value: null },
            { label: 'Tin tức mới nhất', value: 'new' },
            { label: 'Channel nổi bật', value: 'channel' },
        ];

        return {
            news,
            headers,
            search,
            removeNew,
            newOptions,
            selectedNew,
            filteredNew
        }
    }
}
</script>


<style>
.v-data-table td:nth-child(4),
.v-data-table th:nth-child(4) {
    max-width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
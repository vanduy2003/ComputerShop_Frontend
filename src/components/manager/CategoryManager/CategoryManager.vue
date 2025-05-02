<template>
    <div class="manage wrappers">
        <AdminSidebar />
        <AdminNavbar />
        <div class="content p-4">
            <h1 class="title text-white">Danh sách danh mục sản phẩm</h1>
            <div class="btn-controll">
                <button class="btn-creat btn-lish mb-1 p-2 fs-6 text-white" @click="openAddDialog">
                    <v-icon>mdi mdi-package-variant-closed</v-icon>
                    <span>Thêm danh mục</span>
                </button>
            </div>

            <!-- Table -->
            <v-card>
                <template v-slot:text>
                    <v-text-field v-model="search" label="Tìm kiếm" prepend-inner-icon="mdi-magnify" variant="outlined"
                        hide-details single-line></v-text-field>
                </template>

                <v-data-table :headers="headers" :items="categorys" :search="search" class="elevation-1">
                    <template v-slot:[`item.imageUrl`]="{ item }">
                        <v-img :src="item.imageUrl" cover width="80"></v-img>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <button @click="openEditDialog(item)" class="btn-update mb-1 text-white">
                            <v-icon>mdi-pencil</v-icon>
                        </button>
                        <button class="btn-delete" @click="removeCategory(item.categoryId)">
                            <v-icon>mdi-delete</v-icon>
                        </button>
                    </template>
                </v-data-table>
            </v-card>

            <!-- Form Add Product -->
            <v-dialog v-model="dialog" max-width="700px">
                <v-card>
                    <v-card-title class="fs-4 fw-semibold text-center mt-4">
                        {{ isEdit ? "Cập nhật danh mục sản phẩm" : "Thêm danh mục sản phẩm" }}
                    </v-card-title>
                    <v-card-text>
                        <FormCategory :category="currentCategory" @submit="submitForm" @close="closeDialog" />
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import AdminNavbar from '../Dashboard/AdminNavbar.vue'
import AdminSidebar from '../Dashboard/AdminSidebar.vue'
import FormCategory from './FormCategory.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { ref, onMounted, } from 'vue'
import { useToast } from 'vue-toastification'

export default {
    components: {
        AdminNavbar,
        AdminSidebar,
        FormCategory
    },
    setup() {
        const search = ref('')
        const categoryStore = useCategoryStore()
        const { categorys } = storeToRefs(categoryStore)
        const dialog = ref(false)
        const toast = useToast()
        const currentCategory = ref(null)
        const isEdit = ref(false)



        onMounted(() => {
            categoryStore.fetchCategory()
        })

        const headers = [
            { title: 'ID', value: 'categoryId' },
            { title: 'Tên danh mục', value: 'name' },
            { title: 'Ảnh', value: 'imageUrl' },
            { title: 'Mô tả', value: 'description' },
            { title: 'Ngày tạo', value: 'createdAt' },
            { title: 'Actions', value: 'actions', sortable: false },
        ];

        const openAddDialog = () => {
            isEdit.value = false;
            currentCategory.value = { name: '', description: '', imageUrl: '' }; // 🛠 Reset dữ liệu
            dialog.value = true;
        };


        const closeDialog = () => {
            dialog.value = false;
        }

        const openEditDialog = (category) => {
            isEdit.value = true;
            currentCategory.value = { ...category }; // Sao chép dữ liệu để tránh sửa trực tiếp
            dialog.value = true;
        }

        const submitForm = async (formData) => {
            if (formData.categoryId) {
                dialog.value = false;
                await categoryStore.updateCategory(formData);
            } else {
                dialog.value = false;
                await categoryStore.addCategory(formData);
            }
            closeDialog();
        };

        const removeCategory = async (categoryId) => {
            const success = await categoryStore.deleteCategory(categoryId);

            if (success) {
                toast.success('Xóa danh mục thành công!');
            } else {
                console.error('Xóa danh mục thất bại!');
            }
        }

        return {
            search,
            headers,
            categorys,
            dialog,
            isEdit,
            openAddDialog,
            closeDialog,
            submitForm,
            openEditDialog,
            removeCategory,
            currentCategory,

        }
    }
}
</script>


<style></style>
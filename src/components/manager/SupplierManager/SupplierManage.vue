<template>
    <div class="manage wrappers">
        <AdminSidebar />
        <AdminNavbar />
        <div class="content p-4">
            <h1 class="title text-white">Danh sách nhà cung cấp</h1>
            <div class="btn-controll d-flex justify-content-end">
                <button class="btn-creat btn-lish mb-1 p-2 fs-6 text-white" @click="openAddDialog">
                    <v-icon>mdi mdi-file-plus</v-icon>
                    <span>Thêm nhà cung cấp</span>
                </button>
                <button class="btn-creat excel mb-1 p-2 fs-6 text-white ms-2" @click="exportToExcel">
                    <v-icon>mdi mdi-file-excel</v-icon>
                    <span>Xuất Excel</span>
                </button>
            </div>

            <!-- Table -->
            <v-card>
                <template v-slot:text>
                    <v-text-field v-model="search" label="Tìm kiếm" prepend-inner-icon="mdi-magnify" variant="outlined"
                        hide-details single-line></v-text-field>
                </template>

                <v-data-table :headers="headers" :items="suppliers" :search="search" class="elevation-1">

                    <template v-slot:[`item.imageUrl`]="{ item }">
                        <v-img :src="item.imageUrl" cover width="80"></v-img>
                    </template>

                    <template v-slot:[`item.address`]="{ item }">
                        <div class="d-flex justify-center">{{ item.address }}</div>
                    </template>

                    <template v-slot:[`item.email`]="{ item }">
                        <div class="d-flex justify-center">{{ item.email }}</div>
                    </template>

                    <template v-slot:[`item.phone`]="{ item }">
                        <div class="d-flex justify-center">{{ item.phone }}</div>
                    </template>

                    <template v-slot:[`item.contactName`]="{ item }">
                        <div class="d-flex justify-center">{{ item.contactName }}</div>
                    </template>

                    <template v-slot:[`item.name`]="{ item }">
                        <div class="d-flex justify-center">{{ item.name }}</div>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <button @click="openEditDialog(item)" class="btn-update mb-1 text-white">
                            <v-icon>mdi-pencil</v-icon>
                        </button>
                        <button class="btn-delete" @click="removeSupplier(item.supplierId)">
                            <v-icon>mdi-delete</v-icon>
                        </button>
                    </template>
                </v-data-table>
            </v-card>

            <!-- Form Add Product -->
            <v-dialog v-model="dialog" min-width="750px">
                <v-card>
                    <v-card-title class="fs-4 fw-semibold text-center mt-4">
                        {{ isEdit ? "CẬP NHẬT NHÀ CUNG CẤP " : "THÊM NHÀ CUNG CẤP" }}
                    </v-card-title>
                    <v-card-text>
                        <FormSupplier :supplier="currentSupplier" @submit="submitForm" @close="closeDialog" />
                    </v-card-text>
                </v-card>
            </v-dialog>

            <!-- Dialog Success -->
            <v-dialog v-model="dialogSuccess">
                <v-fade-transition hide-on-leave>
                    <v-card v-if="dialogSuccess" append-icon="$close" class="mx-auto" elevation="16" width="500"
                        title="Thông báo">
                        <template v-slot:append>
                            <v-btn icon="$close" variant="outlined" @click="dialogSuccess = false"></v-btn>
                        </template>

                        <v-divider></v-divider>

                        <div class="py-12 text-center">
                            <v-icon class="mb-6" color="success" icon="mdi-check-circle-outline" size="128"></v-icon>

                            <div class="text-h4 font-weight-bold">{{ ActionType === 'Add' ? 'Thêm danh mục thành công' :
                                ActionType ===
                                    'Update' ?
                                    'Cập nhật danh mục thành công' : 'Delete Successfully' }}</div>
                        </div>

                        <v-divider></v-divider>

                        <div class="pa-4 text-end">
                            <v-btn class="text-none" color="medium-emphasis" min-width="92" variant="outlined" rounded
                                @click="dialogSuccess = false">
                                Close
                            </v-btn>
                        </div>
                    </v-card>
                </v-fade-transition>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import AdminNavbar from '../Dashboard/AdminNavbar.vue'
import AdminSidebar from '../Dashboard/AdminSidebar.vue'
import FormSupplier from './FormSupplier.vue'
import { useSupplierStore } from '@/stores/supplierStore'
import { ref, onMounted, } from 'vue'

import * as XLSX from "xlsx";


export default {
    components: {
        AdminNavbar,
        AdminSidebar,
        FormSupplier
    },
    setup() {
        const search = ref('')
        const supplierStore = useSupplierStore()
        const { suppliers } = storeToRefs(supplierStore)
        const dialog = ref(false)

        const currentSupplier = ref(null)
        const isEdit = ref(false)
        const dialogSuccess = ref(false)
        const ActionType = ref('')

        onMounted(() => {
            supplierStore.fetchSupplier()
        })

        const headers = [
            { title: 'ID', value: 'supplierId' },
            { title: 'Nhà cung cấp', value: 'name' },
            { title: 'Họ tên', value: 'contactName' },
            { title: 'Ảnh', value: 'imageUrl' },
            { title: 'Điện thoại', value: 'phone' },
            { title: 'Email', value: 'email' },
            { title: 'Địa chỉ', value: 'address' },
            { title: 'Cập nhật', value: 'updatedAt' },
            { title: 'Actions', value: 'actions', sortable: false },
        ];

        const openAddDialog = () => {
            isEdit.value = false;
            currentSupplier.value = { name: '', contactName: '', imageUrl: '', phone: '', email: '', address: '' };
            dialog.value = true;
        };


        const closeDialog = () => {
            dialog.value = false;
        }

        const openEditDialog = (supplier) => {
            isEdit.value = true;
            currentSupplier.value = { ...supplier }; // Sao chép dữ liệu để tránh sửa trực tiếp
            dialog.value = true;
        }

        const submitForm = async (formData) => {
            if (formData.supplierId) {
                const response = await supplierStore.updateSupplier(formData);
                if (response) {
                    ActionType.value = 'Update';
                    dialogSuccess.value = true;
                }
            } else {
                const response = await supplierStore.addSupplier(formData);
                if (response) {
                    ActionType.value = 'Add';
                    dialogSuccess.value = true;
                }
            }
            closeDialog();
        };

        const removeSupplier = async (supplierId) => {
            await supplierStore.deleteSupplier(supplierId);
        }

        // Hàm xuất dữ liệu ra file Excel
        const exportToExcel = () => {
            const data = suppliers.value.map(supplier => ({
                ID: supplier.supplierId,
                'Nhà cung cấp': supplier.name,
                'Họ tên': supplier.contactName,
                'Ảnh': supplier.imageUrl,
                'Điện thoại': supplier.phone,
                'Email': supplier.email,
                'Địa chỉ': supplier.address,
                'Cập nhật': supplier.updatedAt,
            }));

            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Nhà cung cấp');
            XLSX.writeFile(workbook, 'suppliers.xlsx');
        }

        return {
            search,
            headers,
            suppliers,
            dialog,
            isEdit,
            openAddDialog,
            closeDialog,
            submitForm,
            openEditDialog,
            removeSupplier,
            exportToExcel,
            currentSupplier,
            dialogSuccess,
            ActionType
        }
    }
}
</script>


<style></style>
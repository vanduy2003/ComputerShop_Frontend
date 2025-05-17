<template>
    <div class="manage wrappers">
        <AdminSidebar />
        <AdminNavbar />
        <div class="content p-4">
            <h1 class="title text-white">Danh sách linh kiện điện tử</h1>
            <div class="btn-controll d-flex justify-content-end">
                <button class="btn-creat btn-lish mb-1 p-2 fs-6 text-white" @click="openAddDialog">
                    <v-icon>mdi mdi-note-plus</v-icon>
                    <span>Thêm linh kiện</span>
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

                <v-data-table :headers="headers" :items="components" :search="search" class="elevation-1">

                    <template v-slot:[`item.componentId`]="{ item }">
                        <div class="d-flex justify-center">{{ item.componentId }}</div>
                    </template>

                    <template v-slot:[`item.componentType`]="{ item }">
                        <div class="d-flex justify-center">{{ item.componentType }}</div>
                    </template>

                    <template v-slot:[`item.specifications`]="{ item }">
                        <div class="d-flex justify-center">{{ item.specifications }}</div>
                    </template>

                    <template v-slot:[`item.imageUrl`]="{ item }">
                        <v-img :src="item.imageUrl" cover width="80"></v-img>
                    </template>

                    <template v-slot:[`item.logoUrl`]="{ item }">
                        <v-img :src="item.logoUrl" cover width="80"></v-img>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <button @click="openEditDialog(item)" class="btn-update mb-1 text-white">
                            <v-icon>mdi-pencil</v-icon>
                        </button>
                        <button class="btn-delete" @click="removeComponent(item.componentId)">
                            <v-icon>mdi-delete</v-icon>
                        </button>
                    </template>
                </v-data-table>
            </v-card>

            <!-- Form Add Product -->
            <v-dialog v-model="dialog" max-width="700px">
                <v-card>
                    <v-card-title class="fs-4 fw-semibold text-center mt-4">
                        {{ isEdit ? "Cập nhật linh kiện điện tử" : "Thêm linh kiện điện tử" }}
                    </v-card-title>
                    <v-card-text>
                        <FormComponent :component="currentComponent" @submit="submitForm" @close="closeDialog" />
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import AdminNavbar from '../Dashboard/AdminNavbar.vue'
import AdminSidebar from '../Dashboard/AdminSidebar.vue'
import { useComponentStore } from '@/stores/componentStore'
import { storeToRefs } from 'pinia'
import FormComponent from './FormComponent.vue'
import * as XLSX from 'xlsx'

export default {
    components: {
        AdminNavbar,
        AdminSidebar,
        FormComponent,
    },
    setup() {
        const componentStore = useComponentStore()
        const { components } = storeToRefs(componentStore)
        const search = ref('')
        const dialog = ref(false)
        const currentComponent = ref(null)
        const isEdit = ref(false)

        onMounted(async () => {
            await componentStore.fetchComponent()
        })

        const headers = [
            { title: 'ID', value: 'componentId' },
            { title: 'Tên linh kiện', value: 'name' },
            { title: 'Ảnh', value: 'imageUrl' },
            { title: 'Loại linh kiện', value: 'componentType' },
            { title: 'Thông số kỹ thuật', value: 'specifications' },
            { title: 'Thương hiệu', value: 'logoUrl' },
            { title: 'Actions', value: 'actions', sortable: false },
        ];

        const openAddDialog = () => {
            dialog.value = true
            currentComponent.value = null
            isEdit.value = false
        }

        const openEditDialog = (component) => {
            dialog.value = true
            currentComponent.value = component
            isEdit.value = true
        }

        const closeDialog = () => {
            dialog.value = false
            currentComponent.value = null
        }

        const submitForm = async (formData) => {
            if (isEdit.value) {
                await componentStore.updateComponent(formData).then(() => {
                    closeDialog()
                })
            } else {
                await componentStore.addComponent(formData).then(() => {
                    closeDialog()
                })
            }
        }

        const removeComponent = async (id) => {
            await componentStore.deleteComponent(id).then(() => {
                componentStore.fetchComponent()
            })
        }

        const exportToExcel = () => {
            const data = components.value.map(item => ({
                componentId: item.componentId,
                name: item.name,
                imageUrl: item.imageUrl,
                componentType: item.componentType,
                specifications: item.specifications,
                logoUrl: item.logoUrl,
            }))
            const worksheet = XLSX.utils.json_to_sheet(data)
            const workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Components')
            XLSX.writeFile(workbook, 'components.xlsx')
        }

        return {
            components,
            headers,
            search,
            dialog,
            currentComponent,
            openAddDialog,
            openEditDialog,
            closeDialog,
            submitForm,
            removeComponent,
            exportToExcel,
        }
    },

}
</script>

<style></style>
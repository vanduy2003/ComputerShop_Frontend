<template>
    <div class="manage wrappers">
        <AdminSidebar />
        <AdminNavbar />
        <div class=" content p-4">
            <h1 class="title text-white">Danh sách sản phẩm</h1>
            <div class="btn-controll d-flex justify-content-end">
                <button class="btn-creat mb-1 p-2 fs-6">
                    <router-link to="/admin/products/add-product" class="text-white">
                        <v-icon>mdi mdi-package-variant-closed</v-icon>
                        <span>Thêm sản phẩm</span>
                    </router-link>
                </button>
                <button class="mb-1 ms-2">
                    <div class="btn-controll">
                        <v-select v-model="selectedCategory" :items="categoryOptions" item-title="label"
                            item-value="value" class="custom-select" density="compact" variant="solo-filled"
                            hide-details="true" />
                    </div>
                </button>
            </div>
            <v-card>
                <template v-slot:text>
                    <v-text-field v-model="search" label="Tìm kiếm" prepend-inner-icon="mdi-magnify" variant="outlined"
                        hide-details single-line></v-text-field>
                </template>

                <v-data-table :headers="headers" :items="filteredcategory" :search="search" class="elevation-1"
                    :sort-by="[{ key: 'priceNew', order: 'desc' }]">

                    <!-- Hiển thị ảnh -->
                    <template v-slot:[`item.imageUrl`]="{ item }">
                        <v-img :src="item.imageUrl" cover width="80"></v-img>
                    </template>

                    <!-- Hiển thị số lượng -->
                    <template v-slot:[`item.stockQuantity`]="{ item }">
                        <div class="d-flex justify-center">{{ item.stockQuantity }}</div>
                    </template>

                    <!-- Hiển thị số lượng -->
                    <template v-slot:[`item.productId`]="{ item }">
                        <div class="d-flex justify-center">{{ item.productId }}</div>
                    </template>

                    <!-- Hiển thị giá -->
                    <template v-slot:[`item.priceNew`]="{ item }">
                        <div class="d-flex justify-center">{{ Number(item.priceNew).toLocaleString("vi-VN") }}</div>
                    </template>

                    <!-- Hiển thị giảm giá -->
                    <template v-slot:[`item.sale`]="{ item }">
                        <div class="d-flex justify-center">{{ item.sale }}</div>
                    </template>

                    <!-- Hiển thị danh mục -->
                    <template v-slot:[`item.categoryName`]="{ item }">
                        <div class="d-flex justify-center text-center">{{ item.categoryName }}</div>
                    </template>

                    <!-- Hiển thị nhà cung cấp -->
                    <template v-slot:[`item.supplierName`]="{ item }">
                        <div class="d-flex justify-center text-center">{{ item.supplierName }}</div>
                    </template>

                    <!-- Hiển thị các hành động -->
                    <template v-slot:[`item.actions`]="{ item }">
                        <button class="btn-update mb-1" fab small>
                            <router-link :to="`/admin/products/edit/${item.productId}`" class="text-white">
                                <v-icon>mdi-pencil</v-icon>
                            </router-link>
                        </button>
                        <button class="btn-delete" fab small @click="removeProduct(item.productId)">
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
import { useProductStore } from "@/stores/productStore";
import { onMounted, ref, onActivated, computed } from 'vue';
import { useToast } from 'vue-toastification';

export default {
    name: 'ProductManagePage',
    components: {
        AdminNavbar,
        AdminSidebar
    },

    setup() {
        const productStore = useProductStore();
        const { products } = storeToRefs(productStore);
        const search = ref('');
        const toast = useToast();
        const selectedCategory = ref(null);

        const filteredcategory = computed(() => {
            if (!selectedCategory.value) {
                return products.value;
            }
            return products.value.filter((product) =>
                product.categoryName.trim() === selectedCategory.value.trim()
            );
        });


        onMounted(() => {
            productStore.fetchProducts();
        })

        onActivated(() => {
            productStore.fetchProducts(); // Tải lại danh sách sản phẩm khi trang được kích hoạt
        });

        const headers = [
            { title: 'ID', value: 'productId' },
            { title: 'Tên sản phẩm', value: 'name' },
            { title: 'Ảnh', value: 'imageUrl' },
            { title: 'Số lượng', value: 'stockQuantity' },
            { title: 'Giá', value: 'priceNew', sortable: true },
            { title: 'Giảm giá', value: 'sale' },
            { title: 'Danh mục', value: 'categoryName' },
            { title: 'Nhà cung cấp', value: 'supplierName' },
            { title: 'Actions', value: 'actions', sortable: false },
        ];

        // Hàm xóa sản phẩm
        const removeProduct = async (id) => {
            const success = await productStore.deleteProduct(id);
            if (success) {
                toast.success("Xóa sản phẩm thành công!");
            } else {
                console.error("Xóa sản phẩm thất bại!");
            }
        };

        const categoryOptions = [
            { label: 'Tất cả sản phẩm', value: null },
            { label: 'Laptop GAMING', value: 'LAPTOP GAMING' },
            { label: 'PC Gaming', value: 'PC GAMING' },
            { label: 'Gaming Gear', value: 'GAMING GEAR' },
            { label: 'Màn hình máy tính', value: 'MÀN HÌNH MÁY TÍNH' },
            { label: 'PC HANDHELD', value: 'PC HANDHELD' },
            { label: 'PC văn phòng', value: 'PC VĂN PHÒNG' },
            { label: 'Ghế Gaming', value: 'GHẾ GAMING' },
        ];

        return {
            products,
            headers,
            search,
            removeProduct,
            categoryOptions,
            selectedCategory,
            filteredcategory
        }
    }
}
</script>

<style>
.v-field__input {
    min-height: 40px;
    padding: 10px;
}

.wrappers {
    background: linear-gradient(314deg, #585858 0%, #6f6f6f 40%, #5d5d5d 80%);
}

.v-data-table td:nth-child(2),

.v-data-table th:nth-child(2) {
    max-width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.btn-update {
    background-color: #26a5ff;
    color: #fff;
    margin-right: 10px;
    padding: 5px;
    border-radius: 50%;
}

.btn-delete {
    background-color: #ff2626;
    color: #fff;
    padding: 5px;
    border-radius: 50%;

}

.btn-creat {
    background-color: #10c100;
    margin-bottom: 10px;
    font-weight: bold;
    opacity: 0.8;
    border-radius: 3px;
}

.btn-creat span {
    margin-left: 5px;
}

.btn-creat:hover {
    opacity: 1;
}

thead th {
    padding: 10px;
    text-align: center;
    background-color: #ffb45e;
}

.v-data-table thead th {
    font-size: 16px !important;
    font-weight: bold !important;
}

tbody tr:hover {
    background-color: #c6c6c6;

}

.manage .title {
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 3px solid #ffb45e;
    padding-bottom: 3px;
    display: inline-block;
    margin-bottom: 24px;
}

.v-data-table-header__content {
    justify-content: center;
}
</style>
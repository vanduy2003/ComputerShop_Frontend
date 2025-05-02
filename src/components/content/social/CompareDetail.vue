<template>
    <div style="background-color: #f3f3f3;">
        <HeaderApp />
        <div class="compare-table container mt-4">
            <h4 class="mb-4 fw-bold">So sánh sản phẩm</h4>
            <div class="table-responsive">
                <table class="table table-bordered align-middle">
                    <thead>
                        <tr class="text-center">
                            <th class="heading-col">Ảnh</th>
                            <th v-for="item in compareList" :key="item.productId" class="product-col">
                                <img :src="item.imageUrl" alt="" width="150" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center">
                            <th class="heading-col">Tên sản phẩm</th>
                            <td class="product-col fs-6 fw-semibold" v-for="item in compareList" :key="item.productId">
                                {{ item.name }}
                            </td>
                        </tr>

                        <tr class="text-center">
                            <th class="heading-col">Giá bán</th>
                            <td class="product-col" v-for="item in compareList" :key="item.productId">
                                <span class="text-danger fs-5 fw-semibold ">
                                    {{ Number(item.priceNew).toLocaleString('vi-VN') }}₫
                                </span>
                                <span class="text-decoration-line-through text-secondary fs-6 fw-semibold ms-3">
                                    {{ Number(item.priceOld).toLocaleString('vi-VN') }}₫
                                </span>

                                <router-link :to="`/products/${item.productId}`" class="btn-watch  mx-auto">Xem
                                    ngay</router-link>
                            </td>
                        </tr>

                        <tr>
                            <th class="heading-col text-center">Cấu hình</th>
                            <td class="product-col fs-6" v-for="item in compareList" :key="item.productId">
                                <div class="summary-wrapper">
                                    <v-list dense>
                                        <v-list-item v-for="component in item.components" :key="component.componentId"
                                            class="component-item p-0">
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    <strong>{{ component.componentType }}: </strong>
                                                    <a href="#">{{ component.name }}</a>
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    {{ component.specifications }} - Số lượng: {{ component.quantity }}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </td>
                        </tr>

                        <tr class="text-center">
                            <th class="heading-col">Màn hình cảm ứng</th>
                            <td class="product-col fs-6 " v-for="item in compareList" :key="item.productId">
                                Không cảm ứng
                            </td>
                        </tr>

                        <tr class="text-center">
                            <th class="heading-col">Hệ điều hành</th>
                            <td class="product-col fs-6 " v-for="item in compareList" :key="item.productId">
                                {{ item.highlightType === 'Best Choice' ? 'Windows 11' : 'OFFICE HOME Windows 11' }}
                            </td>
                        </tr>

                        <tr class="text-center">
                            <th class="heading-col">Tình trạng</th>
                            <td class="product-col fs-6 " v-for="item in compareList" :key="item.productId">
                                {{ item.stockQuantity > 0 ? 'Còn hàng' : 'Hết hàng' }}
                            </td>
                        </tr>

                        <tr class="text-center">
                            <th class="heading-col">Loại</th>
                            <td class="product-col fs-6 " v-for="item in compareList" :key="item.productId">
                                {{ item.categoryName }}
                            </td>
                        </tr>

                        <tr class="text-center">
                            <th class="heading-col">Thương hiệu</th>
                            <td class="product-col fs-6 " v-for="item in compareList" :key="item.productId">
                                <img :src="item.brandImg" alt="" width="100" />
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
        <FooterApp />
        <SocialIcon />
    </div>

</template>

<script>
import HeaderApp from '@/components/Header/HeaderApp.vue';
import FooterApp from '@/components/Footer/FooterApp.vue';
import SocialIcon from '@/components/content/social/SocialIcon.vue';
import { useProductStore } from '@/stores/productStore';
import { ref, onMounted } from 'vue';

export default {
    components: {
        HeaderApp,
        FooterApp,
        SocialIcon,
    },
    setup() {
        const productStore = useProductStore();
        const compareList = ref([]);

        const fetchCompareProducts = async () => {
            const savedList = JSON.parse(localStorage.getItem('compareList') || '[]'); // [{ productId }]
            const productIds = savedList.map(item => item.productId);

            // Gọi fetch từng sản phẩm từ store
            const products = await Promise.all(productIds.map(id => productStore.fetchProductDataID(id)));

            // Gán dữ liệu trả về
            compareList.value = products;
        };

        onMounted(async () => {
            await fetchCompareProducts();
            console.log('compareList', compareList.value);
        });

        return {
            compareList,
        };
    }
};
</script>

<style scoped>
.table {
    table-layout: fixed;
    width: 100%;
    margin-bottom: 40px;
}

.v-list-item--one-line .v-list-item-subtitle {
    -webkit-line-clamp: 2 !important;
}


/* Cột tiêu đề */
.heading-col {
    width: 120px;
    white-space: nowrap;
    background-color: #ebebeb;
    vertical-align: top;
    font-size: 16px;
    text-wrap: auto;
}

/* Cột sản phẩm */
.product-col {
    width: auto;
    vertical-align: top;
    padding: 15px !important;

}

/* Tóm tắt giới hạn chiều cao + scroll */
.summary-wrapper {
    padding-right: 6px;
}

.v-list-item-title {
    text-wrap: auto;

}

.table-responsive {
    background: white;
}

.btn-watch {
    display: block;
    background-color: #007bff;
    color: white;
    margin-top: 15px;
    border: none;
    padding: 8px 20px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
}

.btn-watch:hover {
    background-color: #0056b3;
    transition: 0.3s;
}
</style>
<template>
    <div>
        <ProductDetail :product="product" :selectedImage="selectedImage" :loading="loading" :error="error"
            :components="components" @update:selectedImage="selectedImage = $event" />
        <ProductDescription :components="components" :product="product" />
    </div>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import ProductDetail from "./ProductDetail.vue";
import ProductDescription from "./ProductDescription.vue";
import { useRoute } from "vue-router";

export default {
    components: {
        ProductDetail,
        ProductDescription,
    },

    setup() {
        const store = useProductStore();
        const { product, selectedImage, loading, error, components } = storeToRefs(store);
        const route = useRoute(); // Lấy thông tin route hiện tại

        // Lấy thông tin sản phẩm dựa vào id
        const fetchProductDataID = async (productId) => {
            await store.fetchProductDataID(productId);
        };

        onMounted(() => {
            const productId = route.params.id;
            store.fetchProductDataID(productId);
        });

        // Watch route.params.id để lấy thông tin sản phẩm dựa vào id
        watch(() => route.params.id, (newId) => {
            if (newId) fetchProductDataID(newId);
        });


        return { product, selectedImage, loading, error, components };
    },
};
</script>

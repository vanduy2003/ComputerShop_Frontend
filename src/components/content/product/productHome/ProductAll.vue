<template>
    <div>
        <ProductPC :products="products" />
        <ProductLap :products="products" />
    </div>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import ProductLap from "../productHome/ProductLap.vue";
import ProductPC from "../productHome/ProductPC.vue";

export default {
    components: {
        ProductLap,
        ProductPC,
    },

    setup() {
        const store = useProductStore();
        const { products } = storeToRefs(store);

        onMounted(() => {
            store.fetchProducts(); // Gọi API chỉ khi chưa có dữ liệu
        });

        return { products };
    },
};
</script>
